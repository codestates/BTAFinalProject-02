import React, { useState } from "react";
import { goTo } from "react-chrome-extension-router";
import TextField from "@mui/material/TextField";
import { useInput } from "../hooks/useInput";
import {
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Home from "./Home";
import { unlockWallet } from "../utils/storage";

const LoginPage = () => {
  const [password, onChangePassword] = useInput("");
  const [showPassword, setShowPassword] = useState(false);

  const onClickSubmit = () => {
    unlockWallet(password, (res) => {
      if (res) goTo(Home);
    });
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <div style={{ textAlign: "center", paddingTop: "230px" }}>
        <OutlinedInput
          label="비밀번호입력"
          onChange={onChangePassword}
          id="outlined-required"
          type={showPassword ? "text" : "password"}
          defaultValue=""
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <div style={{ paddingTop: "10px" }}>
          <Button variant="contained" onClick={onClickSubmit}>
            확인
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
