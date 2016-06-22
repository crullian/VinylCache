import React from "react";
import NavBar from "./NavBar.js";
import CommentList from "./CommentList.js";
import CommentForm from "./CommentForm.js";

export default class RecordApp extends React.Component {

  state = {
    filterText: '',
    records: []
  };

  componentDidMount() {
    this.loadCommentsFromServer(); 
  }

  compare(a,b) {
    if (a.artist && b.artist) {
      let a_artist = a.artist.replace('The ', '');
      let b_artist = b.artist.replace('The ', '');
      if (a_artist < b_artist)
        return -1;
      if (a_artist > b_artist)
        return 1;
      return 0;
    } else {
      return;
    }
  }

  loadCommentsFromServer() {
    // fetch, only works in chrome:(
    if(self.fetch) {
      fetch('/records').then(response => {
        if (response.ok) {
          return response.json().then(data => {
            data.sort(this.compare);
            return this.setState({records: data});
          })
        } else {
          console.log(`Network response was not ok: ${response}`);
        }
      })
      .catch( error => {
        console.error(`There was a problem with your fetch operation: ${error.message}`);
      });
    } else {
      $.ajax({
        url: '/records',
        dataType: 'json',
        cache: false,
        success: (records) => {
          records.sort(this.compare);
          this.setState({records: records});
        },
        error: (xhr, status, err) => {
          console.error(status, err.toString());
        }
      });
    }
  }

  handleCommentSubmit(record) {
    $.ajax({
      url: '/records',
      dataType: 'json',
      type: 'POST',
      data: record,
      success: (records) => {
        records.sort(this.compare);
        this.setState({records: records});
      },
      error: (xhr, status, err) => {
        console.error(status, err.toString());
      }
    });
  }

  updateRecord(record) {
    let id = record.id;
    $.ajax({
      url: '/records/' + id,
      dataType: 'json',
      type: 'PUT',
      data: record,
      success: (records) => {
        records.sort(this.compare);
        this.setState({records: records});
      },
      error: (xhr, status, err) => {
        console.error(status, err.toString());
      }
    });
  }

  deleteRecord(id) {
    if(confirm('Are you sure you want to delete this record?')) {
      $.ajax({
        url: '/records/' + id,
        dataType: 'json',
        type: 'DELETE',
        data: id,
        success: (records) => {
          records.sort(this.compare);
          this.setState({records: records});
        },
        error: (xhr, status, err) => {
          console.error(this.props.url, status, err.toString());
        }
      });
    }
  }

  handleUserInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  render() {
    return (
      <div>
        <NavBar setSearchInput={this.handleUserInput.bind(this)} filterText={this.state.filterText}/>

        <div className="row">
          <div className="col-md-4">
            <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
          </div>
          <div className="col-md-8 list">
            
            <CommentList records={ this.state.records } 
                         delete={ this.deleteRecord.bind(this) }
                         update={ this.updateRecord.bind(this) }
                         filterText={this.state.filterText} />
          </div>
        </div>
      </div>
    );
  }
}