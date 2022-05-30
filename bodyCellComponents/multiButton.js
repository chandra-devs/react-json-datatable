import React from 'react'
import ButtonGroup from '@mui/material/ButtonGroup';
import { map } from 'lodash';

import tableFunctions from '../TableFunctions';

function MultiButton({tableRowDataStructure, row, structure}) {
  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      {map(structure.items, item => {
        const dependent = structure.dependent
        if(item.condition === row[dependent]){
          return (
            <Button
              key={item.label}
              style={item.style}
              href={item.href}
              variant={item.variant || 'contained'}
              size={item.size}
              onClick={() => !item.onClick || tableFunctions.handleClick(tableRowDataStructure, row, structure, item.onClick )}
            >
              {item.label}
            </Button>
          )	
        }
      })}
    </ButtonGroup>	
  )
}

export default MultiButton