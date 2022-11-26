import React, { Component } from "react";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';


class BtnCellRenderer extends Component {
  constructor(props) {
    super(props);
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
  }
  btnClickedHandler() {
    this.props.clicked(this.props.value);
  }
  render() {
    return (
    <Button color="error" size="small" onClick={this.btnClickedHandler}>Delete</Button>
    )
  }
}

export default BtnCellRenderer;