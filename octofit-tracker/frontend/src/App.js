import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, NavLink, Routes, Route } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navItems = [
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Users' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavToggle = () => {
    setIsNavOpen((currentValue) => !currentValue);
  };

  const handleNavClose = () => {
    setIsNavOpen(false);
  };

  return (
    <Router>
      <div className="app-shell min-vh-100">
        <nav className="navbar navbar-expand-lg octofit-navbar py-3">
          <div className="container">
            <NavLink className="navbar-brand fw-bold fs-3 d-flex align-items-center gap-3" to="/" onClick={handleNavClose}>
              <img src="/octofitapp-small.png" alt="Octofit Tracker logo" className="octofit-brand-logo" />
              <span className="d-flex flex-column align-items-start lh-sm">
                <span>Octofit Tracker</span>
                <small className="octofit-brand-tagline">Train smarter every day</small>
              </span>
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              aria-controls="octofit-nav"
              aria-expanded={isNavOpen}
              aria-label="Toggle navigation"
              onClick={handleNavToggle}
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className={`navbar-collapse ${isNavOpen ? 'd-block' : 'd-none'} d-lg-flex`} id="octofit-nav">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-2">
                {navItems.map((item) => (
                  <li className="nav-item" key={item.to}>
                    <NavLink
                      className={({ isActive }) => `nav-link px-3 ${isActive ? 'active' : ''}`}
                      to={item.to}
                      onClick={handleNavClose}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        <main className="container py-4 py-lg-5">
          <div className="card border-0 shadow-lg overflow-hidden mb-4 app-intro-card">
            <div className="card-body p-4 p-lg-5">
              <div className="row align-items-center g-4">
                <div className="col-lg-8">
                  <span className="badge text-bg-dark rounded-pill mb-3">Fitness dashboard</span>
                  <h1 className="display-5 fw-bold mb-3">Monitor activities, teams, workouts and rankings in one place.</h1>
                  <p className="lead text-secondary mb-4">
                    Browse Django REST API data through a consistent Bootstrap interface built for quick scanning and detail inspection.
                  </p>
                  <div className="d-flex flex-wrap gap-2">
                    <NavLink className="btn btn-dark btn-lg" to="/leaderboard">Open Leaderboard</NavLink>
                    <NavLink className="btn btn-outline-dark btn-lg" to="/activities">View Activities</NavLink>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="card border-0 shadow-sm h-100 quick-links-card">
                    <div className="card-body">
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <img src="/octofitapp-small.png" alt="Octofit Tracker emblem" className="octofit-side-logo" />
                        <div>
                          <h2 className="h4 mb-1">Quick Links</h2>
                          <p className="text-secondary mb-0">Jump directly into each API-backed view.</p>
                        </div>
                      </div>
                      <div className="list-group list-group-flush">
                        {navItems.map((item) => (
                          <NavLink
                            key={item.to}
                            className="list-group-item list-group-item-action px-0"
                            to={item.to}
                          >
                            {item.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="content-panel">
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route
            path="/"
            element={(
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4 p-lg-5 text-start">
                  <h2 className="display-6 fw-bold mb-3">Welcome to Octofit Tracker</h2>
                  <p className="lead text-secondary mb-4">
                    Use the navigation above to explore each resource with a shared data table layout, filters, cards and detail modals.
                  </p>
                  <div className="d-flex flex-wrap gap-2">
                    {navItems.map((item) => (
                      <NavLink className="btn btn-outline-dark" key={item.to} to={item.to}>
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            )}
          />
        </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
