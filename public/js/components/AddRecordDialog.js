import React from "react"
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import {deepPurple400} from 'material-ui/styles/colors'

export default class AddRecordDialog extends React.Component {

  static defaultState() { 
    return {
      artist: '',
      title: '',
      imgUrl: '',
      year: ''
    }
  }

  state = AddRecordDialog.defaultState()

  handleSubmit = (e) => {
    e.preventDefault()
    let artist = this.state.artist
    let title  = this.state.title
    let imgUrl = this.state.imgUrl
    let year   = this.state.year
    if(!title || !artist || !imgUrl) {
      return;
    }
    this.props.onRecordSubmit({artist: artist.trim(), title: title.trim(), imgUrl: imgUrl.trim(), year: year.trim()})
    this.setState(AddRecordDialog.defaultState())
    return;
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.props.requestClose}
      />,
      <FlatButton
        label="Submit"
        secondary={true}
        onTouchTap={this.handleSubmit}
      />,
    ];
    return (
        <Dialog
          title="Add a record!"
          titleStyle={{color: deepPurple400}}
          actions={actions}
          modal={false}
          open={this.props.isOpen}
          contentStyle={{maxWidth: 450}}
          onRequestClose={this.props.requestClose}
        >
          <TextField type="text" hintText="artist" style={{width: '100%'}} autoFocus onChange={e => this.setState({artist: e.target.value})}/><br />
          <TextField type="text" hintText="title" style={{width: '100%'}} onChange={e => this.setState({title: e.target.value})}/><br />
          <TextField type="text" hintText="image url" style={{width: '100%'}} onChange={e => this.setState({imgUrl: e.target.value})}/><br />
          <TextField type="text" hintText="year" style={{width: '100%'}} onChange={e => this.setState({year: e.target.value})}/><br />
        </Dialog>
    )
  }
}