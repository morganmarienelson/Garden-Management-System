import React, {useState} from 'react'
import { createTheme , ThemeProvider} from '@mui/material/styles';
import PersistentDrawerLeft from './components/navbar';
import {Routes, Route} from 'react-router-dom';
import Applications from './components/applications';
import Plots from './components/plots';
import Footer from './components/footer';
import Mail from './components/mail';
import QuestionForum from './components/questionForum';
import Button from '@mui/material/Button';
import apiClient from './api/apiClient';
import Login from './components/login';
import useLocalStorage from "./hooks/useLocalStorage";
import {ContactsProvider} from "./context/ContactsProvider";
import {ConversationsProvider} from "./context/ConversationsProvider";


const theme = createTheme({
  palette: {
    primary: {
      light: '#8bc34a',
      main: '#7cb342',
      dark: '#618833',
      contrastText: '#fff',
    },
    secondary: {
      light: '#616161',
      main: '#424242',
      dark: '#212121',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

function App() {
  const [username, setUserName] = useLocalStorage('username');
//EXAMPLE OF API CALL
  //  function apiClick () {
  //   apiClient.get('/v1/balancebook/get/all')
  //   .then((response) => {
  //     console.log(response);
  //   }
  //   )
  // };

  const mail = (
      <ContactsProvider>
        <ConversationsProvider username={username}>
        <Mail username={username} />
        </ConversationsProvider>
      </ContactsProvider>
  )
  return (
    <div>
    <ThemeProvider theme={theme}>
      <PersistentDrawerLeft/>
    <Routes>
      <Route path="/Plots" element={<Plots />} />
      <Route path="/Applications" element={<Applications />} />
      <Route path="/Mail" element={username ? mail : <Login setUserName={setUserName} userName={username}/>} />
      <Route path = "/Forum" element={<QuestionForum />} />
      <Route path = "/Login" element={<Login setUserName={setUserName} userName={username}/>} />
    </Routes>
    {/*<Footer/>*/}
    </ThemeProvider>
    </div>
  );
}

export default App;
