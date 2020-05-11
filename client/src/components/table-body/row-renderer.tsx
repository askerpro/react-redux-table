import React from 'react';
import { TableRowProps } from 'react-virtualized';
import { MyTableRow } from './elements';

const rowRenderer: React.FC<TableRowProps> = ({
  columns,
  rowData,
  key,
  style,
  onRowClick,
  index,
}) => {
  return (
    <MyTableRow
      onClick={(event) => {
        if (onRowClick) onRowClick({ event, rowData, index });
      }}
      hover
      tabIndex={-1}
      key={key}
      style={style}
      selected={rowData.isFavorite}
    >
      {columns}
    </MyTableRow>
  );
};

export default rowRenderer;
