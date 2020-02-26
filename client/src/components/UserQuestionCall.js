import React, { Component } from "react";
//Progress Bar
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});
class UserQuestionCall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: "",
      completed: 0
    };
  }

  //   stateRefresh = () => {
  //     this.setState({
  //       question: "",
  //       completed: 0
  //       // searchKeyword: ""
  //     });
  //     this.callQuestionApi()
  //       .then(res => this.setState({ userHistory: res }))
  //       .catch(err => console.log(err));
  //   };

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callQuestionApi()
      .then(res => this.setState({ questions: res }))
      .catch(err => console.log(err));
  }
  callQuestionApi = async () => {
    const url = "/api/userQuestion/" + this.props.id;
    const response = await fetch(url);
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
    );
  }
}

export default withStyles(styles)(UserQuestionCall);
