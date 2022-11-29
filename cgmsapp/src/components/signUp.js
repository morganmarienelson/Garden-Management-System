import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";

export default function SignUp() {
  const [firstName, setfirstName] = React.useState("");
  const [lastName, setlastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [zipCode, setZipCode] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignUp = (event) => {
    event.preventDefault();
    axios
      .post(`http://159.223.113.61:8080/UCGB/auth/create/`, {
        firstName: `${firstName}`,
        LastName: `${lastName}`,
        email: `${email}`,
        phoneNumber: `${phoneNumber}`,
        address: `${address}`,
        city: `${city}`,
        state: `${state}`,
        zipCode: `${zipCode}`,
        password: `${password}`,
      })
      .then((response) => {
        const token = response.data;
        localStorage.setItem("token", token);
        console.log(token);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mb: 10 }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AssignmentIndIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="firstName"
            name="firstName"
            autoFocus
            onChange={(event) => setfirstName(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="LastName"
            label="LastName"
            type="LastName"
            id="LastName"
            onChange={(event) => setlastName(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="email"
            type="email"
            id="email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="phoneNumber"
            label="phoneNumber"
            type="phoneNumber"
            id="phoneNumber"
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="address"
            label="address"
            type="address"
            id="address"
            onChange={(event) => setAddress(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="city"
            label="city"
            type="city"
            id="city"
            onChange={(event) => setCity(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="state"
            label="state"
            type="state"
            id="state"
            onChange={(event) => setState(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="zipCode"
            label="zipCode"
            type="zipCode"
            id="zipCode"
            onChange={(event) => setState(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="password"
            type="password"
            id="password"
            onChange={(event) => setState(event.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/SignUp" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/SignUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
