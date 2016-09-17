import React from "react";
import Record from "./Record.js";

export default class RecordList extends React.Component {
  handleDelete(recordId) {
    return this.props.delete(recordId);
  }

  handleUpdate(record) {
    return this.props.update(record);
  }

  render() {
    const { records, filterText } = this.props

    let loader = null;
    if(!this.props.records.length){
      loader = (
        <div className="loader">
          <img src="../images/loader.svg" />
        </div>
      );
    }

    let searchString = filterText.toLowerCase().replace(/\W/g, '');
    let recordList = records.filter(record => {
      let strTofind = record.artist.toLowerCase().concat(' ', record.title.toLowerCase()).concat(' ', record.year).replace(/\W/g, '');
      return strTofind.indexOf(searchString) !== -1;
    }).map((record, index) => {
      return (
        <Record artist={ record.artist } 
                 title={ record.title } 
                 imgUrl={ record.imgUrl } 
                 year={ record.year }
                 id={record._id}
                 onDelete={ this.handleDelete.bind(this) } 
                 onUpdate={ this.handleUpdate.bind(this) }
                 key={ index } />
      );
    });
    
    return (
      <div>
        { loader }
        { recordList }
      </div>
    );
  }
}