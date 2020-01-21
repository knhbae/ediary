import React, { Component } from "react";

class ObjectItem extends Component {
  render() {
    return (
      <div>
        <p>{this.props.item}</p>
        {/* <p>#공부</p>
        <p>#독서</p>
        <p>#운동</p>
        <p>#퇴근</p>
        <p>#육아</p> */}
      </div>
    );
  }
}

export default ObjectItem;
