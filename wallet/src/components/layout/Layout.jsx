import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { changeNetwork } from "../../utils/storage";

const Layout = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState();
  const [net, onChangeNet] = useState("privatenet");
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickLogout = () => {};
  const changeNet = (value) => {
    changeNetwork(value, (res) => {
      if (res) onChangeNet(value);
    });
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 120, marginLeft: "20px" }}>
            <Select
              value={net}
              onChange={(event) => {
                changeNet(event.target.value);
              }}
              displayEmpty
              sx={{ color: "white" }}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={"mainnet"}>메인넷</MenuItem>
              <MenuItem value={"testnet"}>테스트넷</MenuItem>
              <MenuItem value={"privatenet"}>프라이빗넷</MenuItem>
            </Select>
          </FormControl>
          <IconButton
            sx={{ marginRight: "20px" }}
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={onClickLogout}>로그아웃</MenuItem>
          </Menu>
        </div>
      </AppBar>
      {children}
    </Box>
  );
};

export default Layout;
