import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

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
  }
});

// handleClickOpen = () => {
//   this.timer = setInterval(this.progress, 20);
//   this.callQuestionApi()
//     .then(res => this.setState({ questions: res }))
//     .catch(err => console.log(err));
//   this.setState({
//     open: true
//   });
// };

class ItemAddList1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: "",
      labelWidth: 0
    };
  }
  render() {
    const { classes } = this.props;

    const handleChange = e => {
      let nextState = {};
      nextState[e.target.name] = e.target.value;
      this.setState(nextState);
    };
    return (
      <div>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={this.state.age}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="standard-basic" label="제목" />
          <br />
          <TextField id="standard-basic" label="투자시간" />
          <br />
          <TextField id="standard-basic" label="진도" />
          <br />
          <TextField id="outlined-basic" label="#태그" variant="outlined" />
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(ItemAddList1);
