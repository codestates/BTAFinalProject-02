import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
// import HubIcon from "@mui/icons-material/Hub";

const categories = [
  {
    id: "Home",
    children: [
      {
        id: "Dashboard",
        icon: <HomeIcon />,
        active: true,
      },
    ],
  },
  {
    id: "Main Section",
    children: [
      // { id: "Network", icon: <HubIcon /> },
      { id: "Blocks", icon: <CheckBoxOutlineBlankIcon /> },
      { id: "Transaction", icon: <ImportExportIcon /> },
    ],
  },
];

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const MainLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <List sx={{ width: "280px", bgcolor: "#101F33", height: "100vh" }}>
        {categories.map(({ id, children }) => (
          <Box key={id}>
            {children.map(({ id: childId, icon, active }) => (
              <Link to={childId === "Dashboard" ? "/" : `${childId}`}>
                <ListItem key={childId}>
                  <ListItemButton selected={active} sx={item}>
                    <ListItemIcon sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                      {icon}
                    </ListItemIcon>
                    <ListItemText>{childId}</ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}

            <Divider sx={{ m: 2, bgcolor: "rgba(255, 255, 255, 0.7)" }} />
          </Box>
        ))}
      </List>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
