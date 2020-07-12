import React from 'react';
import PageHeader from '../header/page-header';
import Table  from '../table/table';
import './main.scss';
import Loading from '../loading/loading';
import Controls from "../controls/controls";

class Main extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const {isLoading, tasks, units, functions, roleUnit, addTaskRow} = this.props;

    return (
        <main className="page-main">
            <div className="page-main__wrapper wrapper">
                {isLoading? <Loading/> : <Table tasks={tasks} units={units} functions={functions} roleUnit={roleUnit} addTaskRow={addTaskRow}/>}
            </div>
        </main>
    );
  }
}

export default Main;
