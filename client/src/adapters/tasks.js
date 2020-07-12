const findLookUpValue = (arr, lookupValue, fieldName) => {
    try {
      if (lookupValue) {
      return arr.filter((func) => { return func.id === lookupValue[0]})[0].fields[fieldName];
    }
    return '';  
    } catch {
      return '';
    }
  };



export const adaptTasks = (task, units, functions, roles) => {
    const taskFields = task.fields;
    return {
      'id': task.id,
      'task': taskFields['Task'], 
      'roleAndFunc': findLookUpValue(functions, taskFields['Role and Function'],  'Role_function'),
      'role': findLookUpValue(roles, taskFields['Role'],  'Role in Unit'),
      'unit': findLookUpValue(units, taskFields['Unit'],  'Unit'),
      'funcShort': taskFields['Function Short'],
      'funcLong': taskFields['function_long'],
      'howToDo': taskFields[' How to do: Answer to test question'],
      'sequence': taskFields['Sequence'],
      'timeReq': taskFields['Time required (mins)'],
      'freqPerWeek': taskFields['Frequency per week'],
      'totalTimePerweek': taskFields['Time required (mins)'] * taskFields['Frequency per week'],
      'importance': taskFields['Importance'],
      'canBeautomatic': taskFields['Can be automated?'],
      'checkList': taskFields['CheckList']
    }
}