import { Link } from 'react-router-dom';

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {articles.map((article, index) => (
        <div
          key={article.name}
          className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-900 p-4 transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:shadow-xl"
        >
          {/* IMAGE */}
          <div className="mb-4 h-40 w-full overflow-hidden rounded-xl bg-zinc-800">
            <img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          </div>

          {/* META */}
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
            Article {String(index + 1).padStart(2, '0')}
          </p>

          {/* TITLE */}
          <h3 className="mt-2 text-lg font-semibold leading-snug text-white">
            {article.title}
          </h3>

          {/* DESCRIPTION */}
          <p className="mt-2 text-sm leading-6 text-white/60 line-clamp-3">
            {article.content[0]}
          </p>

          {/* BUTTON */}
          <Link
            to={`/articles/${article.name}`}
            className="mt-4 inline-block w-fit rounded-full border border-white/30 px-4 py-2 text-xs uppercase tracking-wider text-white transition hover:bg-white hover:text-black"
          >
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;