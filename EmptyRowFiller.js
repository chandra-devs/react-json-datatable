import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';

const EmptyRowFiller = ({ emptyRows, headCells }) => (
	emptyRows > 0 && (
		<TableRow style={{ height: (37) * emptyRows }}>
			<TableCell colSpan={headCells.length} />
		</TableRow>
	)
);

export default EmptyRowFiller;
