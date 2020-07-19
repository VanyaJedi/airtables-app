import React from 'react';
import PageHeader from '../header/page-header';
import Main  from '../main/main';
import Auth from '../auth/auth';
import './app.scss';
import {connect} from "react-redux";
import {actionCreator as actionCreatorApp} from "../../reducer/app/app.js";
import {Operation as dataOperation} from "../../reducer/data/data";
import {Operation as userOperation} from "../../reducer/user/user";
import {getLoadingStatus, getTasks, getUnits, getFunctions, getRoleUnit, getRoles} from "../../reducer/data/selectors.js";
import {getUser, getAuthStatus} from "../../reducer/user/selectors.js";
import {getActiveTab} from "../../reducer/app/selectors.js";

class App extends React.Component {


  renderApp() {
    const {isLoading,
      tasks, 
      units, 
      functions, 
      roleUnit, 
      roles, 
      addTaskRow, 
      updateTaskRows, 
      deleteTaskRows, 
      activeTab, 
      switchActiveTab,
      user,
      logout          
     } = this.props;

    return (
    <div className="App">
      <PageHeader 
        activeTab={activeTab} 
        switchActiveTab={switchActiveTab}
        user={user}
        logout={logout}
      />
      <Main 
        isLoading={isLoading}
        activeTab={activeTab}
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

  render() {
   const { 
      user,       
     } = this.props;

    if (!user) {
     return  <Auth />;
    }
   
    return this.renderApp();
  }
}

const mapStateToProps = (state) => ({
  user: getUser(state),
  authStatus: getAuthStatus(state),
  activeTab: getActiveTab(state),
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
  },

  switchActiveTab(data) {
    return dispatch(actionCreatorApp.switchTab(data));
  },

  logout() {
    return dispatch(userOperation.logout());
  }

});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
