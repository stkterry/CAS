import React from "react";

import Phase from "./Phase";


class CardLook extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      styleCardLook: {
        transform: ''
      },
      styleCardContainer: {
        transform: ''
      }
    }
  }

  enter = () => {
    this.setState({
      styleCardContainer: {
        transform: 'scale(1.7)'
      }
    })
  }

  leave = () => {
    this.setState({ 
      styleCardLook: {
        transform: '',
        // transition: 'all 0.2s ease-out'
      }
    })
  }

  hover = event => {
    let xPos = event.clientX - event.target.offsetLeft;
    let yPos = event.clientY - event.target.offsetTop;
    let w = event.target.offsetWidth;
    let h = event.target.offsetHeight;

    let wMultiple = 300 / w;

    let offsetX = 0.52 - xPos / w;
    let offsetY = 0.52 - yPos / h;

    let dx = xPos - w / 2;
    let dy = yPos - h / 2;

    let yRotate = (offsetX - dx)*(0.07 * wMultiple);
    let xRotate = (dy - offsetY)*(0.1 * wMultiple);

    let transform = 'rotateX(' + xRotate + 'deg) rotateY(' + yRotate + 'deg) scale3d(1.1, 1.1, 1.1)';

    let arad = Math.atan2(dy, dx);
    let angle = arad * 180 / Math.PI - 90;

    if (angle < 0) {
      angle = angle + 360;
    }

    this.setState({ 
      styleCardLook: {
        transform: transform
      }
    });
  }

  // render() {
  //   const { _id, content } = this.props.card;
  //   return (
  //     <h5
  //       onMouseMove={e => this.hover(e)}
  //       onMouseLeave={e => this.leave()}
  //       className='card_look'
  //       style={this.state.styleCardLook}
  //     >
  //       {content}
  //     </h5>
  //   )
  // }

  render () {
    const { _id, content } = this.props.card;

    return (
      <Phase>
        <h1 className="card_look">{content}</h1>
      </Phase>
    )
  }
}

export default CardLook;