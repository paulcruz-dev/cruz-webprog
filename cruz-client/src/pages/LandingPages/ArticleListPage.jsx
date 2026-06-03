import { useEffect, useState } from "react";
import { fetchPublishedArticles } from "../../services/ArticleService";
import { Link } from "react-router-dom";

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const { data } = await fetchPublishedArticles();
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };
    loadArticles();
  }, []);

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <p className="text-sm text-zinc-400 uppercase tracking-widest">Loading articles...</p>
      </div>
    );

  if (articles.length === 0)
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <p className="text-sm text-zinc-500 uppercase tracking-widest">No articles available.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-10 border-b border-zinc-800 pb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            Latest Posts
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white">
            Articles
          </h1>
        </div>

        {/* GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article._id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition duration-300 hover:-translate-y-1 hover:border-zinc-600 hover:shadow-xl"
            >
              {/* IMAGE */}
              {article.image && (
                <div className="h-44 w-full overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
              )}

              {/* BODY */}
              <div className="flex flex-1 flex-col p-5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400">
                  {article.category}
                </p>
                <h2 className="mt-2 text-base font-semibold leading-snug text-white">
                  {article.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-zinc-400 line-clamp-3">
                  {article.content}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-zinc-500">By {article.author}</p>
                  <Link
                    to={`/articles/${article._id}`}
                    className="rounded-full border border-zinc-600 px-4 py-1.5 text-xs uppercase tracking-wider text-zinc-300 transition hover:bg-white hover:text-black"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ArticleListPage;