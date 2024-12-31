import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// Pages
import Knowledge from './pages/Knowledge';
import ConsultantTools from './pages/ConsultantTools';
import HealingTools from './pages/HealingTools';

// Components
import Layout from './components/Layout';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="/" element={<Knowledge />} />
          <Route path="/consultant-tools" element={<ConsultantTools />} />
          <Route path="/healing-tools" element={<HealingTools />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
