import React, { Component } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

class UserHistory extends Component {
  render() {
    return (
      <TableRow>
        <TableCell>{this.props.item}</TableCell>
        <TableCell>{this.props.emotion}</TableCell>
        <TableCell>{this.props.createdate}</TableCell>
      </TableRow>
    );
  }
}

export default UserHistory;
