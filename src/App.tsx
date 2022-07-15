import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import InfoPage from "./components/InfoPage/InfoPage";
import LoginForm from "./components/LoginForm/LoginForm";
import { UserContext } from "./contexts/UserContext";

function App() {
  const [userData, setUserData] = useState({});

  return (
    <div className={styles["App"]}>
      <UserContext.Provider value={{ userData, setUserData }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/info" element={<InfoPage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
