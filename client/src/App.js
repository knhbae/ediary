import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import ObjectItem from "./components/OjbectItem";
import UserEmotion from "./components/UserEmotion";

class App extends Component {
  state = {
    objectItems: ""
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({ objectItems: res }))
      .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch("/api/objectItems");
    const body = await response.json();
    return body;
  };

  render() {
    return (
      <div>
        {this.state.objectItems
          ? this.state.objectItems.map(c => {
              return <ObjectItem key={c.id} id={c.id} item={c.item} />;
            })
          : ""}
        <UserEmotion />
      </div>
    );
  }
}

export default App;
