import * as React from 'react';
import { number, func } from 'prop-types';
import { IconButton } from '@material-ui/core';
import { FirstPage, LastPage, KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { CurrentPage, PaginationNavBox } from './style';

const PaginationActions = ({ count, page, rowsPerPage, onPageChange }) => {
	const handleFirstPageButtonClick = (event) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<PaginationNavBox>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				<FirstPage />
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				<KeyboardArrowLeft />
			</IconButton>

			<CurrentPage>{page + 1}</CurrentPage>

			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				<KeyboardArrowRight />
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				<LastPage />
			</IconButton>
		</PaginationNavBox>
	);
}

PaginationActions.propTypes = {
	count: number.isRequired,
	onPageChange: func.isRequired,
	page: number.isRequired,
	rowsPerPage: number.isRequired,
};

export default PaginationActions;
