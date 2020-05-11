import React from 'react';
import { TableHeaderRowRenderer } from 'react-virtualized';
import { StyledTableHead, MyHeaderRow } from './elements';

const EnhancedTableHeader: TableHeaderRowRenderer = ({ columns, style, className }) => {
  return (
    <StyledTableHead>
      <MyHeaderRow style={style} className={className}>
        {columns}
      </MyHeaderRow>
    </StyledTableHead>
  );
};

export default EnhancedTableHeader;
