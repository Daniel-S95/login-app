import { FC, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import UserDataTable from '../UserDataTable/UserDataTable';
import UserProjectsTable from '../UserProjectsTable/UserProjectsTable';
import styles from './InfoPage.module.css';

interface InfoPageProps { }

const InfoPage: FC<InfoPageProps> = () => {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }
  }, [navigate]);

  return (
    <div className={styles["info-page"]}>
      <UserDataTable userData={userData} />
      <UserProjectsTable />
    </div>
  );
};

export default InfoPage;
