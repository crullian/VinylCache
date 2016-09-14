import React from 'react'
// import fetch from "isomorphic-fetch"
import { connect } from 'react-redux'
import { fetchRecords } from '../actions'
import NavBar from '../components/NavBar.js'
import CommentList from '../components/CommentList.js'
import CommentForm from '../components/CommentForm.js'

@connect(state => ({
  records: state.recordsReducer.records
}))

class RecordApp extends React.Component {

  state = {
    filterText: ''
  };

  static propTypes = {
    records: React.PropTypes.array.isRequired,
    dispatch: React.PropTypes.func.isRequired
  }

  // const mapDispatchToProps = (dispatch) => {

  // }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchRecords()) 
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

  handleCommentSubmit(record) {
    console.log(record)
    // fetch('/records', {
    //   method: 'post',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(record)
    // }).then(response => {
    //   return response.json().then(data => {
    //     data.sort(this.compare);
    //     return this.setState({records: data})
    //   })
    // })
  }

  updateRecord(record) {
    let id = record.id
    console.log(id)
    // fetch(`/records/${id}`, {
    //   method: 'put',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(record)
    // }).then(response => {
    //   return response.json().then(data => {
    //     data.sort(this.compare);
    //     return this.setState({records: data})
    //   })
    // })
  }

  deleteRecord(id) {
    if(confirm('Are you sure you want to delete this record?')) {
      console.log(id)
      // fetch(`/records/${id}`, {
      //   method: 'delete',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json'
      //   },
      //   body: {id}
      // }).then(response => {
      //   return response.json().then(data => {
      //     data.sort(this.compare);
      //     return this.setState({records: data})
      //   })
      // })
    }
  }

  handleUserInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  render() {
    const { records } = this.props
    return (
      <div>
        <NavBar setSearchInput={this.handleUserInput.bind(this)} filterText={this.state.filterText}/>

        <div className="row">
          <div className="col-md-4">
            <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
          </div>
          <div className="col-md-8 list">
            <CommentList records={ records } 
                         delete={ this.deleteRecord.bind(this) }
                         update={ this.updateRecord.bind(this) }
                         filterText={this.state.filterText} />
          </div>
        </div>
      </div>
    );
  }
}

// RecordApp.propTypes = {
//   records: React.PropTypes.array.isRequired,
//   dispatch: React.PropTypes.func.isRequired
// }

// const mapStateToProps = state => {
//   return {
//     records: state.recordsReducer.records
//   }
// }

export default RecordApp
