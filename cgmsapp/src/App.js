import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PersistentDrawerLeft from "./components/navbar";
import { Routes, Route } from "react-router-dom";
import Applications from "./components/applications";
import Plots from "./components/plots";
import Footer from "./components/footer";
import Mail from "./components/mail";
import QuestionForum from "./components/questionForum";
import Homepage from "./components/homepage";
import Login from "./components/login";
import SignUp from "./components/signUp";
import useLocalStorage from "./hooks/useLocalStorage";
import { ContactsProvider } from "./context/ContactsProvider";
import { ConversationsProvider } from "./context/ConversationsProvider";
import {useLocation} from 'react-router-dom';
import {SocketProvider} from "./context/SocketProvider";

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
  const [localUsername, setLocalUserName] = useLocalStorage('username');
  const location = useLocation();

  const mail = (
      <SocketProvider username={localUsername}>
    <ContactsProvider>
      <ConversationsProvider username={localUsername}>
        <Mail username={localUsername} />
      </ConversationsProvider>
    </ContactsProvider>
      </SocketProvider>
  );
  return (
    <div>
      <ThemeProvider theme={theme}>
        <PersistentDrawerLeft />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Plots" element={<Plots/>} />
          <Route path="/Applications" element={<Applications />} />
          <Route path="/Mail" element={mail} />
          <Route path="/Forum" element={<QuestionForum />} />
          <Route
            path="/Login"
            element={<Login setLocalUsername={setLocalUserName} />}
          />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
        {location.pathname !== '/Mail' && <Footer /> }
      </ThemeProvider>
    </div>
  );
}

export default App;
