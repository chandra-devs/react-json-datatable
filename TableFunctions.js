const userFunctions = require('./functions/userFunctions')

module.exports = {
  handleClick: (tableRowDataStructure, row, structure, functionName) => {
    switch(tableRowDataStructure.tableName){
      case 'users':
        if(functionName) return userFunctions[functionName](tableRowDataStructure, row, structure)
        userFunctions[structure.onClick](tableRowDataStructure, row, structure);
        break;
    }
  }
}