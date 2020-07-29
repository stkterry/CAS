import React from 'react'

const defaultSettings = {
  reverse: false,
  max: 40,
  perspective: 750,
  easing: 'cubic-bezier(.03,.98,.52,.99)',
  scale: '1.1',
  speed: '1000',
  transition: true,
};

class Phase extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      style: {
        ...this.props.anim
      }
    };
    
    this.width = null;
    this.height = null;
    this.left = null;
    this.top = null;
    this.transitionTimeout = null;
    this.updateCall = null;
    this.phase = null;
    this.settings = {
      ...defaultSettings,
      ...this.props.options,
    };
    this.settings.defTransition = `${this.settings.speed}ms ${this.settings.easing}`;
    this.reverse = this.settings.reverse ? -1 : 1;
    this.phaseRef = React.createRef();
  } 
  
  componentDidMount() {
    this.phase = this.phaseRef.current;
  } 
  
  componentWillUnmount() {
    clearTimeout(this.transitionTimeout);
    cancelAnimationFrame(this.updateCall);
  } 
  mouseEnter = () =>  {
    this.updatePos();
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
          transform: `perspective(${this.settings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
        }
      }))
    })
  } 
  
  mouseMove = event => {
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
        transition: this.settings.defTransition,
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
  
  mouseLeave = () => {
    this.setTransition()
    this.reset()
  } 
  
  getValues(event) {
    const xPos = event.nativeEvent.clientX - this.left; //
    const yPos = event.nativeEvent.clientY - this.top; //
    
    const x = xPos / this.width;
    const y = yPos / this.height;
    const _x = Math.min(Math.max(x, 0), 1);
    const _y = Math.min(Math.max(y, 0), 1);
    const tiltX = (this.reverse * (this.settings.max / 2 - _x * this.settings.max)).toFixed(2);
    const tiltY = (this.reverse * (_y * this.settings.max - this.settings.max / 2)).toFixed(2);  
    const percentageX = _x * 100;
    const percentageY = _y * 100;  
    
    return {
      tiltX,
      tiltY,
      percentageX,
      percentageY
    }
  } 
  
  updatePos() {
    const rect = this.phase.getBoundingClientRect()
    this.width = this.phase.offsetWidth
    this.height = this.phase.offsetHeight
    this.left = rect.left
    this.top = rect.top
  } 
  
  update(event) {
    const values = this.getValues(event)
    this.setState(prevState => ({
      style: {
        ...prevState.style,
        transform: `perspective(${this.settings.perspective}px) rotateX(${values.tiltY}deg) rotateY(${values.tiltX}deg) scale(${this.settings.scale})`
        
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
      <div
        ref={this.phaseRef}
        className={this.props.className}
        style={style}
        onMouseEnter={this.mouseEnter}
        onMouseMove={this.mouseMove}
        onMouseLeave={this.mouseLeave}
      >
        {this.props.children}
      </div>
    )
  }
} export default Phase