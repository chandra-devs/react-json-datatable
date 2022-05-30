module.exports = {
  testOnUserClick: (tableRowDataStructure, row, structure) => {
    console.log('This is a click from user\'s functions')
  },

  testButtonClick: (tableRowDataStructure, row, structure) => {
    console.log('This is a test for the button Click')
  },

  testDiagnosisClick: (tableRowDataStructure, row, structure) => {
    console.log('This is the test diagnosis click', row.id)
  },

  testReDiagnosisClick: (tableRowDataStructure, row, structure) => {
    console.log('This is the test re diagnosis click')
  },

  testGenerateInvoiceClick: (tableRowDataStructure, row, structure) => {
    console.log('This is the generate invoice click')
  }

}