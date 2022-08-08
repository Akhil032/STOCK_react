import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useNavigate } from "react-router";
import { UsersList } from "../../Constants/login";
import proxima360 from "../../Assets/icons/proxima360.png";
import { LocalLaundryService } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  Copyrightdiv: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: "20px 70px",
    marginTop: "50px",
  },
  Copyrighttext: {
    color: "#00000099",
  },
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright(props) {
  const Authclasses = useStyles();
  return (
    <>
      {" "}
      <div className={Authclasses.Copyrightdiv}>
        {" "}
        <img src={proxima360} />
        <div className={Authclasses.Copyrighttext} {...props}>
          {"Copyright © "}
          <Link color="inherit" href="https://proxima360.com/" target="_blank">
            Proxima360
          </Link>{" "}
          {new Date().getFullYear()}
        </div>
      </div>
    </>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const currentUser = UsersList.find(
      (val) =>
        val.username === userData.username && val.password === userData.password
    );
    if (currentUser) {
      localStorage.setItem("userData", JSON.stringify(currentUser));
      navigate("/dashboard");
    } else {
      setIsError(true);
    }
  };

  const handleChange = (e) => {
    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsError(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={proxima360} />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              value={userData.username}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={userData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={isError} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Please enter valid username and password !
          </Alert>
        </Snackbar>
      </Stack>
    </ThemeProvider>
  );
}
