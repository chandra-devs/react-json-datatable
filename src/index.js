import React, { useCallback, useEffect, useState } from "react"
import { Paper, TableContainer, Table, TableBody, TableFooter, TableRow, FormControl, InputBase, IconButton } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
import { string, bool, arrayOf, shape, func, number, any } from "prop-types"
import { isEmpty, map, debounce } from "lodash"

import TableHeader from "./TableHeader"
import PaginationActions from "./PaginationActions"
import TableTitle from "./TableTitle"
import TableRowLoader from "./TableRowLoader"
import TableRowData from "./TableRowData"
import EmptyRowFiller from "./EmptyRowFiller"
import { Pagination } from "./style"

/* TODO: Error handling */
const CustomTable = ({style, tableTitle, isLoading = false, triggerReloadRows, api, formatRowData, handleSearch, headCells, defaultSortOrder = "asc", defaultSortColumn, paginationType, tableRowDataStructure, functions, externalValues }) => {
	const [loading, setLoading] = useState(isLoading)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [totalRecords, setTotalRecords] = useState(0)
	const [order, setOrder] = useState(defaultSortOrder)
	const [orderBy, setOrderBy] = useState(defaultSortColumn)
	const [page, setPage] = useState(1)
	const [rows, setRows] = useState([])
	const [emptyRows, setEmptyRows] = useState(0)

	useEffect(() => {
		// Avoid a layout jump when reaching the last page with empty rows.
		setEmptyRows(page > 1 ? Math.max(0, (0 + page) * rowsPerPage - totalRecords) : 0)
	}, [page, rowsPerPage, totalRecords])

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc"
		setOrder(isAsc ? "desc" : "asc")
		setOrderBy(property)
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage + 1)
	}

	const fetchRowsData = useCallback(
		({ sort_column, sort_type, page, filters }) => {
			setLoading(true)
			const data = { sort_column, sort_type, page }
			if (!isEmpty(filters)) {
				filters.forEach((filter) => (data[filter.id] = filter.search))
				data.page = 1
			}
			api(data)
				.then((res) => {
					setLoading(false)
					const fetchedData = res.data.data
					// console.log("This is the fetched data received from the api", fetchedData)
					if (!isEmpty(fetchedData)) {
						// setRowsPerPage(fetchedData.rowsPerPage);
						setTotalRecords(res.data.total)
						// setPage(fetchedData.current_page);
						const rowsData = map(fetchedData, (row) => formatRowData(row))
						setRows(rowsData)
					}
				})
				.catch((e) => {
					setLoading(false)
					console.log(e)
				})
		},
		[formatRowData, api]
	)

	useEffect(() => {
		const filters = headCells.filter((cell) => !isEmpty(cell.search))
		fetchRowsData({ sort_column: orderBy, sort_type: order, page, filters })
	}, [headCells, orderBy, order, page, fetchRowsData, triggerReloadRows])

	return (
		<Paper elevation={0} variant="outlined" style={{margin:"10px"}}>
			{tableTitle && <TableTitle title={tableTitle} />}

			<TableContainer style={{...style, width:"auto" }}>
				<div>
					<InputBase sx={{ marginLeft: 3 }} style={{width:"300px"}} placeholder="Search" onChange={(e) => handleSearch(e.target.value)} />
					<IconButton type="submit" sx={{ padding: 10 }} aria-label="search">
						<SearchIcon />
					</IconButton>
				</div>
				<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={"medium"}>
					<TableHeader headCells={headCells} order={order || ""} orderBy={orderBy || ""} onRequestSort={handleRequestSort} handleSearch={handleSearch} rowCount={totalRecords} />

					<TableBody>
						{loading ? (
							<TableRowLoader headCells={headCells} rowsPerPage={rowsPerPage} />
						) : (
							<>
								<TableRowData functions={functions} externalValues={externalValues} headCells={headCells} rows={rows} order={order || ""} orderBy={orderBy || ""} tableRowDataStructure={tableRowDataStructure} />
								<EmptyRowFiller headCells={headCells} emptyRows={emptyRows} />
							</>
						)}
					</TableBody>
					<TableFooter>
						<TableRow>
							<Pagination count={totalRecords} page={page - 1} onPageChange={handleChangePage} rowsPerPage={rowsPerPage} rowsPerPageOptions={[5, 10, 15]} ActionsComponent={PaginationActions} />
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</Paper>
	)
}

CustomTable.propTypes = {
	tableTitle: string,
	isLoading: bool,
	triggerReloadRows: number,
	api: func.isRequired,
	formatRowData: func.isRequired,
	handleSearch: func.isRequired,
	headCells: arrayOf(shape({ id: string, label: string })).isRequired,
	defaultSortOrder: string,
	defaultSortColumn: string,
	paginationType: string,
	tableRowDataStructure: any,
}

export default CustomTable
