import React, { Component } from "react"
import TextField from 'material-ui/TextField'

export default class SearchBar extends Component {
  handleChange(e) {
    this.props.onUserInput(e.target.value);
  }
  render() {
    return (
        <TextField
          type="text"
          hintText="Search..."
          hintStyle={{color: '#fff'}}
          inputStyle={{color: '#fff'}}
          style={{width: 200}}
          onChange={this.handleChange.bind(this)}
          autoFocus
        />
    );
  }
}