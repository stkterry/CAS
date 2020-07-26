import React from "react";

export default class CardFront extends React.Component {

  className = `card_static-${this.props.color}`;
  color = this.props.color;
  amt = this.props.amt;

  state = {
    left: this.props.left || 0,
    top: this.props.top || 0,
    amt: this.props.amt || 1,
    className: (this.props.color) ? `card_static-${this.props.color}` : 'card_static-black',
    style: []
  }
  componentDidMount() {
    this.genStyle();

  }
  componentDidUpdate(prevProps) {
    if (prevProps.amt !== this.props.amt) {
      this.setState({ amt: this.props.amt })
      this.genStyle();
    }
  }

  genStyle = () => {
    let style = [];
    const leftM = Math.max(this.state.left / (this.state.amt - 1), -Infinity);
    const topM = Math.max(this.state.top/(this.state.amt - 1), -Infinity);
    for (let i = this.state.amt; 0 <= i; i--) {
      style.push({
        left: String(-leftM * i) + 'px',
        top: String(-topM * i) + 'px',
      })
    }
    this.setState({style: style});
  }

  renderStack = () => {
    return (
      this.state.style.map((style, idx) => 
        <div 
          key={idx}
          style={style}
          className={`card_static-stack ${this.className}`}  
        />
      )
    )
  }

  render = () => (
    <div className={`card_static-container ${this.props.className}`}>
        {this.renderStack()}
      {/* <div className="card_static-stack_container">
      </div> */}
      <div className={`card_static-front ${this.className}`}>
        <h3>Crimes</h3>
        <h3>Against</h3>
        <h3>Stupidity</h3>
      </div>
    </div>
  )
}