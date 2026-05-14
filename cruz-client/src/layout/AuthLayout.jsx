import { Outlet } from 'react-router-dom';
import music from '../assets/music.jpg';

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.9fr]">
        
        {/* Left Side (Visual Panel) */}
        <div className="hidden lg:flex items-center justify-center border-r border-zinc-800 bg-zinc-900 p-16">
          <div className="flex w-full max-w-md items-center justify-center rounded-[2rem] border border-zinc-800 bg-zinc-950/60 p-10 backdrop-blur">
            
            {/* Abstract Design */}
            <div className="w-full max-w-[18rem] overflow-hidden rounded-xl border border-zinc-800">
                <img
                    src={music}
                    alt="music"
                    className="h-full w-full object-cover"
                />
                </div>

          </div>
        </div>

        {/* Right Side (Form Content) */}
        <main className="flex items-center justify-center px-6 py-10 sm:px-10">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-xl backdrop-blur">
            <Outlet />
          </div>
        </main>

      </div>
    </section>
  );
};

export default AuthLayout;