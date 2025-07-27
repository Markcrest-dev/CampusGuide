import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import { ThemeProvider } from './context/ThemeContext';
import { UniversityProvider } from './context/UniversityContext';
import LandingPage from './pages/LandingPage';
import UniversityDashboard from './pages/UniversityDashboard';

function App() {
  return (
    <ThemeProvider>
      <UniversityProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/university/:id" element={<UniversityDashboard />} />
            </Routes>
          </Layout>
        </Router>
      </UniversityProvider>
    </ThemeProvider>
  );
}

export default App;
