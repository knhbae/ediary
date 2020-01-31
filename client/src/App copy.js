import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import ObjectItem from "./components/OjbectItem";
import UserEmotion from "./components/UserEmotion";
import UserHistory from "./components/UserHistory";
import UserHistoryAdd from "./components/UserHistoryAdd";

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
    userEmotions: "",
    userHistory: "",
    completed: 0
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callItemApi()
      .then(res => this.setState({ objectItems: res }))
      .catch(err => console.log(err));
    this.callEmotionApi()
      .then(res => this.setState({ userEmotions: res }))
      .catch(err => console.log(err));
    this.callHistoryApi()
      .then(res => this.setState({ userHistory: res }))
      .catch(err => console.log(err));
  }
  callItemApi = async () => {
    const response = await fetch("/api/objectItems");
    const body = await response.json();
    console.log(body);
    return body;
  };
  callEmotionApi = async () => {
    const response = await fetch("/api/userEmotions");
    const body = await response.json();
    console.log(body);
    return body;
  };

  callHistoryApi = async () => {
    const response = await fetch("/api/userHistory");
    const body = await response.json();
    console.log(body);
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
            return (
              <ObjectItem
                key={c.id}
                id={c.id}
                item={c.item}
                // onClick={this.callItemApi()}
              />
            );
          })
        ) : (
          <CircularProgress
            className={classes.progress}
            variant="determinate"
            value={this.state.completed}
          />
        )}

        {/* {this.state.userEmotions ? (
          this.state.userEmotions.map(c => {
            return <UserEmotion key={c.id} id={c.id} emotion={c.emotion} />;
          })
        ) : (
          <CircularProgress
            className={classes.progress}
            variant="determinate"
            value={this.state.completed}
          />
        )}

        {this.state.userHistory ? (
          this.state.userHistory.map(c => {
            return (
              <UserHistory
                key={c.id}
                id={c.id}
                emotion={c.emotion}
                item={c.item}
                createdate={c.createdate}
              />
            );
          })
        ) : (
          <CircularProgress
            className={classes.progress}
            variant="determinate"
            value={this.state.completed}
          />
        )} */}
        <UserHistoryAdd />
      </div>
    );
  }
}
export default withStyles(styles)(App);
