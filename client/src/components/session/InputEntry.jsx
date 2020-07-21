import React from "react";

class InputEntry extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeStyle: this.props.activeStyle || {
        opacity: '1',
        // left: '1.5rem'
      },
      defaultStyle: this.props.defaultStyle || {
        opacity: '0',
        // left: '10rem'
      },
      hStyle: this.props.hStyle || {
        pointerEvents: 'none',
        position: 'absolute',
        top: '0rem',
        lineHeight: 'normal',
        fontSize: '1.2rem',
        left: '1rem',
        padding: "0rem .5rem",
        opacity: '0',
        transition: 'all 0.2s ease-in-out'
      },

      placeholder: this.props.placeholder
    }



  }

  onFocus = () => {
    this.setState(prevState => ({ 
      hStyle: {
        ...prevState.hStyle,
        ...this.state.activeStyle
      },
      placeholder: ""
    }));
    if (this.props.onFocus) this.props.onFocus();
  }
  onDefocus = () => {
    if (!this.props.value) {
      this.setState(prevState => ({ 
        hStyle: {
          ...prevState.hStyle,
          ...this.state.defaultStyle
        },
        placeholder: this.props.placeholder
      }));

    }
    if (this.props.onBlur) this.props.onBlur();
  }

  render() {
    return (
      <div style={{position: "relative"}} className={this.props.className}>
        <h4 style={this.state.hStyle} className="no-select">{this.props.placeholder}</h4>
        <input
          type={this.props.type}
          value={this.props.value}
          onChange={this.props.onChange}
          placeholder={this.state.placeholder}
          onFocus={this.onFocus}
          onBlur={this.onDefocus}
        />
      </div>
    )
  }

}

export default InputEntry;