import React from 'react';
import 'react-tabulator/lib/styles.css';
import Tabulator from "tabulator-tables"; //import Tabulator library
import "tabulator-tables/dist/css/tabulator.min.css"; //import Tabulator stylesheet
import './table.scss';
import {adaptTasks} from "../../adapters/tasks.js";
import Controls from "../controls/controls";

import tasksTable from '../../tablesStructure/tasks';


class Table extends React.Component {
    constructor(props){
        super(props);
        this._tableRef = React.createRef();
        this._table = null;
        this._tableData = [];
        this._rowTableData = [];

        this.state = {
          filterUnits: 'All'
        };

        this.setFilterUnits = this.setFilterUnits.bind(this);
    }

    setFilterUnits(filter) {
      this.setState({
        filterUnits: filter
      })
    }

 /* concatRowData(data) {
    data.forEach((item) => {this._rowTableData = this._rowTableData.concat(item)});
  }*/

  componentDidMount() {
    this._tableData = this.props.tasks.map((task) => {
      return adaptTasks(task, this.props.units, this.props.functions, this.props.roleUnit)
    })

    this._table = new Tabulator(this._tableRef, {
        data: this._tableData, //link data to table
        columns: tasksTable, //define table columns
        pagination:"local",
        paginationSize:50,
        maxHeight:"100%",
      });
  }

  componentDidUpdate() {
    if (this.state.filterUnits === 'All') {
      this._table.clearFilter(true);
      return;
    }
    this._table.setFilter('unit', '=', this.state.filterUnits);
  }

  render() {
    return (
        <React.Fragment>
          <Controls units={this.props.units} addTaskRow={this.props.addTaskRow} setFilterUnits={this.setFilterUnits}/>
          <div className="table">
              <div ref={el => (this._tableRef = el)} id="tbl"></div>
          </div> 
        </React.Fragment>
    );
  }
}

export default Table;
