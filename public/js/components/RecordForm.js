import React from "react"

export default class RecordForm extends React.Component {

  static defaultState() { 
    return {
      artist: '',
      title: '',
      imgUrl: '',
      year: ''
    }
  }

  state = RecordForm.defaultState()

  handleSubmit(e) {
    e.preventDefault()
    let artist = this.state.artist
    let title  = this.state.title
    let imgUrl = this.state.imgUrl
    let year   = this.state.year
    if(!title || !artist || !imgUrl) {
      return;
    }
    this.props.onRecordSubmit({artist: artist.trim(), title: title.trim(), imgUrl: imgUrl.trim(), year: year.trim()})
    this.setState(RecordForm.defaultState())
    return;
  }

  render() {
    return ( 
      <form className="addForm" name="submitForm" onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" required placeholder="artist" value={this.state.artist} onChange={e => this.setState({artist: e.target.value})}/><br />
        <input type="text" required placeholder="title" value={this.state.title} onChange={e => this.setState({title: e.target.value})}/><br />
        <input type="text" required placeholder="image url" value={this.state.imgUrl} onChange={e => this.setState({imgUrl: e.target.value})}/><br />
        <input type="text" required placeholder="year" value={this.state.year} onChange={e => this.setState({year: e.target.value})}/><br />
        <button className="btn btn-info add" type="submit" value="Post">Add Some Vinyl</button>
      </form>
    )
  }
}