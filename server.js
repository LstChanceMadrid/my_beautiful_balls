const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pgp = require('pg-promise')();
const connectionString = "postgres://jtyliushcpedti:70bb3c3dcb1ebd55baa74d89081461ad3829669a056b0fb3bce64b6bbbadd4a3@ec2-54-83-8-246.compute-1.amazonaws.com:5432/dfa2rgb3i6r5af?ssl=true"
const db= pgp(connectionString);
const port = process.env.PORT || 5000;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

// app.post('/api/search', (req, res) => {
//     let search = req.body.search;
//     db.any('SELECT username FROM users', [search]).then(result => {
//         console.log(result)

//         res.json({result : result})
//     }).catch(e => {
//         console.log(e)
//     })
// })

app.post('/api/register', (req, res) => {
    console.log('register server')
    
    let username = req.body.username
    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let email = req.body.email
    let password = req.body.password

    db.none("SELECT username FROM users WHERE username = $1", [username]).then(() => {
        console.log('register server after do none')
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
    console.log('login server')
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


// app.get('/api/:username/home')


// app.post('/api/search', (req, res) => {

// 	let post = req.body.search
// 	//SQL to find it in
// 	db.any('INSERT INTO history (search) VALUES ($1)', [post])
// 	res.send(
// 		`I received your POST request. This is what you sent me: ${post}`,
// 	);
// });






















// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));


















const makeitup = () => {
    db.any('CREATE TABLE users(id SERIAL PRIMARY KEY, username VARCHAR(15) NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)').catch(e => {
        console.log(e)
    })
}

