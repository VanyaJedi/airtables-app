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

      this._selectedRow = {
        airtableId: null,
        tabulatorRow: null
      }

      this.state = {
        filterUnits: 'All',
        filterRoles: 'All'
      };

      this.setFilterUnits = this.setFilterUnits.bind(this);
      this.setFilterRoles = this.setFilterRoles.bind(this);
      this.addEmptyTaskRow = this.addEmptyTaskRow.bind(this);
      this.getEditedRows = this.getEditedRows.bind(this);
      this.deleteRow = this.deleteRow.bind(this);
      this.rowClickHandler = this.rowClickHandler.bind(this);
  }

  getEditedRows() {
    const editedCells = this._table.getEditedCells();
    const rowsToUpdate = editedCells.map((cell) => {
      return cell._cell.row.data;
    })
    return rowsToUpdate;
  }

  addEmptyTaskRow(airtableRow) {
    const emptyRow = {};
    emptyRow.id = airtableRow.data.id;
    this._table.addRow(emptyRow, true);

    this.getEditedRows();
  }

  setFilterUnits(filter) {
    this.setState({
      filterUnits: filter
    })
  }

  setFilterRoles(filter) {
    this.setState({
      filterRoles: filter
    })
  }

  updateSelectedRow(row) {
  }

  deleteRow() {
    this._selectedRow.tabulatorRow.delete();
  }

  rowClickHandler(e, row) {
    if (row === this._selectedRow.tabulatorRow ) {
      row.deselect();
      this._selectedRow.tabulatorRow = null;
      this._selectedRow.airtableId = null;
      return;
    }
    this._selectedRow.tabulatorRow = row;
    this._selectedRow.airtableId = row.getData().id;
  }

  componentDidMount() {

    this._tableData = this.props.tasks.map((task) => {
      return adaptTasks(task, this.props.units, this.props.functions, this.props.roleUnit)
    })


    this._table = new Tabulator(this._tableRef, {
        data: this._tableData, //link data to table
        columns: tasksTable, //define table columns
        //pagination:"local",
        //paginationSize:50,
        maxHeight:"100%",

        cellEditing:function(cell){
          console.log(cell);
        },

        rowClick: this.rowClickHandler
        ,
        selectable:1,
      });
  }

  generateFiltersObject() {
    if (this.state.filterUnits === 'All' && this.state.filterRoles === 'All') {
      return '';
    }
    if (this.state.filterUnits === 'All' && this.state.filterRoles !== 'All') {
      return [{
        field: "role",
        type: "=",
        value: this.state.filterRoles
      }]
    } else if (this.state.filterUnits !== 'All' && this.state.filterRoles == 'All'){
      return [{
        field: "unit",
        type: "=",
        value: this.state.filterUnits
      }]
    } else {
      return [{
        field: "role",
        type: "=",
        value: this.state.filterRoles
      },
      {
        field: "unit",
        type: "=",
        value: this.state.filterUnits
      }]
    }
  }

  componentDidUpdate() {
    if (this.state.filterUnits === 'All' && this.state.filterRoles === 'All') {
      this._table.clearFilter(true);
      return;
    }

    this._table.setFilter(this.generateFiltersObject());    
  }

  render() {
    return (
        <React.Fragment>
          <Controls 
          roles={this.props.roles}
          units={this.props.units} 
          roleUnit={this.props.roleUnit} 
          addTaskRow={this.props.addTaskRow} 
          addEmptyTaskRow={this.addEmptyTaskRow} 
          setFilterUnits={this.setFilterUnits}
          setFilterRoles={this.setFilterRoles}
          getEditedRows={this.getEditedRows}
          updateTaskRows={this.props.updateTaskRows}
          deleteTaskRows={this.props.deleteTaskRows}
          deleteRow={this.deleteRow}
          selectedRow={this._selectedRow}
          />
          <div className="table">
              <div ref={el => (this._tableRef = el)} id="tbl"></div>
          </div> 
        </React.Fragment>
    );
  }
}

export default Table;
