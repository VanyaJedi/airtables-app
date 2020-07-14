import React from 'react';
import PageHeader from '../header/page-header';
import Table  from '../table/table';
import './main.scss';
import Loading from '../loading/loading';
import Controls from "../controls/controls";
import CheckList from "../checklist/checklist";

class Main extends React.Component {

  constructor(props) {
    super(props);
  }

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

    
    const {isLoading, tasks, units, functions, roleUnit, roles, addTaskRow, updateTaskRows, deleteTaskRows} = this.props;

    return (
        <main className="page-main">
           {this.renderMain()}
        </main>
    );
  }
}

export default Main;
