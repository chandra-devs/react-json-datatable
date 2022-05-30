import React from "react"
import { map } from "lodash"
import { TableRow } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import { BodyCell } from "./style"

const TableRowLoader = ({ rowsPerPage, headCells }) =>
	map(Array.from(Array(rowsPerPage).keys()), (i) => {
		return (
			<TableRow key={`row-${i}`}>
				{map(headCells, (cell,i) => (
					<BodyCell key={i}>
						<Skeleton variant="rect" height="120" width="100%" />
					</BodyCell>
				))}
			</TableRow>
		)
	})

export default TableRowLoader
