import { styled, TableCell, TableSortLabel, TablePagination, Box, Toolbar } from "@material-ui/core";

const tableBorder = `1px solid #36b9cc`;

export const TableTitleContainer = styled(Toolbar)(() => ({
	borderBottom: tableBorder,
	marginBottom: "1rem",
}));

export const TableTitleText = styled('h5')(() => ({
	color: '#36b9cc !important',
	lineHeight: '22px',
	marginBottom: 0,
	fontWeight: 'bold',
}));

export const SortLabel = styled(TableSortLabel)(() => ({
	justifyContent: 'space-between',
	color: 'black',
	lineHeight: '21px',
	fontSize: '14px',
	fontWeight: 400,
	display: 'flex',

	'svg.MuiTableSortLabel-icon': {
		color: `black !important`,

		'&.MuiTableSortLabel-iconDirectionAsc': { transform: 'rotate(180deg)' },
		'&.MuiTableSortLabel-iconDirectionDesc': { transform: 'scaleX(-1) rotate(0deg)' },
	},
}));

export const HeaderCell = styled(TableCell)(() => ({
	'&.firstCell': {
		paddingBottom: 0,
		borderBottom: 0,
	},
	'&.firstCell > div': {
		color: 'white !important',
		fontWeight: 'bold !important',
		fontSize: '14px !important',
	},
	'&:not(.firstCell)': {
		paddingBottom: '10px',
		paddingTop: '2px',
	},

	':not(:first-of-type)': { borderLeft: tableBorder },
	'.MuiInput-underline': {
		width: '100%',
		'&::after': {
			borderColor: '#eee',
		},
	}
}));

export const BodyCell = styled(TableCell)(() => ({
	padding: '8px 16px',
}));

export const Pagination = styled(TablePagination)(() => ({
	'.MuiToolbar-root': { padding: 0 },
	
	'.MuiTablePagination-displayedRows': { display: 'none' },
}));

export const PaginationNavBox = styled(Box)(() => ({
	alignItems: 'center',
	marginRight: '8px',
	display: 'flex',

	'.MuiButtonBase-root': {
		marginRight: '16px',
		height: '24px',
		width: '24px',
	},
}));

export const CurrentPage = styled(Box)(() => ({
	borderRadius: '50%',
	backgroundColor: 'grey',
	marginRight: '16px',
	textAlign: 'center',
	color: 'white',
	lineHeight: '24px',
	fontWeight: 600,
	height: '24px',
	width: '24px',
}));
