import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FC } from 'react';
import styles from './UserDataTable.module.css';
import MyTableCell from '../MyTableCell/MyTableCell';
import { Divider } from '@mui/material';

interface UserDataTableProps {
  userData: {
    name: string;
    Team: string;
    joinedAt: string;
    avatar: string;
  }
}

interface TableData {
  header: string;
  value: any;
  [key: string]: React.Key | string | React.ReactElement | undefined | null;
}

const UserDataTable: FC<UserDataTableProps> = ({ userData }) => {

  const userTableData = [
    { header: "Name", value: userData.name },
    { header: "Team", value: userData.Team },
    { header: "Joined At", value: userData.joinedAt },
    { header: "Avatar", value: <img src={userData.avatar} alt="User Avatar" className={styles["user-avatar"]} /> }
  ];

  if (!Object.keys(userData).length) {
    return <></>;
  }

  return (
    <>
      {userData &&
        <TableContainer component={Paper} >
          <Table>
            <TableHead>
              <TableRow>
                {userTableData.map((tableData: TableData) => <MyTableCell key={tableData.header}>{tableData.header}</MyTableCell>)}
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                {userTableData.map((tableData: TableData) => <MyTableCell key={tableData.value}>{tableData.value}</MyTableCell>)}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer >
      }
      <Divider style={{ width: '100%' }} />
    </>
  );
};

export default UserDataTable;
