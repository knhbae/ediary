import React, { Component } from "react";
import { post } from "axios";
// import { response } from "express";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
// import { DialogContentText } from "@material-ui/core";
import UserQuestionCall from "../UserQuestionCall";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  hidden: {
    display: "none"
  },
  historyItem: {
    background: "linear-gradient(90deg, white 70%, skyblue 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px"
  },
  historyItem10: {
    background: "linear-gradient(90deg, white 10%, skyblue 90%)"
  },
  historyItem20: {
    background: "linear-gradient(90deg, white 20%, skyblue 90%)"
  },
  historyItem30: {
    background: "linear-gradient(90deg, white 30%, skyblue 90%)"
  },
  historyItem40: {
    background: "linear-gradient(90deg, white 40%, skyblue 90%)"
  },
  historyItem50: {
    background: "linear-gradient(90deg, white 50%, skyblue 90%)"
  },
  historyItem60: {
    background: "linear-gradient(90deg, white 60%, skyblue 90%)"
  },
  historyItem70: {
    background: "linear-gradient(90deg, white 70%, skyblue 90%)"
  },
  historyItem80: {
    background: "linear-gradient(90deg, white 80%, skyblue 90%)"
  },
  historyItem90: {
    background: "linear-gradient(90deg, white 90%, skyblue 90%)"
  },
  historyItem100: {
    background: "linear-gradient(90deg, white 100%, skyblue 90%)"
  }
});

class UserQuestionAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: "",
      answer: "",
      open: false
    };
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callQuestionApi()
      .then(res => this.setState({ questions: res }))
      .catch(err => console.log(err));
  }
  callQuestionApi = async () => {
    const url = "/api/userQuestion/" + this.props.item_id;
    const response = await fetch(url);
    const body = await response.json();
    return body;
  };
  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.addAnswer().then(response => {
      console.log(response.data);
      this.props.stateRefresh();
    });
    this.setState({
      answer: "",
      open: false
    });
    // window.location.reload();
  };

  handleValueChange = e => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };
  addAnswer = () => {
    const url = "/api/addQuestionAnswers";
    const formData = {
      history_id: this.props.id,
      question_id: 4,
      answer: this.state.answer
    };

    const config = {
      headers: {
        "content-type": "application/json"
      }
    };
    return post(url, formData, config);
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      //   history_id: "",
      questions: "",
      answer: "",
      open: false
    });
  };

  render() {
    const { classes } = this.props;
    let classHistoryItem = classes.historyItem10;
    let rank = 30;

    if (rank > 90) {
      classHistoryItem = classes.historyItem100;
    } else if (rank > 80) {
      classHistoryItem = classes.historyItem90;
    } else if (rank > 70) {
      classHistoryItem = classes.historyItem80;
    } else if (rank > 60) {
      classHistoryItem = classes.historyItem70;
    } else if (rank > 50) {
      classHistoryItem = classes.historyItem60;
    } else if (rank > 40) {
      classHistoryItem = classes.historyItem50;
    } else if (rank > 30) {
      classHistoryItem = classes.historyItem40;
    } else if (rank > 20) {
      classHistoryItem = classes.historyItem30;
    } else if (rank > 10) {
      classHistoryItem = classes.historyItem20;
    } else {
      classHistoryItem = classes.historyItem10;
    }
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
          align="center"
          className={(classes.historyItem, classHistoryItem)}
        >
          {this.props.item}
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>
            <div>
              {this.state.questions ? (
                this.state.questions.map(c => {
                  return <div>{c.question}</div>;
                })
              ) : (
                <CircularProgress
                  className={classes.progress}
                  variant="determinate"
                  value={this.state.completed}
                />
              )}
            </div>
            {/* <UserQuestionCall id={this.props.item_id} /> */}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="응답"
              type="text"
              name="answer"
              value={this.state.answer}
              onChange={this.handleValueChange}
            />
            <br />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleFormSubmit}
            >
              추가
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleClose}
            >
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(UserQuestionAdd);
