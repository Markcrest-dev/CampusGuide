import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import { UniversityProvider } from './context/UniversityContext';
import LandingPage from './pages/LandingPage';
import UniversityDashboard from './pages/UniversityDashboard';

function App() {
  return (
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
  );
}

export default App;
