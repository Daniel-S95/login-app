import { Alert } from '@mui/material';
import { FC } from 'react';
import styles from './ProjectsStats.module.css';

interface ProjectsStatsProps {
  stats: {
    successfulProjectsPercentage: number;
    scoreAverage: number;
  };
}

const ProjectsStats: FC<ProjectsStatsProps> = ({ stats: { successfulProjectsPercentage, scoreAverage } }) => {
  const alertStyle = { display: "flex", justifyContent: "space-evenly", fontSize: "1rem", fontWeight: 600, color: "#014F86" };

  return (
    <div className={styles["stats-container"]}>
      <Alert severity="info" icon={false} className={styles["alert-text"]} sx={alertStyle}>
        <div>
          Total successful projects : {successfulProjectsPercentage}%
        </div>

        <div>
          Average project score: {scoreAverage}
        </div>
      </Alert>
    </div>
  );
};

export default ProjectsStats;
