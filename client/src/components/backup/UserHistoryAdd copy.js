import React, { Component } from "react";
import { post } from "axios";
import Button from "@material-ui/core/Button";

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

class UserHistoryAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      emotion: "",
      objectItems: "",
      userEmotions: "",
      completed: 0
    };
  }
  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callItemApi()
      .then(res => this.setState({ objectItems: res }))
      .catch(err => console.log(err));
    this.callEmotionApi()
      .then(res => this.setState({ userEmotions: res }))
      .catch(err => console.log(err));
    // this.callHistoryApi()
    //   .then(res => this.setState({ userHistory: res }))
    //   .catch(err => console.log(err));
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

  // callHistoryApi = async () => {
  //   const response = await fetch("/api/userHistory");
  //   const body = await response.json();
  //   console.log(body);
  //   return body;
  // };

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  handleFormSubmit = e => {
    // debugger;
    e.preventDefault();
    this.addHitory().then(response => {
      console.log(response.data);
      this.props.stateRefresh();
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

  handleClickItem = e => {
    this.setState({
      item: e.target.value
    });
  };

  handleClickEmotion = e => {
    this.setState({
      emotion: e.target.value
    });
  };

  addHitory = () => {
    const url = "/api/historys";

    const formData = {
      item: this.state.item,
      emotion: this.state.emotion
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
    const { classes } = this.props;
    return (
      <div>
        {this.state.objectItems ? (
          this.state.objectItems.map(c => {
            return (
              // <ObjectItem
              //   key={c.id}
              //   id={c.id}
              //   item={c.item}
              //   // onClick={this.callItemApi()}
              // />
              <Button
                variant="contained"
                color="primary"
                key={c.id}
                id={c.id}
                item={c.item}
                onClick={this.handleClickItem}
              >
                {c.item}
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
        <br />
        {this.state.userEmotions ? (
          this.state.userEmotions.map(c => {
            return (
              <Button
                variant="contained"
                color="primary"
                key={c.id}
                id={c.id}
                item={c.emotion}
                onClick={this.handleClickEmotion}
              >
                {c.emotion}
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
        <form onSubmit={this.handleFormSubmit}>
          <h1>History 추가</h1>
          item:
          <input
            type="text"
            name="item"
            value={this.state.item}
            onChange={this.handleValueChange}
          />
          {/* <br /> */}
          {/* emotion:
          <input
            type="text"
            name="emotion"
            value={this.state.emotion}
            onChange={this.handleValueChange}
          /> */}
          <button type="submit">추가하기</button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(UserHistoryAdd);
