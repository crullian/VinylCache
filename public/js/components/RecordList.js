import React, { Component, PropTypes } from "react"
import Record from "./Record.js"

class RecordList extends Component {

  static propTypes = {
    records: PropTypes.array.isRequired,
    filterText: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
    isFetchingRecords: PropTypes.bool.isRequired
  }

  state = {
    filteredResult: null
  }

  componentWillReceiveProps(e) {
    if (e.filterText) {
      console.log('OK!', e);
    }
  }

  handleDelete(recordId) {
    return this.props.delete(recordId);
  }

  handleUpdate(record) {
    return this.props.update(record);
  }

  render() {
    const { records, filterText, isAuthenticated, isFetchingRecords } = this.props
    const { filteredResult } = this.state

    let loader = null;
    if (isFetchingRecords) {
      loader = (
        <div className="loader">
          <img src="../images/loader.svg" />
        </div>
      );
    }

    let recordList = null;

    if (!isFetchingRecords && records) {
      recordList = filteredResult ? filteredResult : records;

      console.log('RECORDLIST', recordList);

      let searchString = filterText.toLowerCase().replace(/\W/g, '');

      //.filter(record => {
      //  let strTofind = record.artist.toLowerCase().concat(' ', record.title.toLowerCase()).concat(' ', record.year).replace(/\W/g, '');
      //  return strTofind.indexOf(searchString) !== -1;
      //})
      records.map((record, index) => {
        return (
          <Record artist={ record.artist } 
                  title={ record.title } 
                  imgUrl={ record.imgUrl } 
                  year={ record.year }
                  id={record._id}
                  onDelete={ this.handleDelete.bind(this) } 
                  onUpdate={ this.handleUpdate.bind(this) }
                  isAuthenticated={ isAuthenticated }
                  key={ index } />
        );
      });
    }
    
    return (
      <div>
        { loader }
        { recordList }
      </div>
    );
  }
}

export default RecordList
