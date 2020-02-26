import React, { Component } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import UserHistoryDelete from "./UserHistoryDelete";
import UserQuestionAdd from "./UserQuestionAdd";
// import Button from "@material-ui/core/Button";
// import { withStyles } from "@material-ui/core/styles";

class UserHistory extends Component {
  render() {
    // const { classes } = this.props;
    return (
      <TableRow align="center">
        <TableCell align="center">
          {/* <Button
            variant="outlined"
            color="primary"
            align="center"
            className={(classes.historyItem, classHistoryItem)}
          >
            {this.props.item}
          </Button> */}
          <UserQuestionAdd
            stateRefresh={this.props.stateRefresh}
            id={this.props.id}
            item={this.props.item}
            item_id={this.props.item_id}
            rank={this.props.rank}
          />
        </TableCell>
        <TableCell align="center">{this.props.emotion}</TableCell>
        {/* <TableCell>{this.props.createdate}</TableCell> */}
        <TableCell>
          <UserHistoryDelete
            stateRefresh={this.props.stateRefresh}
            id={this.props.id}
            align="center"
          />
        </TableCell>
      </TableRow>
    );
  }
}

export default UserHistory;
