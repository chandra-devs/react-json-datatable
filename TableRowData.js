import React from 'react';
import { map } from 'lodash';
import { TableRow } from '@material-ui/core';
import { string, array, arrayOf, shape } from 'prop-types';

import { getComparator, stableSort } from './helper';
import { getTableRowDataStructure } from './tableRowDataStructure';

const TableRowData = ({ functions,externalValues, headCells, rows, order, orderBy, tableRowDataStructure }) => (
	/* if we don't need to support IE11, you can replace the `stableSort` call with:
	rows.sort(getComparator(order, orderBy)) */

	map(stableSort(rows, getComparator(order, orderBy)), (row, index) => {
		return (
			<TableRow
				hover
				tabIndex={-1}
				key={`${Object.keys(row)[0]}-${index}`}
			>
				{map(tableRowDataStructure && tableRowDataStructure.tableStructure, structure => {
					return getTableRowDataStructure(row, tableRowDataStructure, structure, functions, externalValues)
				})}
			</TableRow>
		);
	})
);

TableRowData.propTypes = {
	headCells: arrayOf(shape({id: string, label: string})).isRequired,
	rows: array,
	order: string,
	orderBy: string,
}

export default TableRowData;
