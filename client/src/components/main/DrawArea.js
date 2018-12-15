import React, { Component } from 'react'
import Immutable from 'immutable'
import { connect } from 'react-redux'

class DrawArea extends Component {
    constructor() {
      super();
      this.state = {
        isDrawing: false,
        lines: new Immutable.List(),
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
    }

    relativeCoordinatesForEvent = (mouseEvent) => {
        const boundingRect = this.refs.drawArea.getBoundingClientRect()
        return new Immutable.Map({
            x : mouseEvent.clientX - boundingRect.left,
            y : mouseEvent.clientY - boundingRect.top
        })
    }


    render() {
        return (
            
                <div className="draw-area" ref="drawArea" onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove}>

                <Drawing lines={this.state.lines} />
            </div>
        );
    }
}


const Drawing = ({ lines }) => {
    return (
        <svg className="drawing">
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