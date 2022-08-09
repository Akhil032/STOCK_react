import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

import StarBorder from "@mui/icons-material/StarBorder";
import DownloadIcon from '@mui/icons-material/Download';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import UserProfile from "../../Components/UserProfile";
import { useNavigate, Outlet } from "react-router-dom";
import proxima360 from "../../Assets/icons/proxima360.png";
import { GetItems } from "../../Constants/menu";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

const drawerWidth = 0;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  backgroundColor: `grey`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - 290px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      width: "290px",
      backgroundColor: "grey"
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
const useStyles = makeStyles({
  LayoutDiv: {
    display: "flex",
    justifyContent: "space-between",
  },
  LayoutIconDiv: {
    display: "flex",
  },
  ImageDiv: {
    width: "55px",
  },
});
const items = GetItems();

export default function Index() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [menu, setMenu] = useState();
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setIsOpen(false);
  };

  const handleNavigation = (routeName) => {
    if (routeName === "Upload") {
      navigate(`/stage-processing`);
    }
    if (routeName === "Error Processing") {
      navigate("/error-processing");
    }
      if (routeName === "Unit Cost Maintenance") {
          navigate("/Cost-Maintenance");
      }
      if (routeName === "Finance Interface Data") {
        navigate("/Finance-Interface");
    }
  };
  const handleHomePage = (routedata) => {
    if (routedata == "Home") {
      navigate(`/dashboard`);
    }
    if (routedata == "System Config") {
      navigate(`/system-config`);
    }
  };
  const handleClick = (index) => {
    setIsOpen(!isOpen);
    setMenu(index);
  };
  const handleSubMenuNavigation = () => {
    setIsOpen(!isOpen);
  };
  const handleChange = (index) => {
    handleClick(index);
    handleDrawerOpen();
  };
  const handleErrorProcessing = () => {
    navigate("/error-processing");
  };

  const Layoutclasses = useStyles();

  return (
    <>
      <Box sx={{ display: "flex", bgcolor: "grey"}}>
        <CssBaseline/>
        <AppBar position="fixed" open={open} style={{backgroundColor:'grey'}}>
          <Toolbar className={Layoutclasses.LayoutDiv}>
            <div className={Layoutclasses.LayoutIconDiv}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon sx={{color:"#66cdaa"}}/>
              </IconButton>
              <Link to="/dashboard" >
                  <img src={proxima360} className={Layoutclasses.ImageDiv} />
              </Link>
            </div>
            <div>
              <UserProfile/>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} >
          <DrawerHeader>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div>
                {" "}
                <Typography variant="h5">Stock Ledger </Typography>
              </div>

              <IconButton onClick={handleDrawerClose} sx = {{bgcolor: "grey"}}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
          </DrawerHeader>
          <Divider/>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "grey" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {items?.list?.map((itemsData, index) => {
              return (
                <>
                  <ListItemButton
                    onClick={() => {
                      handleChange(index);
                    }}
                  >
                    <ListItemIcon>{itemsData.icon}</ListItemIcon>
                    <ListItemText
                      primary={itemsData.name}
                      onClick={() => {
                        handleHomePage(itemsData.name);
                      }}
                    />
                    {itemsData?.subitems?.length ? (
                      isOpen ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )
                    ) : (
                      ""
                    )}
                  </ListItemButton>
                  {itemsData?.subitems &&
                    itemsData?.subitems?.map((dataSet) => {
                      return (
                        <>
                          <Collapse
                            in={menu == index ? isOpen : ""}
                            timeout="auto"
                            unmountOnExit
                            key={dataSet.name}
                          >
                            <List component="div" sx={{ marginLeft: "35px" }}>
                              <ListItemButton
                                sx={{ pl: 4 }}
                                onClick={() => {
                                  handleNavigation(dataSet.name);
                                }}
                              >
                                <ListItemIcon>
                                 {dataSet.icon}
                                </ListItemIcon>
                                <ListItemText
                                  primary={dataSet.name}
                                  onClick={handleDrawerClose}
                                />
                              </ListItemButton>
                            </List>
                          </Collapse>
                        </>
                      );
                    })}
                </>
              );
            })}
          </List>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 1}}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
