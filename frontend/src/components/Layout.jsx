import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { useState } from 'react';

const DOAIDE_PRODUCTS = [
  { name: "Proposals", url: "https://proposals.doaide.com" },
  { name: "Scheduler", url: "https://scheduler.doaide.com" },
  { name: "Payroll", url: "https://payroll.doaide.com" },
  { name: "Inventory", url: "https://inventory.doaide.com" },
  { name: "Support", url: "https://support.doaide.com" },
  { name: "Analytics", url: "https://analytics-app.doaide.com" },
  { name: "GST", url: "https://gst.doaide.com" },
  { name: "Desk", url: "https://desk.doaide.com" },
  { name: "Jobs", url: "https://job.doaide.com" },
  { name: "409A", url: "https://409a.doaide.com" },
  { name: "Pulse", url: "https://pulse.doaide.com" },
  { name: "Med", url: "https://med.doaide.com" },
  { name: "Realty", url: "https://realty.doaide.com" },
  { name: "Reach", url: "https://reach.doaide.com" },
  { name: "Trade", url: "https://trade.doaide.com" },
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/templates', label: 'Templates' },
    { to: '/proposals', label: 'Proposals' },
    { to: '/clients', label: 'Clients' },
  ];

  const themeOptions = ['system', 'light', 'dark'];
  const nextTheme = () => {
    const idx = themeOptions.indexOf(theme);
    setTheme(themeOptions[(idx + 1) % themeOptions.length]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="text-xl font-bold text-[#0D9488]">
                DoAide <span className="text-gray-400 font-normal mx-1">|</span> Proposals
              </Link>
              <div className="hidden md:flex ml-8 space-x-1">
                {navLinks.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                          : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={nextTheme}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                title={`Theme: ${theme}`}
              >
                {theme === 'dark' ? '🌙' : theme === 'light' ? '☀️' : '💻'}
              </button>
              <Link
                to="/settings"
                className="hidden md:block text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                {user?.full_name || 'Settings'}
              </Link>
              <button
                onClick={handleLogout}
                className="hidden md:block text-sm text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
              >
                Logout
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-md text-gray-500"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 pb-3">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm ${
                    isActive
                      ? 'text-primary-700 bg-primary-50 dark:text-primary-300 dark:bg-primary-900/30'
                      : 'text-gray-600 dark:text-gray-300'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/settings"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300"
            >
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">DoAide Products</h4>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {DOAIDE_PRODUCTS.map((p) => (
                <a key={p.name} href={p.url} className="text-gray-500 dark:text-gray-400 hover:text-[#0D9488] no-underline">{p.name}</a>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-gray-200 dark:border-gray-800">
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
              <span className="inline-block w-2 h-2 rounded-full bg-[#0D9488]"></span>
              A DoAide Product
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">&copy; {new Date().getFullYear()} DoAide. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
