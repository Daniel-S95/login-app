import { Alert } from "@mui/material";
import axios, { AxiosError } from "axios";
import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import TextInput from "../UI/TextInput/TextInput";
import styles from "./LoginForm.module.css";
import isValidEmail from "is-valid-email";
import LoadingButton from "@mui/lab/LoadingButton";

interface LoginFormProps { }

const LoginForm: FC<LoginFormProps> = () => {
  const AUTH_URL = "https://private-052d6-testapi4528.apiary-mock.com/authenticate";

  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLogging, setIsLogging] = useState(false);

  const loginHandler = async () => {
    if (!validateInputs()) {
      return;
    }

    setIsLogging(true);
    setErrorMessage("");

    try {
      let response = await axios.post(AUTH_URL, { email: emailInput, password: passwordInput });
      let token = response.data[0].token;
      let userData = response.data[0].personalDetails;

      localStorage.setItem("token", token);
      setUserData(userData);
      setIsLogging(false);
      navigate("info");
    } catch (error) {
      const err = error as AxiosError;
      console.error(err.message);
      setIsLogging(false);
      setErrorMessage(err.message);
    }

  };

  const validateInputs = () => {
    let validPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!emailInput) {
      setErrorMessage("Email can't be empty!");
      return false;
    }

    if (!isValidEmail(emailInput)) {
      setErrorMessage("Email is not valid!");
      return false;
    }

    if (!passwordInput) {
      setErrorMessage("Password can't be empty!");
      return false;
    }

    if (!validPasswordRegex.test(passwordInput)) {
      setErrorMessage("Password does meet the requirement!");
      return false;
    }

    return true;
  }

  return (
    <div className={styles["login-form"]}>
      <div className={styles["login-header"]}>
        Login Form:
      </div>

      <div className={styles["input-container"]}>
        <TextInput inputLabel="Email" value={emailInput} onChange={(e: { target: { value: string } }) => setEmailInput(e.target.value)} />
        <TextInput inputLabel="Password" type="password" value={passwordInput} onChange={(e: { target: { value: string } }) => setPasswordInput(e.target.value)} />
      </div>

      <div className={styles["login-button"]}>
        <LoadingButton
          className={styles["login-button"]}
          loading={isLogging}
          variant="contained"
          onClick={loginHandler}
        >
          Login!
        </LoadingButton>
      </div>

      {errorMessage && <Alert className={styles["error-message"]} severity="error">{errorMessage}</Alert>}
    </div>
  );
};

export default LoginForm;
