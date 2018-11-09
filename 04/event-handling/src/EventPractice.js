import React, { Component } from "react";

class EventPractice extends Component {
  state = {
    message: "",
    username: ""
  };

  constructor(props) {
    super(props);
    // this._handleChange = this._handleChange.bind(this);
    // this._handleClick = this._handleClick.bind(this);
  }

  _handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  _handleClick = () => {
    alert(this.state.username + " : " + this.state.message);
    this.setState({
      message: "",
      username: ""
    });
  };

  _handleKeyPress = e => {
    if (e.key === "Enter") {
      this._handleClick();
    }
  };
  render() {
    return (
      <div>
        <h1>Event Practice</h1>
        <input
          type="text"
          name="username"
          placeholder="input username"
          value={this.state.username}
          onChange={this._handleChange}
        />
        <input
          type="text"
          name="message"
          placeholder="input message"
          value={this.state.message}
          onChange={this._handleChange}
          onKeyPress={this._handleKeyPress}
        />
        <button onClick={this._handleClick}>확인</button>
      </div>
    );
  }
}

export default EventPractice;
