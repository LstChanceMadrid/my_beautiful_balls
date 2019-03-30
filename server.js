const express = require('express');
const sensitive = require('./sensitive')
const bodyParser = require('body-parser');
const app = express();
const cloudinary = require('cloudinary');
const pgp = require('pg-promise')();
const connectionString = sensitive.herokuConnectionString;
const multer = require('multer');
const stripe = require("stripe")(sensitive.stripeSecretKey);
const uuidv4 = require('uuid/v4');
const upload = multer();

const db = pgp(connectionString);
const port = process.env.PORT || 5000;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("body-parser").text());
app.use((req, res, next) => {
    req.user = { id: 'asdfasdfasdfasdf' };
    next();
  });

cloudinary.config({
    cloud_name: sensitive.cloudName,
    api_key: sensitive.cloudAPIKey,
    api_secret: sensitive.cloudAPISecret
})




const authenticate = (req, res, next) => {
    let authorizationHeader = req.headers['authorization']

    if (!authorizationHeader) {
        res.status(400).json({error : 'Authorization failed'})
        return
    }

    const token = authorizationHeader.split(' ')[1]

    jwt.verify(token, 'placeholder', (error, decoded) => {
        if (decoded) {
            let username = decoded.username

            db.one('SELECT username FROM users WHERE username = $1', [username]).then(user => {
                return user.username === username
            })

            if (username) {
                next()
            } else {
                res.status(400).json({error : 'Nope lol'})
            }
        }
    })
}

app.post('/api/register', (req, res) => {
    console.log('register server')
    
    let username = req.body.username
    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let email = req.body.email
    let password = req.body.password

    console.log(username)

    db.none("SELECT username FROM users WHERE username = $1", [username]).then(() => {
        bcrypt.hash(password, saltRounds).then(hash => {

            db.any('INSERT INTO users (username, firstname, lastname, email, password) VALUES ($1, $2, $3, $4, $5)', [username, firstname, lastname, email, hash])
        }).then(() => {

            const token = jwt.sign({username : username}, 'placeholder')
            res.json({success : true, token : token, username : username})
        }).catch(e => console.log(e))
    }).catch(e => {
        if (e.name = "QueryResultError") {
            res.json({success : false, message : 'Username exists'})
        } else {
            console.log(e)
        }
    })
})

app.post('/api/login', (req, res) => {
	let username = req.body.username
    let password = req.body.password

	db.one('SELECT username, id, password FROM users WHERE username = $1', [username]).then(user => {
		bcrypt.compare(password, user.password).then(result => {

			if (result === true) {
                const token = jwt.sign({username : user.username}, 'placeholder')

                res.json({success : true, token : token, username : user.username})
			} else {
                
				res.json({success: false, message: 'Password is incorrect'})
			}
		}).catch(e => console.log(e))
	}).catch(e => {
        if (e.name = "QueryResultError") {
            res.json({success : false, message : 'Username exists'})
        } else {
            console.log(e)
        }
    })
})

app.post('/saveImage', (req, res) => {

    let ballImage = req.body.ballImage
    db.any('INSERT INTO balls (image) VALUES ($1)', [ballImage]).then(ball => { 
        
        db.any('SELECT image, id FROM balls where balls.image = $1', [ballImage]).then(response => {
            res.json({success : true, ballImage : response})
        }).catch(e => console.log(e))
    }).catch(e => console.log(e))

})

app.get('/grabBalls', (req, res) => {
    db.any('SELECT * FROM balls').then(response => {
        res.json({response : response})
    })
})

app.post('/removeBall', (req, res) => {
    let id = req.body.id
    db.none('DELETE FROM balls WHERE id = $1', [id]).catch(e => console.log(e))
})

app.post('/addToCart', (req, res) => {
    let id = req.body.id
    db.one('SELECT id, image FROM balls WHERE id = $1', [id]).then(ball => {
        console.log(ball)
        res.json({ball : ball})
    })
})


//  _   _  ___ _____ _____
// | \ | |/ _ \_   _| ____|
// |  \| | | | || | |  _|
// | |\  | |_| || | | |___
// |_| \_|\___/ |_| |_____|

app.use((req, res, next) => {
  req.user = { id: 'asdfasdfasdfasdf' };
  next();
});

app.post('/:username/charge', upload.none(), cors(), async (req, res) => {
  console.log(JSON.stringify(req.body));

  let error;
  let status = 'failed';
  try {
    const {
      csrfToken,
      currency = 'usd',
      description,
      stripeBillingAddressCity,
      stripeBillingAddressCountry,
      stripeBillingAddressLine1,
      stripeBillingAddressState,
      stripeBillingAddressZip,
      stripeBillingName,
      stripeEmail,
      stripeShippingAddressCity,
      stripeShippingAddressCountry,
      stripeShippingAddressLine1,
      stripeShippingAddressState,
      stripeShippingAddressZip,
      stripeShippingName,
      stripeToken,
      stripeTokenType,
    } = req.body;

    // TODO: Assert not a CSRF.

    let amount;

    // TODO: Lookup existing customer or create a new customer.
    // TODO: Save relevant billing and shipping address information.
    const customer = await stripe.customers.create({
      email: stripeEmail,
      source: stripeToken,
      metadata: {
        userId: req.user.id,
      },
    });

    if (stripeTokenType === 'card') {
      const idempotency_key = uuidv4();
      const charge = await stripe.charges.create(
        {
          amount,
          currency: currency,
          customer: customer.id,
          description: description,
        },
        {
          idempotency_key,
        }
      );
      console.log('charge:');
      console.log(JSON.stringify(charge));
    } else {
      throw Error(`Unrecognized Stripe token type: "${stripeTokenType}"`);
    }

    status = 'success';
  } catch (err) {
    console.error(err);
    error = err;
  }

  res.json({ error, status });
});


// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// app.get('/api/:username/home')

// app.post('/api/search', (req, res) => {
// 	let post = req.body.search
// 	//SQL to find it in
// 	db.any('INSERT INTO history (search) VALUES ($1)', [post])
// 	res.send(
// 		`I received your POST request. This is what you sent me: ${post}`,
// 	);
// });