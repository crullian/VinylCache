import React from "react";
import ReactDOM from "react-dom";

export default class RecordForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    let artist = ReactDOM.findDOMNode(this.refs.artist).value;
    let title  = ReactDOM.findDOMNode(this.refs.title).value;
    let imgUrl = ReactDOM.findDOMNode(this.refs.imgUrl).value;
    let year   = ReactDOM.findDOMNode(this.refs.year).value;
    if(!title || !artist || !imgUrl) {
      return;
    }
    this.props.onRecordSubmit({artist: artist.trim(), title: title.trim(), imgUrl: imgUrl.trim(), year: year.trim()});
    ReactDOM.findDOMNode(this.refs.artist).value = '';
    ReactDOM.findDOMNode(this.refs.title).value = '';
    ReactDOM.findDOMNode(this.refs.imgUrl).value = '';
    ReactDOM.findDOMNode(this.refs.year).value = '';
    return;
  }
  
  render() {
    return ( 
      <form className="addForm" name="submitForm" onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" required placeholder="artist" ref="artist"/><br />
        <input type="text" required placeholder="title"ref="title"/><br />
        <input type="text" required placeholder="image url"ref="imgUrl"/><br />
        <input type="text" required placeholder="year"ref="year"/><br />
        <button className="btn btn-info add" type="submit" value="Post">Add Some Vinyl</button>
      </form>
    );
  }
}