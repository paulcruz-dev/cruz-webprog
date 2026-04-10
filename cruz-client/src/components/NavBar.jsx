import { NavLink } from 'react-router-dom';
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
      ? 'text-zinc-900'
      : 'text-zinc-500 hover:text-zinc-900',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur border-b border-zinc-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img 
            src={logo} 
            alt="Logo" 
            className="h-12 w-auto object-contain"
          />
        </NavLink>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          {links.map(link => (
            <NavLink key={link.to} to={link.to} className={navLinkClassName}>
              {link.label}
            </NavLink>
          ))}
        </nav>

      </div>
    </header>
  );
};

export default NavBar;