import React, { Component, PropTypes } from "react"
import Record from "./Record.js"
import { isEqual } from "lodash"

class RecordList extends Component {
  
  static defaultState() {
    return {
      filteredResult: null
    }
  };

  state = RecordList.defaultState();

  static propTypes = {
    records: PropTypes.array.isRequired,
    filterText: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
    isFetchingRecords: PropTypes.bool.isRequired
  }


  componentWillReceiveProps(e) {
    if (e.filterText) {
      this.setState(() => {
        return {
          filteredResult: e.records.filter(record => {
              let searchString = e.filterText.toLowerCase().replace(/\W/g, '');
              let strTofind = record.artist.toLowerCase().concat(' ', record.title.toLowerCase()).concat(' ', record.year).replace(/\W/g, '');
              return strTofind.indexOf(searchString) !== -1;
          })
        }
      })
    } else {
      this.setState(RecordList.defaultState());
    }
  }

  handleDelete(recordId) {
    return this.props.delete(recordId);
  }

  handleUpdate(record) {
    return this.props.update(record);
  }

  render() {
    console.debug('filteredResult', this.state.filteredResult);
    const { records, isAuthenticated, isFetchingRecords } = this.props
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
      let dumbRecords = this.state.filteredResult ? this.state.filteredResult : records

      recordList = dumbRecords.map((record, index) => {
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
