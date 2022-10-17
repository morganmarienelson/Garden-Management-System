import React from 'react'
import { createTheme , ThemeProvider} from '@mui/material/styles';
import PersistentDrawerLeft from './components/navbar';
import {Routes, Route} from 'react-router-dom';
import Applications from './components/applications';
import Plots from './components/plots';
import Footer from './components/footer';
import Mail from './components/mail';
import QuestionForum from './components/questionForum';

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

  return (
    <div>
    <ThemeProvider theme={theme}>
      <PersistentDrawerLeft/>
    <Routes>
      <Route path="/Plots" element={<Plots />} />
      <Route path="/Applications" element={<Applications />} />
      <Route path="/Mail" element={<Mail />} />
      <Route path = "/Forum" element={<QuestionForum />} />
    </Routes>
    <Footer/>
    </ThemeProvider>
    </div>
  );
}

export default App;
