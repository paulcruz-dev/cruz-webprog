import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white px-6 text-center">
      
      {/* MAIN CONTENT */}
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
          Track Not Found
        </p>

        <h1 className="mt-4 text-6xl font-black tracking-tight sm:text-7xl">
          404
        </h1>

        <p className="mt-6 text-sm leading-7 text-white/70 sm:text-base">
          Looks like this track has been removed, renamed, or never existed.
          Try heading back or explore other sounds in the collection.
        </p>

        {/* BUTTONS */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="border border-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] transition hover:bg-white hover:text-black"
          >
            Return Home
          </Link>

          <Link
            to="/articles"
            className="border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white/70 transition hover:border-white hover:text-white"
          >
            Browse Music
          </Link>
        </div>
      </div>

      <div className="mt-16 h-[1px] w-24 bg-white/20"></div>
    </div>
  );
}

export default NotFoundPage;