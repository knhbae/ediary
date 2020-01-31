import React, { Component } from "react";
import { post } from "axios";

class UserHistoryAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      emotion: ""
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
      emotion: this.props.emotion
    };

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
        <h1>History 추가</h1>
        item:
        <input
          type="text"
          name="item"
          value={this.props.item}
          onChange={this.handleValueChange}
        />
        <br />
        emotion:
        <input
          type="text"
          name="emotion"
          value={this.props.emotion}
          onChange={this.handleValueChange}
        />
        <button type="submit">추가하기</button>
      </form>
    );
  }
}

export default UserHistoryAdd;
