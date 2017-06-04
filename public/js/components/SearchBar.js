import React, { Component } from "react"
import TextField from 'material-ui/TextField'
import {deepPurple400} from 'material-ui/styles/colors'

export default class SearchBar extends Component {
  handleChange = (e) => {
    this.props.onUserInput(e.target.value);
  }
  render() {
    return (
        <TextField
          type="text"
          hintText="Search..."
          hintStyle={{color: deepPurple400}}
          style={{width: 200}}
          underlineStyle={{borderColor: '#fff'}}
          underlineFocusStyle={{borderColor: deepPurple400}}
          onChange={this.handleChange}
          autoFocus
        />
    );
  }
}