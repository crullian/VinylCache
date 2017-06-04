import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchRecords, 
         submitRecord, 
         editRecord, 
         removeRecord } from '../actions'
import NavBar from '../components/NavBar.js'
import RecordList from '../components/RecordList.js'
import AddRecordDialog from '../components/AddRecordDialog.js'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

const fabStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};

@connect(state => ({
  records: state.recordsReducer.records,
  isFetchingRecords: state.recordsReducer.isFetchingRecords,
  isAuthenticated: state.authReducer.isAuthenticated,
  errorMessage: state.authReducer.errorMessage
}))

class RecordApp extends Component {

  state = {
    filterText: '',
    addRecordDialogIsOpen: false
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

  toggleAddRecordDialog = () => {
    this.setState({addRecordDialogIsOpen: !this.state.addRecordDialogIsOpen})
  }

  handleRecordSubmit = (record) => {
    this.props.dispatch(submitRecord(record));
    this.toggleAddRecordDialog();
  }

  updateRecord = (record) => {
    this.props.dispatch(editRecord(record))
  }

  deleteRecord = (id) => {
    if(confirm('Are you sure you want to delete this record?')) {
      this.props.dispatch(removeRecord(id))
    }
  }

  handleUserInput = (filterText) => {
    this.setState({
      filterText: filterText
    });
  }

  render() {
    console.log('dialog is open?', this.state.addRecordDialogIsOpen)
    const { dispatch, records, isAuthenticated, errorMessage, isFetchingRecords } = this.props
    return (
      <div>
        <NavBar setSearchInput={ this.handleUserInput }
                isAuthenticated={ isAuthenticated }
                errorMessage={ errorMessage }
                dispatch={ dispatch } />

        <div className="row main-content">

          {/*<div className="col-md-4 list">
            <RecordForm onRecordSubmit={ this.handleRecordSubmit } />
          </div>*/}

          <div className="col-md-8 list">
            <RecordList records={ records } 
                        delete={ this.deleteRecord }
                        update={ this.updateRecord }
                        filterText={this.state.filterText}
                        isAuthenticated={ isAuthenticated }
                        isFetchingRecords={ isFetchingRecords } />
          </div>
        </div>
        <FloatingActionButton
          style={fabStyle}
          onTouchTap={this.toggleAddRecordDialog}
        >
          <ContentAdd />
        </FloatingActionButton>
        <AddRecordDialog
          isOpen={this.state.addRecordDialogIsOpen}
          requestClose={this.toggleAddRecordDialog}
          onRecordSubmit={this.handleRecordSubmit}
        />
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
