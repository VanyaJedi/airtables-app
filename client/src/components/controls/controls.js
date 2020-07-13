import React from 'react';
import './controls.scss';

const Controls = ({units, roles, roleUnit, setFilterUnits, setFilterRoles, addTaskRow, addEmptyTaskRow, updateTaskRows, deleteTaskRows, selectedRow, deleteRow}) => {

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

    const roleList = roles.map((role) => {
      if (role.fields.Role) {
        return role.fields.Role;
    }
    return '';
  })

    return (
        <div className="controls">
          <ul className="controls__filters">
            <li>
              <span>Role</span>
              <select 
                onChange={(evt)=>{
                  setFilterRoles(evt.target.value);
                }} 
                className="controls__units" id="roleunit" name="roleunit">
                    <option value="All">All</option>
                    {roleList.map((role)=>{
                        return (
                            <option key={role} value={role}>{role}</option>
                        )
                    })}
              </select>
            </li>
            <li>
              <span>Unit</span>
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
            </li>
           
          </ul>
          <div className="controls__change-table">
            <button onClick={()=>{
                addTaskRow(emptyRow)
                .then((res) => addEmptyTaskRow(res));

            }} type="button" className="btn controls__add">Добавить строчку</button>
            <button   onClick=  {()=>{
                if (selectedRow.airtableId) {
                 deleteTaskRows([selectedRow.airtableId])
                .then((res) => {
                  deleteRow(selectedRow.tabulatorRow);
                })
                }
               

            }}
            type="button" className="btn controls__remove">Удалить строчку</button>
          </div>
          <button
            onClick={()=>{
                updateTaskRows(
                  [
                    {
                    "id": "recAnw4BQNmDFKiy9",
                    "fields": {
                      "Task": "ф",
                      " How to do: Answer to test question": "First reply must be within 60 seconds. Most of the answers can be found in our FAQ, and you can copy and paste the link  into the chat, guiding the us...",
                      "Sequence": "1",
                      "Time required (mins)": 5,
                      "Frequency per week": 300,
                      "Importance": "5/5",
                      "Can be automated?": "No",
                      "Checklist": "Yes",
                      "Question type. 1=Yes/No 2=Open text field": "2",
                      "Functions copy": "CS specialist 1 line 01_Respond",
                      "Role and Function": [
                        "recBtzR6golcYoJcI"
                      ]
                    }
                  }
                ])
                .then((res) => {console.log(res)});
            }}
            type="button" className="btn controls__update">Обновить записи в таблице</button>
        </div>
    );
  };

export default Controls;
