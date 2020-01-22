import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import ObjectItem from "./components/OjbectItem";
import UserEmotion from "./components/UserEmotion";

//Progress Bar
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "100%",
    minWidth: 1080
    // marginTop: theme.spacing(3),
    // overflowX: "auto"
  },
  // table: {
  //   minWidth: 1080
  // },
  progress: {
    marginTop: theme.spacing(2)
  }
});

class App extends Component {
  state = {
    objectItems: "",
    completed: 0
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
  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.objectItems ? (
          this.state.objectItems.map(c => {
            return <ObjectItem key={c.id} id={c.id} item={c.item} />;
          })
        ) : (
          <CircularProgress
            className={classes.progress}
            variant="determinate"
            value={this.state.completed}
          />
        )}
        <UserEmotion />
      </div>
    );
  }
}
export default withStyles(styles)(App);
