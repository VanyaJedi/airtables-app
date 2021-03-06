const getParams = (arr, field) => {
    return arr.map((row) => {
      return row.fields[field];
    })
  }

const getTableStructure = (functions) => {
    return [
        {title:"Task", field:"task", editor:"input", formatter:"textarea", width: 150},
        {title:"Role and Function", field:"roleAndFunc", editor:"select", width: 150, editorParams:{values:getParams(functions, 'Role_function')}},
        {title:"Role", field:"role", width: 150,},
        {title:"Unit", field:"unit", width: 150,   },
        {title:"Function Short", field:"funcShort" },
        {title:"Function Long", field:"funcLong", width: 300 },
        {title:"How to do: Answer to test question", field:"howToDo", editor:"input", formatter:"textarea", width: 500 },
        {title:"Sequence", field:"sequence", editor:"input", formatter:"textarea", },
        {title:"Time required", field:"timeReq", editor:"input", formatter:"textarea",  },
        {title:"Frequency per week", field:"freqPerWeek", editor:"input", formatter:"textarea", },
        {title:"Total time per week", field:"totalTimePerweek",},
        {title:"Importance", field:"importance", editor:"input", formatter:"textarea", },
        {title:"Can be Automated", field:"canBeautomatic", editor:"input", formatter:"textarea", },
    ];
}

const emptyRow = {
  canBeautomatic: undefined,
  checkList: undefined,
  freqPerWeek: undefined,
  funcLong: undefined,
  funcShort: undefined,
  howToDo: undefined,
  id: undefined,
  importance: undefined,
  role: undefined,
  roleAndFunc: undefined,
  sequence: undefined,
  task: undefined,
  timeReq: undefined,
  totalTimePerweek: undefined,
  unit: undefined
}

export {getTableStructure, emptyRow};