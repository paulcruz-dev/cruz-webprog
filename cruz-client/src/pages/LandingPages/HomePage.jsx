import Button from '../../components/Button';

import heroImg from '../../assets/hero.png';
import card1 from '../../assets/card1.png';
import card2 from '../../assets/card2.png';
import card3 from '../../assets/card3.png';

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">

      {/* HERO SECTION */}
      <section className="border-y border-zinc-200 bg-zinc-900 px-4 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Meow Section
            </p>

            <h1 className="max-w-xl text-3xl font-semibold text-zinc-900 sm:text-4xl">
              Welcome to Meow Meow Meow Meow
            </h1>

            <p className="mt-4 max-w-lg text-sm text-zinc-100 sm:text-base">
              I love cats.
            </p>

            <div className="mt-6">
              <Button to="/about" variant="primary">
                Learn More
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl">
            <img
              src={heroImg}
              alt="Hero"
              className="h-full w-full object-cover"
            />
          </div>

        </div>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-900 px-4 py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-900">
            KPI Section
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Quick overview blocks
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: "12", label: "Projects" },
            { value: "08", label: "Sections" },
            { value: "24", label: "Screens" },
            { value: "04", label: "Layouts" },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-2xl font-semibold text-zinc-900">
                {item.value}
              </p>
              <p className="mt-2 text-xs uppercase tracking-widest text-zinc-900 font-semibold">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-900 px-4 py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-100">
            Feature Cards
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Music Taste ng mga Emo sa Social Media
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">

          <article className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <img src={card1} alt="Feature 1" className="h-40 w-full object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-zinc-900">
                RadioHead
              </h3>
              <p className="mt-2 text-sm text-zinc-600">
                Edgy boi final boss.
              </p>
              <Button className="mt-4" variant="primary">
                View More
              </Button>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <img src={card2} alt="Feature 2" className="h-40 w-full object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-zinc-900">
                The Smiths
              </h3>
              <p className="mt-2 text-sm text-zinc-600">
                500 Days of Summer fanboi.
              </p>
              <Button className="mt-4" variant="primary">
                View More
              </Button>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <img src={card3} alt="Feature 3" className="h-40 w-full object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-zinc-900">
                Gorillaz
              </h3>
              <p className="mt-2 text-sm text-zinc-600">
                'Ï wanna be different' ahh.
              </p>
              <Button className="mt-4" variant="primary">
                View More
              </Button>
            </div>
          </article>

        </div>
      </section>

    </div>
  );
};

export default HomePage;