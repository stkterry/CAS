import React, { Component } from 'react'
import { findDOMNode } from 'react-dom';


class Phase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      style: {}
    };
    
    const defaultSettings = {
      reverse: false,
      max: 35,
      perspective: 1000,
      easing: 'cubic-bezier(.03,.98,.52,.99)',
      scale: '1.1',
      speed: '1000',
      transition: true,
      axis: null,
      reset: true
    };
    
    this.width = null;
    this.height = null;
    this.left = null;
    this.top = null;
    this.transitionTimeout = null;
    this.updateCall = null;
    this.element = null;
    this.settings = {
      ...defaultSettings,
      ...this.props.options,
    };

    this.reverse = this.settings.reverse ? -1 : 1;

  } componentDidMount() {
    this.element = findDOMNode(this);
  } 
  
  componentWillUnmount() {
    clearTimeout(this.transitionTimeout);
    cancelAnimationFrame(this.updateCall);
  } 
  
  handleMouseEnter = event =>  {
    this.updateElementPosition();
    this.setTransition();
    this.setState(prevState => ({
      style: {
        ...prevState.style,
        ...this.props.condStyle.on
      }
    }))
  } 
  
  reset() {
    window.requestAnimationFrame(() => {
      this.setState(prevState => ({
        style: {
          ...prevState.style,
          ...this.props.condStyle.off,
          transform: `perspective(${this.settings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        }
      }))
    })
  } 
  
  handleMouseMove = event => {
    event.persist()    
    
    if (this.updateCall !== null) {
      window.cancelAnimationFrame(this.updateCall)
    } 
    this.event = event;
    this.updateCall = requestAnimationFrame(this.update.bind(this, event))
  } 
  
  setTransition() {
    clearTimeout(this.transitionTimeout)    

    this.setState(prevState => ({
      style: {
        ...prevState.style,
        transition: `${this.settings.speed}ms ${this.settings.easing}`,
      }
    }))    
    
    this.transitionTimeout = setTimeout(() => {
      this.setState(prevState => ({
        style: {
          ...prevState.style,
          transition: ''
        }
      }))
    }, this.settings.speed)
  } 
  
  handleMouseLeave = event => {
    this.setTransition()
    if (this.settings.reset) {
      this.reset()
    }
  } 
  
  getValues(e) {
    const xPos = e.nativeEvent.clientX - this.left; //
    const yPos = e.nativeEvent.clientY - this.top; //
    // const wMult = 300 / this.width;

    const x = xPos / this.width;
    const y = yPos / this.height;
    const _x = Math.min(Math.max(x, 0), 1);
    const _y = Math.min(Math.max(y, 0), 1);
    const tiltX = (this.reverse * (this.settings.max / 2 - _x * this.settings.max)).toFixed(2);
    const tiltY = (this.reverse * (_y * this.settings.max - this.settings.max / 2)).toFixed(2);  
    const percentageX = _x * 100;
    const percentageY = _y * 100;  

    // const offsetX = 0.52 - x; //
    // const offsetY = 0.52 - y; //
    // const dx = xPos / (this.width / 2);
    // const dy = yPos / (this.width / 2);

    // const rotY = (offsetX - dx)*(0.07 * wMult);
    // const rotX = (dy - offsetY)*(0.1 * wMult);
    // const arad = Math.atan2(dy, dx);
    // let angle = arad * 180 / Math.PI - 90;
    // angle = angle < 0 ? angle + 360 : angle;

    return {
      tiltX,
      tiltY,
      percentageX,
      percentageY,
      // angle,
      // x,
      // y
    }
  } 
  
  updateElementPosition() {
    const rect = this.element.getBoundingClientRect()
    this.width = this.element.offsetWidth
    this.height = this.element.offsetHeight
    this.left = rect.left
    this.top = rect.top
  } 
  
  update(e) {
    const values = this.getValues(e)
    this.setState(prevState => ({
      style: {
        ...prevState.style,
        transform: `perspective(${this.settings.perspective}px) rotateX(${this.settings.axis === 'x' ? 0 : values.tiltY}deg) rotateY(${this.settings.axis === 'y' ? 0 : values.tiltX}deg) scale3d(${this.settings.scale}, ${this.settings.scale}, ${this.settings.scale})`,
        // background: `linear-gradient(${values.angle}deg, rgb(255, 255, 255, ${values.x*0.4}) 0%, rgba(217, 219, 255,0.1) 90%)`,
        
      }
    }))    
    
    this.updateCall = null
  } 
  
  render() {
    const style = {
      ...this.props.style,
      ...this.state.style
    }
    return (
      <div className={this.props.class}
        style={style}
        onMouseEnter={this.handleMouseEnter}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
      >
        {this.props.children}
      </div>
    )
  }
} export default Phase