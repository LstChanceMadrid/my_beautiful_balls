import React, { Component } from 'react'
import Immutable from 'immutable'

class DrawArea extends Component {
    constructor() {
      super();
      this.state = {
        isDrawing: false,
        lines: new Immutable.List(),
        viewBox: "0 0 281 176"
      };
    }

    componentDidMount() {
        document.addEventListener("mouseup", this.handleMouseUp)

    }

    componentWillUnmount() {
        document.removeEventListener("mouseup", this.handleMouseUp)
    }

    handleMouseDown = (mouseEvent) => {
        if (mouseEvent.button !== 0) {
            return;
        }
        const point = this.relativeCoordinatesForEvent(mouseEvent)
        this.setState(prevState => {
            return {
                lines: prevState.lines.push(new Immutable.List([point])),
                isDrawing : true
            }
        })
    }

    handleMouseMove = (mouseEvent) => {
        if (!this.state.isDrawing) {
            return
        }
        const point = this.relativeCoordinatesForEvent(mouseEvent)
        this.setState(prevState => ({
            lines : prevState.lines.updateIn([prevState.lines.size - 1], line => line.push(point))
        }))
    }

    handleMouseUp = () => {
        this.setState({isDrawing : false})
        let ballImage = document.querySelector('svg').innerHTML
        localStorage.setItem('ballImage', ballImage)
    }

    relativeCoordinatesForEvent = (mouseEvent) => {
        let proportion, mqMobile, mqMedium, mqSmall, mqLarge, mqExtraLarge;

        mqMobile = matchMedia("(min-width: 1px")
        mqSmall  = matchMedia("(min-width: 500px)")
        mqMedium = matchMedia("(min-width: 840px)")
        mqLarge = matchMedia("(min-width: 1024px)")
        mqExtraLarge = matchMedia("(min-width: 1250px)")

        if (mqMobile.matches) {
            proportion = 1.680
        }
        if (mqSmall.matches) {
            proportion = 1
        } 
        if (mqMedium.matches) {
            proportion = 0.821
        }
        if (mqLarge.matches) {
            proportion = 0.672
        }
        if (mqExtraLarge.matches) {
            proportion = 0.551
        } 

        const boundingRect = this.refs.drawArea.getBoundingClientRect()

        return new Immutable.Map({
            x : mouseEvent.clientX*proportion - boundingRect.left*proportion,
            y : mouseEvent.clientY*proportion - boundingRect.top*proportion
        })
    }

    render() {
        return (
            <div id="draw-container">
            <svg className="draw-area" ref="drawArea" onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} viewBox="0 0 472 295">
                <Drawing lines={this.state.lines} />
            </svg>
            </div>
        );
    }
}

const Drawing = ({ lines }) => {

    var mqMobile, mqMedium, updateViewBox, mqSmall, mqLarge, mqExtraLarge;

        let svg = document.getElementsByTagName('svg');
        
        /* Define our media query and media query object */
        mqMobile = matchMedia("(min-width: 1px")
        mqSmall  = matchMedia("(min-width: 500px)")
        mqMedium = matchMedia("(min-width: 840px)")
        mqLarge = matchMedia("(min-width: 1024px)")
        mqExtraLarge = matchMedia("(min-width: 1250px)")

    updateViewBox = () => {
        if (mqMobile.matches) {
            svg.viewBox = "0 0 281 176"
            svg.x = "140"
            svg.y = "88"
        }
        if (mqSmall.matches) {
            svg.viewBox = "0 0 472 295"
            svg.x = "236"
            svg.y = "148"
        } 
        if (mqMedium.matches) {
            svg.viewBox = "0 0 575 359"
        }
        if (mqLarge.matches) {
            svg.viewBox = "0 0 702 439"
        }
        if (mqExtraLarge.matches) {
            svg.viewBox = "0 0 857 536"
        } 
    }
    
    /* Fire on document load */
    // WebKit/Blink browsers

    // Firefox & IE
            

    /* Fire if the media condition changes */
    mqSmall.addListener(updateViewBox);
    mqMedium.addListener(updateViewBox);
    mqLarge.addListener(updateViewBox);
    mqExtraLarge.addListener(updateViewBox);

    return (
        <svg className="drawing" viewBox="0 0 472 295">
            {lines.map((line, index) => (
                <DrawingLine key={index} line={line} />
            ))}
        </svg> 
    )
}

const DrawingLine = ({ line }) => {
    const pathData = "M " +
        line
            .map(p => {
                return p.get('x') + ' ' + p.get('y')
            })
            .join(" L ")
    return <path className="path" d={pathData} />
}

export default DrawArea