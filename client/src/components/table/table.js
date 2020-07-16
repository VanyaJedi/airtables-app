import React from 'react';
import 'react-tabulator/lib/styles.css';
import Tabulator from "tabulator-tables"; //import Tabulator library
import "tabulator-tables/dist/css/tabulator.min.css"; //import Tabulator stylesheet
import './table.scss';
import {adaptTasks, findLookUpValue} from "../../adapters/tasks.js";
import Controls from "../controls/controls";
import getTableStructure from '../../tablesStructure/tasks';


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

      this.dataToUpdate = [];

      this.setFilterUnits = this.setFilterUnits.bind(this);
      this.setFilterRoles = this.setFilterRoles.bind(this);
      this.addEmptyTaskRow = this.addEmptyTaskRow.bind(this);
      this.getEditedRows = this.getEditedRows.bind(this);
      this.deleteRow = this.deleteRow.bind(this);
      this.rowClickHandler = this.rowClickHandler.bind(this);
      this.cleanDataToUpdate = this.cleanDataToUpdate.bind(this);
  }

  //Data manipulations

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

  cleanDataToUpdate() {
    this.dataToUpdate = [];
  }

  deleteRow() {
    this._selectedRow.tabulatorRow.delete();
  }

  getParams (arr, field) {
    return arr.map((row) => {
      return row.fields[field];
    })
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
    } else if (this.state.filterUnits !== 'All' && this.state.filterRoles === 'All'){
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

  //Handlers
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

  //React lifecycle
  componentDidMount() {

    this._tableData = this.props.tasks.map((task) => {
      return adaptTasks(task, this.props.units, this.props.functions, this.props.roleUnit)
    })

    this._table = new Tabulator(this._tableRef, {
        data: this._tableData, //link data to table
        reactiveData:true,
        columns: getTableStructure(this.props.functions), //define table columns
        maxHeight:"100%",

        cellEdited: (cell) => {
          const editedData = cell.getData();
          const currentData = this._table.getData();
          const editedIndex = currentData.findIndex(value => value.id === editedData.id);

          const targetFunction = this.props.functions.find((value) => {
            return value.fields['Role_function'] === editedData.roleAndFunc
          });
          
          
          if (targetFunction) {
            console.log(editedData);
            const roleId = targetFunction.fields['Role'];
            const unitId = targetFunction.fields['Unit from role'];
          
            const role = findLookUpValue(this.props.roleUnit, roleId,  'Role in Unit');
            const unit = findLookUpValue(this.props.units, unitId,  'Unit');
            const funcShort = targetFunction.fields['Function_short'];
            const funcLong = targetFunction.fields['Function_long'];

            this._tableData[editedIndex].role = role;
            this._tableData[editedIndex].unit = unit;
            this._tableData[editedIndex].funcShort = funcShort;
            this._tableData[editedIndex].funcLong = funcLong;
          }

         
          
          const indexIfAlreadyExist = this.dataToUpdate.findIndex((value) => value.id === editedData.id);
          if (indexIfAlreadyExist > -1) {
            this.dataToUpdate.splice(indexIfAlreadyExist, 1);
          }
          this.dataToUpdate.push(editedData);
        },

        rowClick: this.rowClickHandler
        ,
        selectable:1,
      });

      
    
  }


  componentDidUpdate() {
    if (this.state.filterUnits === 'All' && this.state.filterRoles === 'All') {
      this._table.clearFilter(true);
      return;
    }

    this._table.setFilter(this.generateFiltersObject());
  }

  makeRolesListBasedOnUnits() {
    if (this._table) {
      const unitFilter = this.state.filterUnits;
      let filteredData;
      if (unitFilter === 'All') {
        filteredData = this._table.getData();
      } else {
        filteredData = this._table.searchData('unit', '=', unitFilter);
      }

      const rolesList = filteredData
                .map((row) => {
                  return row.role;
                })
                .filter((value, index, self) => {
                  return self.indexOf(value) === index;
                })
      return rolesList;
    }

    return this.props.roles
      .map((role) => {
        if (role.fields.Role) {
          return role.fields.Role;
      }
        return '';
      })
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      })
  } 

  render() {
    return (
        <React.Fragment>
          <Controls 
            
            roles={this.props.roles}
            units={this.props.units} 
            roleUnit={this.props.roleUnit} 
            functions={this.props.functions}
            addTaskRow={this.props.addTaskRow} 
            addEmptyTaskRow={this.addEmptyTaskRow} 
            setFilterUnits={this.setFilterUnits}
            setFilterRoles={this.setFilterRoles}
            getEditedRows={this.getEditedRows}
            updateTaskRows={this.props.updateTaskRows}
            deleteTaskRows={this.props.deleteTaskRows}
            deleteRow={this.deleteRow}
            selectedRow={this._selectedRow}
            dataToUpdate={this.dataToUpdate}
            cleanDataToUpdate={this.cleanDataToUpdate}
            rolesBasedOnUnits={this.makeRolesListBasedOnUnits()}
          />
          <div className="table">
              <div ref={el => (this._tableRef = el)} id="tbl"></div>
          </div>
        </React.Fragment>
    );
  }
}

export default Table;
