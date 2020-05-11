import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import styled from 'styled-components';

export const MyTableCell = styled(TableCell)`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 100%;
`;

interface DifferCellProps {
  value: number;
}

export const DifferCell = styled(MyTableCell)<DifferCellProps>`
  color: ${({ value, theme }) =>
    (value < 0 && theme.palette.error.main) ||
    (value > 0 && theme.palette.success.main) ||
    'inherit'};
`;

export const MyTableRow = styled(TableRow)`
  display: flex;
  box-sizing: border-box;
  cursor: pointer;
`;
