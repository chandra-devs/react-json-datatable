import * as React from 'react';
import { number, string } from 'prop-types';
import { TableTitleContainer, TableTitleText } from './style';

const TableTitle = ({ totalRecords, title }) => {
	return (
		<TableTitleContainer
			sx={{
				pl: { sm: 2 },
				pr: { sm: 2 },
				minHeight: { sm: '58px' },
			}}
		>
			<TableTitleText id="tableTitle">
				{title}
			</TableTitleText>
		</TableTitleContainer>
	);
};

TableTitle.propTypes = {
	title: string.isRequired,
};

export default TableTitle;
