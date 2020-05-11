import React from 'react';
import { TableSortLabel } from '@material-ui/core';
import { TableHeaderProps } from 'react-virtualized';
import { Order } from 'utils/sort';
import { OrderBy } from 'App';
import { MyTableCell } from './elements';

interface HeadCellProps {
  onOrderChange: (order: Order) => void;
  onOrderByChange: (OrderBy: OrderBy) => void;
  order: Order;
  orderBy: OrderBy;
  id: OrderBy;
  numeric: boolean;
}

const headerCellRenderer = ({
  label,
  id,
  onOrderByChange,
  onOrderChange,
  order,
  orderBy,
  numeric,
}: TableHeaderProps & HeadCellProps) => {
  return (
    <MyTableCell
      key={id}
      align={numeric ? 'right' : 'left'}
      sortDirection={orderBy === id ? order : false}
    >
      <TableSortLabel
        active={orderBy === id}
        direction={(orderBy === id && order) || undefined}
        onClick={() => {
          if (orderBy === id) {
            onOrderChange(order === 'desc' ? 'asc' : 'desc');
          } else {
            onOrderByChange(id);
          }
        }}
        title={order === 'desc' ? 'sorted descending' : 'sorted ascending'}
      >
        {label}
      </TableSortLabel>
    </MyTableCell>
  );
};

export default headerCellRenderer;
