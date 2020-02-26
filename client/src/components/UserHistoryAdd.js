import React, { Component } from "react";
import { post } from "axios";

class UserHistoryAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      emotion: "",
      item_id: "",
      emotion_id: ""
    };
  }

  handleFormSubmit = e => {
    // debugger;
    e.preventDefault();
    this.addHitory().then(response => {
      console.log(response.data);
      // this.props.stateRefresh();
    });
    this.setState({
      item: "",
      emotion: ""
    });
    window.location.reload();
  };

  handleValueChange = e => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  addHitory = () => {
    const url = "/api/historys";

    const formData = {
      item: this.props.item,
      emotion: this.props.emotion,
      item_id: this.props.item_id,
      emotion_id: this.props.emotion_id
    };
    console.log(formData);
    debugger;
    // const formData = new FormData();

    // formData.append("item", this.state.item);
    // formData.append("emotion", this.state.emotion);

    const config = {
      headers: {
        // "content-type": "multipart/form-data"
        "content-type": "application/json"
      }
    };

    return post(url, formData, config);
  };
  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        {/* item: */}
        <input
          // type="text"
          type="hidden"
          name="item"
          value={this.props.item}
          onChange={this.handleValueChange}
        />
        <br />
        {/* emotion: */}
        <input
          // type="text"
          type="hidden"
          name="emotion"
          value={this.props.emotion}
          onChange={this.handleValueChange}
        />
        <input
          // type="text"
          type="hidden"
          name="item_id"
          value={this.props.item_id}
          onChange={this.handleValueChange}
        />
        <br />
        {/* emotion: */}
        <input
          // type="text"
          type="hidden"
          name="emotion_id"
          value={this.props.emotion_id}
          onChange={this.handleValueChange}
        />
        <button type="submit">추가하기</button>
      </form>
    );
  }
}

export default UserHistoryAdd;
