import React, { Component } from "react";

class ObjectItem extends Component {
  render() {
    return (
      <div>
        <p>{this.props.item}</p>
      </div>
    );
  }
}

export default ObjectItem;
