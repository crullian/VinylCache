import React, { Component, PropTypes } from "react"
import Record from "./Record.js"

class RecordList extends Component {
  
  static defaultState() {
    return {
      filteredResult: null
    }
  };

  state = RecordList.defaultState();

  static propTypes = {
    records: PropTypes.object.isRequired,
    filterText: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
    isFetchingRecords: PropTypes.bool.isRequired
  }

  componentWillReceiveProps(e) {
    if (e.filterText) {
      this.setState(() => {
        return {
          filteredResult: e.records.filter(record => {
              let searchString = e.filterText.toLowerCase().trim();
              let strTofind = record.artist.toLowerCase().concat(' ', record.title.toLowerCase()).concat(' ', record.year);
              return strTofind.indexOf(searchString) !== -1;
          })
        }
      })
    } else {
      this.setState(RecordList.defaultState());
    }
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

  handleDelete(recordId) {
    return this.props.delete(recordId);
  }

  handleUpdate(record) {
    return this.props.update(record);
  }

  render() {
    const { records, isAuthenticated, isFetchingRecords, filterText } = this.props
    const { filteredResult } = this.state

    console.debug('RECORDS', records);
    let recordList = null;

    if (isFetchingRecords) {
      recordList = (
        <div className="loader">
          <img src="../images/loader.svg" />
        </div>
      );
    }
    
    // if (!isFetchingRecords && records) {
    //   let dumbRecords = filteredResult ? filteredResult : records

      if (filteredResult && !filteredResult.length) {
        recordList = (
          <div>
            <h3>Sorry, you don't have any{ filterText }</h3>
          </div>
        )
      } else {

        // recordList = dumbRecords.sort(this.compare)
        recordList = Object.keys(records).map((key, index) => {
          const record = records[key].record;
        //.map((record, index) => {
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
    //   }
    }
    
    return (
      <div>
        { recordList }
      </div>
    );
  }
}

export default RecordList
