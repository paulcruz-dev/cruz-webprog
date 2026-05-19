import Button from '../../components/Button.jsx';
import ArticleList from '../../components/ArticleList.jsx';
import articles from '../../data/article-content.js';
import music from '../../assets/music.jpg';

const ArticleListPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">

      <section className="border-b border-white/20 px-6 py-10 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
              Music Journal
            </p>

            <h1 className="max-w-xl text-4xl font-bold leading-tight sm:te
            xt-5xl">
              Stories Behind the Sound
            </h1>

            <p className="mt-4  max-w-lg text-sm leading-7 text-white/70 sm:text-base">
              Explore rhythm, blues, and everything in between. From artist
              spotlights to genre deep-dives, discover the music that shapes
              culture and emotion.
            </p>

            <div className="mt-6">
              <Button
                to="/"
                className="border border-white text-white hover:bg-white hover:text-black transition"
              >
                Back Home
              </Button>
            </div>
          </div>

          <div className="w-full h-64 sm:h-80 lg:h-full border border-white/20 rounded-2xl overflow-hidden">
            <img
              src={music}
              alt="music"
              className="w-full h-full object-cover hover:scale-105 transition duration-300"
            />
          </div>

        </div>
      </section>

      <section className="flex-1 px-6 py-10 lg:px-12">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
            Latest Drops
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            Music Articles
          </h2>

          <div className="mt-2 h-[1px] w-16 bg-white/30"></div>
        </div>

        <ArticleList articles={articles} />
      </section>

      <footer className="border-t border-white/20 px-6 py-10 lg:px-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          <div>
            <h3 className="text-lg font-semibold">Music Journal</h3>
            <p className="mt-3 text-sm text-white/60 leading-6">
              A space dedicated to rhythm, blues, and the stories behind every sound.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70">
              Explore
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-white/60">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/articles" className="hover:text-white transition">Articles</a></li>
              <li><a href="#" className="hover:text-white transition">Genres</a></li>
              <li><a href="#" className="hover:text-white transition">Artists</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70">
              Genres
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-white/60">
              <li>Hip-Hop</li>
              <li>R&B</li>
              <li>Indie</li>
              <li>Jazz</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70">
              Connect
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition">YouTube</a></li>
              <li><a href="#" className="hover:text-white transition">Email</a></li>
            </ul>
          </div>

        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Music Journal. All rights reserved.
        </div>
      </footer>

    </div>
  );
};

export default ArticleListPage;