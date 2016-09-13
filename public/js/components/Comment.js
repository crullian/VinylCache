import React from "react";

export default class Comment extends React.Component {

  static defaultState() { 
    return {
      isEditing: false,
      artist: null,
      title: null,
      imgUrl: null,
      year:null
    }
  };

  state = Comment.defaultState();

  showEdit(e) {
    this.setState({
      isEditing: (this.state.isEditing ? false : true)
    });
  }

  handleUpdate(e) {
    e.preventDefault();
    let record = {
      'artist': this.state.artist ? this.state.artist : this.props.artist,
      'title': this.state.title ? this.state.title : this.props.title, 
      'imgUrl': this.state.imgUrl ? this.state.imgUrl : this.props.imgUrl,
      'year': this.state.year ? this.state.year : this.props.year,
      'id': this.props.id
    };
    this.setState(Comment.defaultState());
    return this.props.onUpdate(record);
  }

  handleDelete(e) {
    e.preventDefault();
    let recordId = this.props.id;
    this.setState({isEditing: false});
    this.props.onDelete(recordId);
  }

  render() {
    let editForm = null;
    let buttonText = 'Edit';
    if (this.state.isEditing) {
      editForm = (
        <form id="editForm">
          <input id="artist" defaultValue={this.props.artist} onChange={e => this.setState({artist: e.target.value})}/><br />
          <input id="title"  defaultValue={this.props.title}  onChange={e => this.setState({title: e.target.value})}/><br />
          <input id="imgUrl" defaultValue={this.props.imgUrl} onChange={e => this.setState({imgUrl: e.target.value})}/><br />
          <input id="year" defaultValue={this.props.year} onChange={e => this.setState({year: e.target.value})}/><br />
          <div className="btn btn-info update" onClick={this.handleUpdate.bind(this)}>Submit edits</div>
          <div className="btn btn-danger" onClick={this.handleDelete.bind(this)}>Remove</div>
        </form>
      );
      buttonText = 'Close';
    }

    return (
      <div className="record">
        <img src={this.props.imgUrl} className="album" width="300" height="300"/>
        <div className="info">
          <h1>
            { this.props.artist }
          </h1>
          <h3>
            { this.props.title }
          </h3>
          <h5>
            { this.props.year }
          </h5>
          <div className="btn btn-default edit" onClick={this.showEdit.bind(this)}>{buttonText}</div>
          <div className="editFormWrapper">
            {editForm}
          </div>
        </div>
      </div>
    )
  }
}