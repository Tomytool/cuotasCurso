import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { fetchAndParseCSV } from './utils/csvFetcher';

const GOOGLE_SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT3gW4N4WWsDZdaZe-7uaSYn0JTCw5Hpu0qWxGHYSFZHG5nw9KuZEHvfrsh-yws6eESXnvXcKF8Mb9E/pub?gid=2066770524&single=true&output=csv";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Cargar usuarios al iniciar la aplicación
  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchAndParseCSV(GOOGLE_SHEETS_CSV_URL);
      if (data) {
        setUsers(data);
      }
    };
    loadUsers();
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface">
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} user={currentUser} />
      ) : (
        <Login onLogin={handleLogin} users={users} />
      )}
    </div>
  );
}

export default App;
