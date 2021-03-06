import React, { Component } from "react";
// import { post } from "axios";
// import logo from "./logo.svg";
import "./App.css";
// import ObjectItem from "./components/OjbectItem";
// import UserEmotion from "./components/UserEmotion";
import UserHistory from "./components/UserHistory";
import UserHistoryAdd from "./components/UserHistoryAdd";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import ButtonAppBar from "./components/ButtonAppBar";

//Progress Bar
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";

//Table
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const styles = theme => ({
  root: {
    width: "100%",
    minWidth: 600
    // marginTop: theme.spacing(3),
    // overflowX: "auto"
  },
  // table: {
  //   minWidth: 1080
  // },
  progress: {
    marginTop: theme.spacing(2)
  },
  poundButton: {
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    // border: 0,
    // borderRadius: 3,
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    // color: "white",
    // height: 48,
    // padding: "0 30px"
  },
  emotionButton: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    // border: 0,
    // borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    width: "70px",
    height: "70px",
    // padding: "0 30px",
    margin: theme.spacing(1)
  }
});

class App extends Component {
  state = {
    objectItems: "",
    userEmotions: "",
    userHistory: "",
    item_id: "",
    item: "",
    emotion_id: "",
    emotion: "",
    rank: "",
    completed: 0
  };

  stateRefresh = () => {
    this.setState({
      userHistory: "",
      completed: 0
      // searchKeyword: ""
    });
    this.callHistoryApi()
      .then(res => this.setState({ userHistory: res }))
      .catch(err => console.log(err));
    this.callItemApi()
      .then(res => this.setState({ objectItems: res }))
      .catch(err => console.log(err));
    this.callEmotionApi()
      .then(res => this.setState({ userEmotions: res }))
      .catch(err => console.log(err));
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
    // console.log(body);
    return body;
  };
  callEmotionApi = async () => {
    const response = await fetch("/api/userEmotions");
    const body = await response.json();
    // console.log(body);
    return body;
  };

  callHistoryApi = async () => {
    const response = await fetch("/api/userHistory");
    const body = await response.json();
    // console.log(body);
    return body;
  };

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  //추가 실험
  handleClickItem = e => {
    // debugger;
    this.setState({
      item_id: e.currentTarget.id,
      item: e.currentTarget.innerText
      // item: item
    });
    console.log(this.state.item_id, this.state.item);
  };

  // handleClickItem = (id, item) => {
  //   // debugger;
  //   this.setState({
  //     item_id: id,
  //     item: item
  //     // item: item
  //   });
  // };

  handleClickEmotion = e => {
    // debugger;
    this.setState({
      emotion_id: e.currentTarget.id,
      emotion: e.currentTarget.innerText
    });
    console.log(this.state.emotion_id, this.state.emotion);
  };

  render() {
    const { classes } = this.props;
    // const cellList = ["일", "감정", "시간", "설정"];
    const cellList = ["일", "감정", "설정"];
    return (
      <div>
        <ButtonAppBar />
        <br />
        <div align="center">
          {this.state.objectItems ? (
            this.state.objectItems.map(c => {
              return (
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.poundButton}
                  key={c.id}
                  id={c.id}
                  item={c.item}
                  onClick={this.handleClickItem}
                >
                  #{c.item}
                </Button>
              );
            })
          ) : (
            <CircularProgress
              className={classes.progress}
              variant="determinate"
              value={this.state.completed}
            />
          )}
        </div>
        <br />
        <br />
        <div align="center">
          {this.state.userEmotions ? (
            this.state.userEmotions.map(c => {
              return (
                // <UserEmotion key={c.id} id={c.id} emotion={c.emotion} />
                <Fab
                  // variant="contained"
                  // color="secondary"
                  className={classes.emotionButton}
                  key={c.id}
                  id={c.id}
                  emotion={c.emotion}
                  onClick={this.handleClickEmotion}
                >
                  {c.emotion}
                </Fab>
              );
            })
          ) : (
            <CircularProgress
              className={classes.progress}
              variant="determinate"
              value={this.state.completed}
            />
          )}
        </div>
        <div align="center">
          <Button variant="outlined" color="primary">
            {this.state.item}
          </Button>{" "}
          <Fab className={classes.emotionButton}>{this.state.emotion}</Fab>
        </div>
        <div align="center">
          <UserHistoryAdd
            item={this.state.item}
            emotion={this.state.emotion}
            item_id={this.state.item_id}
            emotion_id={this.state.emotion_id}
          />
          <br />
        </div>
        <Paper className={classes.paper} align="center">
          <Table className={classes.table} align="center">
            <TableHead align="center">
              <TableRow align="center">
                {cellList.map(c => {
                  return (
                    <TableCell className={classes.tableHead} align="center">
                      {c}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody align="center">
              {this.state.userHistory ? (
                this.state.userHistory.map(c => {
                  return (
                    <UserHistory
                      stateRefresh={this.stateRefresh}
                      key={c.id}
                      id={c.id}
                      emotion={c.emotion}
                      emotion_id={c.emotion_id}
                      item={c.item}
                      item_id={c.item_id}
                      rank={c.percent}
                      createdate={c.createdate}
                      align="center"
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
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}
export default withStyles(styles)(App);
