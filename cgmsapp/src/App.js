import React, {useState} from 'react'
import { createTheme , ThemeProvider} from '@mui/material/styles';
import PersistentDrawerLeft from './components/navbar';
import {Routes, Route, } from 'react-router-dom';
import Applications from './components/applications';
import Plots from './components/plots';
import Footer from './components/footer';
import Mail from './components/mail';
import QuestionForum from './components/questionForum';
import Login from './components/login';
import {ContactsProvider} from "./context/ContactsProvider";
import {ConversationsProvider} from "./context/ConversationsProvider";
import {useLocation} from 'react-router-dom';



const theme = createTheme({
  palette: {
    primary: {
      light: "#8bc34a",
      main: "#7cb342",
      dark: "#618833",
      contrastText: "#fff",
    },
    secondary: {
      light: "#616161",
      main: "#424242",
      dark: "#212121",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

function App() {
<<<<<<< HEAD
  // const [username, setUserName] = useLocalStorage('username');
  const [username, setUserName] = React.useState('');
//EXAMPLE OF API CALL
  //  function apiClick () {
  //   apiClient.get('/v1/balancebook/get/all')
  //   .then((response) => {
  //     console.log(response);
  //   }
  //   )
  // };
=======
  const [username, setUserName] = React.useState('');
  const location = useLocation();
>>>>>>> 7d9494ffa323c1646d6bff2974f66cb9c160a69c

  const mail = (
    <ContactsProvider>
      <ConversationsProvider username={username}>
        <Mail username={username} />
      </ConversationsProvider>
    </ContactsProvider>
  );
  return (
    <div>
    <ThemeProvider theme={theme}>
      <PersistentDrawerLeft/>
    <Routes>
      <Route path="/Plots" element={<Plots />} />
      <Route path="/Applications" element={<Applications />} />
      <Route path="/Mail" element={ mail }/>
      {/*<Route path="/Mail" element={username ? mail : <Login setUserName={setUserName} userName={username}/>} />*/}
      <Route path = "/Forum" element={<QuestionForum />} />
      <Route path = "/Login" element={<Login setUserName={setUserName} userName={username}/>} />
    </Routes>
    {location.pathname !== '/Mail' && <Footer /> }
    </ThemeProvider>
    </div>
  );
}

export default App;
