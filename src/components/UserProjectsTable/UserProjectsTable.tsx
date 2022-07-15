import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, CircularProgress } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { FC, useEffect, useState } from 'react';
import styles from './UserProjectsTable.module.css';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import MyTableCell from '../MyTableCell/MyTableCell';
import ProjectsStats from '../ProjectsStats/ProjectsStats';
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';

interface UserProjectsTableProps { }

interface ProjectData {
  [key: string]: string | number | boolean | undefined;
  id: string;
  name: string;
  score: number;
  durationInDays: number;
  bugsCount: number;
  madeDadeline: boolean;
}

interface TableData {
  header: string;
  value: any;
  [key: string]: React.Key | string | React.ReactElement | undefined | null;
}

const UserProjectsTable: FC<UserProjectsTableProps> = () => {
  const INFO_URL = "https://private-052d6-testapi4528.apiary-mock.com/info";
  const [isLoaded, setIsLoaded] = useState(false);
  const [userProjectsData, setUserProjectsData] = useState([]);
  const [sortedProjectsData, setSortedProjectsData] = useState([]);
  const [sortedTableDataBy, setSortedTableDataBy] = useState({});

  const headerConfig = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  };

  const projectsTableData = [
    { header: "ID", value: "id" },
    { header: "Name", value: "name" },
    { header: "Score", value: "score" },
    { header: "Duration (days)", value: "durationInDays" },
    { header: "Bugs Count", value: "bugsCount" },
    { header: "Made Deadline", value: "madeDadeline" }
  ];

  useEffect(() => {
    getUserProjects();
  }, []);

  const getUserProjects = async () => {
    try {
      let response = await axios.get(INFO_URL, headerConfig);
      let data = response.data;
      setUserProjectsData(data);
      setSortedProjectsData(data);
      setIsLoaded(true);
    } catch (error) {
      const err = error as AxiosError;
      console.error(err.message);
    }
  }

  useEffect(() => {
    calculateProjectsStats();
  }, [userProjectsData]);

  const calculateProjectsStats = () => {
    let totalProjectsCount = userProjectsData.length;

    let scoreSum = userProjectsData.reduce((averageScore: number, obj: { score: number }) => obj.score + averageScore, 0);
    let scoreAverage = +(scoreSum / totalProjectsCount).toFixed(2);

    let successfulProjects = userProjectsData.reduce((averageScore: number, obj: { madeDadeline: number }) => obj.madeDadeline + averageScore, 0);
    let successfulProjectsPercentage = +(successfulProjects / totalProjectsCount * 100).toFixed(2);

    return { successfulProjectsPercentage, scoreAverage };
  }

  const generateTableCell = (projectData: ProjectData) => {
    return (
      <TableRow key={projectData.id} className={projectData.score < 70 ? styles["red-bg"] : (projectData.score > 90 ? styles["green-bg"] : "")}>

        {Object.keys(projectData).map(key => {
          if (key === "madeDadeline") {
            return <MyTableCell key={key}>{projectData[key] ? <CheckIcon className={styles["check-icon"]} /> : <CloseIcon className={styles["close-icon"]} />}</MyTableCell>
          }

          return <MyTableCell key={key}>{projectData[key]}</MyTableCell>
        })}
      </TableRow >
    );
  }

  const generateTableHeader = (tableData: TableData) => {
    let currentSortedColumn = Object.values(sortedTableDataBy)[0];

    if (currentSortedColumn === tableData.value) {
      let isOrderByDesc = Object.values(sortedTableDataBy)[1];
      let arrowDirection = isOrderByDesc ? <SouthIcon /> : <NorthIcon />;

      return <span className={`${styles["sort-arrow"]} ${styles["cursor"]}`}>{arrowDirection} {tableData.header}</span>;
    }

    return <span className={styles["cursor"]}>{tableData.header}</span>;
  }

  const sortHandler = (e: string) => {
    let sortedTable;
    let orderByDesc = false;

    if (Object.values(sortedTableDataBy)[0] === e) {
      orderByDesc = !!Object.values(sortedTableDataBy)[1];
      setSortedTableDataBy({ "columnOrder": e, "orderByDesc": !orderByDesc });
    } else {
      setSortedTableDataBy({ "columnOrder": e, "orderByDesc": true });
    }

    sortedTable = [...userProjectsData].sort((a, b) => {
      let x = a[e];
      let y = b[e];
      return orderByDesc ? ((x < y) ? -1 : ((x > y) ? 1 : 0)) : ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });

    setSortedProjectsData(sortedTable);
  }

  if (!isLoaded) {
    return <CircularProgress size={80} />;
  }

  return (
    <>
      <ProjectsStats stats={calculateProjectsStats()} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {projectsTableData.map((tableData) => <MyTableCell key={tableData.value} onClick={() => { sortHandler(tableData.value) }}>{generateTableHeader(tableData)}</MyTableCell>)}
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedProjectsData.map((projectData: ProjectData) => generateTableCell(projectData))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserProjectsTable;
