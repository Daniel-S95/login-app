import { FC, ReactNode } from 'react';
import { TableCell } from '@mui/material';

interface MyTableCellProps {
  children: string | ReactNode;
  onClick?: React.MouseEventHandler<HTMLTableCellElement>;
}

const MyTableCell: FC<MyTableCellProps> = ({ children, onClick }) => {
  return (
    <TableCell align="center" onClick={onClick}>{children}</TableCell>
  );
};

export default MyTableCell;
