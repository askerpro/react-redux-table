import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { Order } from 'utils/sort';
import { OrderBy, LastCellType } from 'App';
import { StyledTableHead } from './elements';

interface HeadCell {
  id: OrderBy;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'id', numeric: false, label: 'Pair' },
  { id: 'lastPrice', numeric: true, label: 'Last Price' },
  {
    id: 'change',
    numeric: true,
    label: 'Change',
  },
  {
    id: 'volume',
    numeric: true,
    label: 'Volume',
  },
];

interface EnhancedTableProps {
  onOrderChange: (order: Order) => void;
  onOrderByChange: (OrderBy: OrderBy) => void;
  order: Order;
  orderBy: OrderBy;
  lastCellType: LastCellType;
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { order, orderBy, onOrderChange, onOrderByChange, lastCellType } = props;

  return (
    <StyledTableHead>
      <TableRow>
        {headCells
          .filter((cell) => {
            if (cell.id === 'volume' || cell.id === 'change') {
              return cell.id === lastCellType;
            }
            return true;
          })
          .map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={(orderBy === headCell.id && order) || undefined}
                onClick={() => {
                  if (orderBy === headCell.id) {
                    onOrderChange(order === 'desc' ? 'asc' : 'desc');
                  } else {
                    onOrderByChange(headCell.id);
                  }
                }}
                title={order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ))}
      </TableRow>
    </StyledTableHead>
  );
};

export default EnhancedTableHead;
