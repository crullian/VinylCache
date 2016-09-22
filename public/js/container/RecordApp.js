import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchRecords, 
         submitRecord, 
         editRecord, 
         removeRecord } from '../actions'
import NavBar from '../components/NavBar.js'
import RecordList from '../components/RecordList.js'
import RecordForm from '../components/RecordForm.js'

@connect(state => ({
  records: state.recordsReducer.records,
  isFetchingRecords: state.recordsReducer.isFetchingRecords,
  isAuthenticated: state.authReducer.isAuthenticated,
  errorMessage: state.authReducer.errorMessage
}))

class RecordApp extends Component {

  state = {
    filterText: ''
  };

  static propTypes = {
    records: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isFetchingRecords: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string
  }
  
  componentDidMount() {
    this.props.dispatch(fetchRecords()) 
  }

  handleRecordSubmit(record) {
    this.props.dispatch(submitRecord(record))
  }

  updateRecord(record) {
    this.props.dispatch(editRecord(record))
  }

  deleteRecord(id) {
    if(confirm('Are you sure you want to delete this record?')) {
      this.props.dispatch(removeRecord(id))
    }
  }

  handleUserInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  render() {
    const { dispatch, records, isAuthenticated, errorMessage, isFetchingRecords } = this.props
    return (
      <div>
        <NavBar setSearchInput={ this.handleUserInput.bind(this) }
                isAuthenticated={ isAuthenticated }
                errorMessage={ errorMessage }
                dispatch={ dispatch } />

        <div className="row">

          <div className="col-md-4">
            <RecordForm onRecordSubmit={ this.handleRecordSubmit.bind(this) } />
          </div>

          <div className="col-md-8 list">
            <RecordList records={ records } 
                        delete={ this.deleteRecord.bind(this) }
                        update={ this.updateRecord.bind(this) }
                        filterText={this.state.filterText}
                        isAuthenticated={ isAuthenticated }
                        isFetchingRecords={ isFetchingRecords } />
          </div>
        </div>
      </div>
    );
  }
}

// connect without decorator:
// const mapStateToProps = state => {
//   return {
//     records: state.recordsReducer.records,
//     isAuthenticated: state.authReducer.isAuthenticated,
//     errorMessage: state.authReducer.errorMessage
//   }
// }

// export default connect(mapStateToProps)(RecordApp)

export default RecordApp
