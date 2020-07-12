import React from 'react';
import './controls.scss';

const Controls = ({units, setFilterUnits, addTaskRow}) => {

    const emptyRow = [{
        "fields": {
        }
      }];
    const unitList = units.map((unit) => {
        if (unit.fields.Unit) {
            return unit.fields.Unit;
        }
        return '';
    })

    return (
        <div className="controls">
          <div className="controls__filters">
            <select 
            onChange={(evt)=>{
                setFilterUnits(evt.target.value);
            }} 
            className="controls__units" id="units" name="units">
                <option value="All">All</option>
                {unitList.map((unit)=>{
                    return (
                        <option key={unit} value={unit}>{unit}</option>
                    )
                })}
            </select>
          </div>
          <div className="controls__change-table">
            <button onClick={()=>{
                addTaskRow(emptyRow)

            }} type="button" className="btn controls__add">Добавить строчку</button>
            <button type="button" className="btn controls__remove">Удалить строчку</button>
          </div>
          <button type="button" className="btn controls__update">Обновить записи в таблице</button>
        </div>
    );
  };

export default Controls;
