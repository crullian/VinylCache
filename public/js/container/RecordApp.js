import React from 'react'
// import fetch from "isomorphic-fetch"
import { connect } from 'react-redux'
import { fetchRecords } from '../actions'
import NavBar from '../components/NavBar.js'
import CommentList from '../components/CommentList.js'
import CommentForm from '../components/CommentForm.js'

export default class RecordApp extends React.Component {

  state = {
    filterText: '',
    records: []
  };

  componentDidMount() {
    // this.loadCommentsFromServer();
    const { dispatch } = this.props
    dispatch(fetchRecords()) 
  }

  compare(a,b) {
    if (a.artist && b.artist) {
      let a_artist = a.artist.replace('The ', '');
      let b_artist = b.artist.replace('The ', '');
      if (a_artist < b_artist) {
        return -1;
      } else if (a_artist > b_artist) {
        return 1;
      }
      if (a.year < b.year) {
        return -1;
      } else if (a.year > b.year) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return;
    }
  }

  // loadCommentsFromServer() {
  //   fetch('/records').then(response => {
  //     if (response.ok) {
  //       return response.json().then(data => {
  //         data.sort(this.compare);
  //         return this.setState({records: data});
  //       })
  //     } else {
  //       console.error(`Network response was not ok: ${response}`);
  //     }
  //   })
  //   .catch( error => {
  //     console.error(`There was a problem with your fetch operation: ${error.message}`);
  //   });
  // }

  // handleCommentSubmit(record) {
  //   fetch('/records', {
  //     method: 'post',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(record)
  //   }).then(response => {
  //     return response.json().then(data => {
  //       data.sort(this.compare);
  //       return this.setState({records: data})
  //     })
  //   })
  // }

  // updateRecord(record) {
  //   let id = record.id;
  //   fetch(`/records/${id}`, {
  //     method: 'put',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(record)
  //   }).then(response => {
  //     return response.json().then(data => {
  //       data.sort(this.compare);
  //       return this.setState({records: data})
  //     })
  //   })
  // }

  // deleteRecord(id) {
  //   if(confirm('Are you sure you want to delete this record?')) {
  //     fetch(`/records/${id}`, {
  //       method: 'delete',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: {id}
  //     }).then(response => {
  //       return response.json().then(data => {
  //         data.sort(this.compare);
  //         return this.setState({records: data})
  //       })
  //     })
  //   }
  // }

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