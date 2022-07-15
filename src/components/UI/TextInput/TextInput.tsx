import { Input, InputLabel } from "@mui/material";
import { FC } from "react";
import styles from "./TextInput.module.css";

interface TextInputProps {
  inputLabel: string;
  type?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const TextInput: FC<TextInputProps> = ({ inputLabel, type, value, onChange }) => {
  const passwordRequirement = "Must be at least 8 characters long, containing at least one upper case character, one lower case character and one number. Special characters are not allowed!";

  return (
    <div className={styles["text-input"]}>
      <InputLabel className={styles["input-label"]}>{inputLabel}:</InputLabel>
      <Input fullWidth type={type} value={value} onChange={onChange} />
      {type === "password" && value.length > 0 && <div className={styles["password-requirement"]}>{passwordRequirement}</div>}
    </div>
  );
};

export default TextInput;
