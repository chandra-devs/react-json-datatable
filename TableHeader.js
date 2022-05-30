import * as React from "react"
import { string, func, oneOf, arrayOf, shape } from "prop-types"
import { Input, Box, TableHead, TableRow } from "@material-ui/core"
import { Search, Sort } from "@material-ui/icons"
import { debounce } from "lodash"

import { SortLabel, HeaderCell } from "./style"

function TableHeader({ headCells, handleSearch, order, orderBy, onRequestSort }) {
	const createSortHandler = (property) => (event) => onRequestSort(event, property)

	const handleSearchHead = debounce((e, index) => {
		const dataAfterSearch = [...headCells]
		dataAfterSearch[index].search = e.target.value
		handleSearch([...dataAfterSearch])
	}, 500)

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell, i) => (
					<HeaderCell key={i} className={"firstCell"} sortDirection={orderBy === headCell.id ? order : false}>
						<SortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : "asc"} onClick={createSortHandler(headCell.id)} IconComponent={Sort} component="div">
							{headCell.label}
							{orderBy === headCell.id ? <Box component="span">{order === "desc" ? "sorted descendings" : "sorted ascendings"}</Box> : null}
						</SortLabel>
					</HeaderCell>
				))}
			</TableRow>

			{/* <TableRow>
				{headCells.map((headCell, index) => (
					<HeaderCell key={headCell.id}>
						<Input
							type={"text"}
							sx={{marginTop: 0}}
							endAdornment={<Search sx={{color: 'black'}} />}
							onChange={(e) => handleSearchHead(e, index)}
						/>
					</HeaderCell>
				))}
			</TableRow> */}
		</TableHead>
	)
}

TableHeader.propTypes = {
	headCells: arrayOf(shape({ id: string, label: string, search: string })).isRequired,
	handleSearch: func.isRequired,
	order: oneOf(["asc", "desc"]).isRequired,
	orderBy: string.isRequired,
	onRequestSort: func.isRequired,
}

export default TableHeader
