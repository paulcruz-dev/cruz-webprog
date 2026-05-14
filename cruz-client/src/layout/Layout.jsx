import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      
      {/* Navbar */}
      <NavBar />

      {/* Page Content */}
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-10">
        <Outlet />
      </main>

    </div>
  );
};

export default Layout;