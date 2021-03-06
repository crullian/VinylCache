import React, { Component, PropTypes } from "react"

export default class Record extends Component { 

  static defaultState() { 
    return {
      isEditing: false,
      artist: null,
      title: null,
      imgUrl: null,
      year:null
    }
  };

  state = Record.defaultState()

  toggleEdit = (e) => {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  handleUpdate = (e) => {
    e.preventDefault();
    let record = {
      'artist': this.state.artist ? this.state.artist : this.props.artist,
      'title': this.state.title ? this.state.title : this.props.title, 
      'imgUrl': this.state.imgUrl ? this.state.imgUrl : this.props.imgUrl,
      'year': this.state.year ? this.state.year : this.props.year,
      'id': this.props.id
    };
    this.setState(Record.defaultState());
    return this.props.onUpdate(record);
  }

  handleDelete = (e) => {
    e.preventDefault();
    let recordId = this.props.id;
    this.setState({isEditing: false});
    this.props.onDelete(recordId);
  }

  render() {
    const { artist, title, year, imgUrl } = this.props

    let editForm = null;
    let buttonText = 'Edit';
    if (this.state.isEditing) {
      editForm = (
        <form id="editForm">
          <input id="artist" defaultValue={artist} onChange={e => this.setState({artist: e.target.value})}/><br />
          <input id="title"  defaultValue={title}  onChange={e => this.setState({title: e.target.value})}/><br />
          <input id="imgUrl" defaultValue={imgUrl} onChange={e => this.setState({imgUrl: e.target.value})}/><br />
          <input id="year"   defaultValue={year}   onChange={e => this.setState({year: e.target.value})}/><br />
          <div className="btn btn-info update" onClick={this.handleUpdate}>Submit edits</div>
          <div className="btn btn-danger" onClick={this.handleDelete}>Remove</div>
        </form>
      );
      buttonText = 'Close';
    }

    return (
      <div className="record">
        <img src={ imgUrl } className="album" width="300" height="300"/>
        <div className="info">
          <h3>
            { artist }
          </h3>
          <h4>
            { title }
          </h4>
          <h5>
            { year }
          </h5>
          <div className="btn btn-default edit" onClick={this.toggleEdit}>{buttonText}</div>
          { editForm }
        </div>
      </div>
    )
  }
}