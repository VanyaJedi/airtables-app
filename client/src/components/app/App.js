import React from 'react';
import PageHeader from '../header/page-header';
import Main  from '../main/main';
import './App.scss';
import {connect} from "react-redux";
import {actionCreator as actionCreatorData} from "../../reducer/data/data.js";
import {Operation as dataOperation} from "../../reducer/data/data";
import {getLoadingStatus, getTasks, getUnits, getFunctions, getRoleUnit, getAllUnits, getRoles} from "../../reducer/data/selectors.js";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {isLoading, tasks, units, functions, roleUnit, roles, addTaskRow, updateTaskRows, deleteTaskRows} = this.props;
    return (
      <div className="App">
        <PageHeader/>
        <Main 
          isLoading={isLoading}
          tasks={tasks}
          units={units}
          functions={functions}
          roleUnit={roleUnit}
          addTaskRow={addTaskRow}
          updateTaskRows={updateTaskRows}
          deleteTaskRows={deleteTaskRows}
          roles={roles}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  roles: getRoles(state),
  tasks: getTasks(state),
  units: getUnits(state),
  functions: getFunctions(state),
  roleUnit: getRoleUnit(state),
  isLoading: getLoadingStatus(state)

});

const mapDispatchToProps = (dispatch) => ({

  addTaskRow(data) {
    return dispatch(dataOperation.addTaskRow(data));
  },

  deleteTaskRows(data) {
    return dispatch(dataOperation.deleteTaskRows(data));
  },

  updateTaskRows(data) {
    return dispatch(dataOperation.updateTaskRows(data));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
