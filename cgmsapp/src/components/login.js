import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import homepage from "./homepage"
import {Routes, Route, useNavigate} from 'react-router-dom';

export default function SignIn({setLocalUsername}) {
    const [password, setPassword] = React.useState('');
    const [username, setUserName] = React.useState('');
    const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`http://159.223.113.61:8080/UCGB/auth/login/`, {username: `${username}`, password: `${password}`})
        .then (response => { 
            const token = response.data;
            localStorage.setItem('token', token);
            console.log("token");
            console.log(token);
            navigate('/');
        }) 
      .catch(error => {
          console.log(error);
          }
      );
  };

    const loginChange = (event) => {
        setUserName(event.target.value);
        setLocalUsername(event.target.value);
    };

  return (
      <Container component="main" maxWidth="xs" sx={{mb: 10}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              onChange={loginChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
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
          <Routes>
              <Route path="/" element={<homepage />} />
          </Routes>
      </Container>
  );
}
    



