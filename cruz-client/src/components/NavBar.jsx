import { NavLink, Link } from 'react-router-dom';
import logo from '../assets/connect.png';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'text-sm font-medium transition',
    isActive
      ? 'text-white'
      : 'text-zinc-400 hover:text-white',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-zinc-950/80 backdrop-blur border-b border-zinc-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        <NavLink to="/" className="flex items-center">
          <img 
            src={logo} 
            alt="Logo" 
            className="h-12 w-auto object-contain brightness-90"
          />
        </NavLink>

        <nav className="flex items-center gap-8">
          {links.map(link => (
            <NavLink key={link.to} to={link.to} className={navLinkClassName}>
              {link.label}
            </NavLink>
          ))}

          <div className="h-6 w-px bg-zinc-700" />

          <Link
            to="/auth/signin"
            className="text-sm text-zinc-400 hover:text-white transition"
          >
            Sign In
          </Link>

          <Link
            to="/auth/signup"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            Sign Up
          </Link>
        </nav>

      </div>
    </header>
  );
};

export default NavBar;