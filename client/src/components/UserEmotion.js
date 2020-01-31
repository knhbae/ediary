import React, { Component } from "react";

class UserEmotion extends Component {
  render() {
    return (
      <div>
        <p>{this.props.emotion}</p>
      </div>
    );
  }
}

export default UserEmotion;
