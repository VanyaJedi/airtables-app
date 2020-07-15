import React from 'react';
import Table  from '../table/table';
import './main.scss';
import Loading from '../loading/loading';
import CheckList from "../checklist/checklist";

class Main extends React.Component {


  renderMain() {
    const {isLoading, activeTab, tasks, units, functions, roleUnit, roles, addTaskRow, updateTaskRows, deleteTaskRows} = this.props;

    if (isLoading) {
      return <Loading/>;
    }

    switch (activeTab) {
      case 'tasks':
        return  (
              <Table 
                  tasks={tasks} 
                  units={units}
                  roles={roles}
                  functions={functions} 
                  roleUnit={roleUnit} 
                  addTaskRow={addTaskRow} 
                  updateTaskRows={updateTaskRows}
                  deleteTaskRows={deleteTaskRows}
                />
                )
      case 'checklist':
        return <CheckList/>
      default:
        return <span>something went wrong</span>
    }

  }

  render() {
 
    return (
        <main className="page-main">
           {this.renderMain()}
        </main>
    );
  }
}

export default Main;
