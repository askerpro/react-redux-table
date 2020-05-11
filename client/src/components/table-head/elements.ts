import { TableHead, TableCell, TableRow } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

export const MyTableCell = styled(TableCell)({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  height: '100%',
});

export const MyHeaderRow = styled(TableRow)({
  display: 'flex',
  alignItems: 'stretch',
});
