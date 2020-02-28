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
// import UserQuestionCall from "./UserQuestionCall";
// import CircularProgress from "@material-ui/core/CircularProgress";

// import ItemAddList1 from "./ItemAddList1";
//Add list
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  hidden: {
    display: "none"
  },
  historyItem: {
    background: "linear-gradient(90deg, red 90%, white 70%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .5)",
    color: "white",
    height: 48,
    padding: "0 30px"
  },
  historyItem10: {
    background: "linear-gradient(90deg, red 10%, white 90% )"
  },
  historyItem20: {
    background: "linear-gradient(90deg, red 20%, white 90% )"
  },
  historyItem30: {
    background: "linear-gradient(90deg, red 30%, white 90% )"
  },
  historyItem40: {
    background: "linear-gradient(90deg, red 40%, white 90% )"
  },
  historyItem50: {
    background: "linear-gradient(90deg, red 50%, white 90% )"
  },
  historyItem60: {
    background: "linear-gradient(90deg, red 60%, white 90% )"
  },
  historyItem70: {
    background: "linear-gradient(90deg, red 70%, white 90% )"
  },
  historyItem80: {
    background: "linear-gradient(90deg, red 80%, white 90% )"
  },
  historyItem90: {
    background: "linear-gradient(90deg, red 90%, white 90% )"
  },
  historyItem100: {
    background: "linear-gradient(90deg, red 100%, white 90% )"
  }
});

class UserQuestionAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sub_item_id: 4,
      sub_title: "",
      duration: "",
      progress: "",
      memo: "",
      open: false,
      completed: 0
    };
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.addAnswer().then(response => {
      console.log(response.data);
      // this.props.stateRefresh();
    });
    this.setState({
      sub_item_id: "",
      sub_title: "",
      duration: "",
      progress: "",
      memo: "",
      open: false
    });
    // window.location.reload();
  };

  handleValueChange = e => {
    // this.timer = setInterval(this.progress, 200);
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };
  addAnswer = () => {
    const url = "/api/addHistoryDetails";
    const formData = {
      history_id: this.props.id,
      item_id: this.props.item_id,
      sub_item_id: this.state.sub_item_id,
      sub_title: this.state.sub_title,
      duration: this.state.duration,
      progress: this.state.progress,
      memo: this.state.memo
    };
    const config = {
      headers: {
        "content-type": "application/json"
      }
    };
    return post(url, formData, config);
  };

  handleClickOpen = () => {
    this.timer = setInterval(this.progress, 20);
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      sub_item_id: "",
      sub_title: "",
      duration: "",
      progress: "",
      memo: "",
      open: false
    });
    // debugger;
  };

  render() {
    const { classes } = this.props;
    let classHistoryItem = classes.historyItem10;
    // let rank = 30;
    let rank = this.props.rank * 100;
    // console.log(rank);
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
            <div>입력</div>
          </DialogTitle>
          <DialogContent>
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">제목</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="sub_title"
                  // value={this.state.sub_title}
                  onChange={this.handleValueChange}
                >
                  <MenuItem value="">
                    <em>제목선택</em>
                  </MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={"직접입력하세요"}>직접입력</MenuItem>
                </Select>
              </FormControl>
              <form className={classes.root} noValidate autoComplete="off">
                <TextField
                  id="standard-basic"
                  label="제목"
                  placeholder="제목신규입력"
                  name="sub_title"
                  value={this.state.sub_title}
                  onChange={this.handleValueChange}
                />
                <br />
                <TextField
                  id="standard-basic"
                  label="투자시간"
                  name="duration"
                  value={this.state.duration}
                  onChange={this.handleValueChange}
                />
                <br />
                <TextField
                  id="standard-basic"
                  label="진도"
                  name="progress"
                  value={this.state.progress}
                  onChange={this.handleValueChange}
                />
                <br />
                <TextField
                  id="outlined-basic"
                  label="#태그"
                  name="memo"
                  value={this.state.memo}
                  onChange={this.handleValueChange}
                  variant="outlined"
                />
              </form>
            </div>
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
