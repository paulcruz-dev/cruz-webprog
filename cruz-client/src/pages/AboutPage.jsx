import Button from '../components/Button';
import rock from '../assets/rock.png';
import green from '../assets/green.jpg';
import top from '../assets/top.jpg';
import impala from '../assets/impala.jpg';
import seventeen from '../assets/seventeen.jpg';
 
const AboutPage = () => {
    return (
        <div className="flex w-full flex-col gap-6">
            <section className="border-y-2 border-zinc-900 bg-zinc-900 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                    <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-900 p-6">
                        <div className="flex min-h-72 items-center justify-center rounded-[1.25rem] bg-zinc-200">
                            <div className="h-28 w-28 rounded-full borded-2 border-zinc-300 bg-zinc-100"/>
                            <img
                                src={rock}
                                alt="rock"
                                className="w-full h-full max-h-[400px] object-cover rounded-2xl"
                                />
                        </div>
                    </div>
 
                    <div>
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-100">
                            About Section
                        </p>
                       <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
                            Life is hard, but music makes it a movie. 
                        </h1>
                        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-100 sm:text-base">
                            Rhythm and blues runs into my veins.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Button to="/" variant="primary">
                                Back Home
                            </Button>
                            <Button to="/articles">Open Articles</Button>
                        </div>
                    </div>
                </div>
            </section>
 
            <section className="border-y-2 border-zinc-900 bg-zinc-900 px-4 py-6 sm:px-6 sm:-py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        Profile Overview
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
                        Quick Summary ng music taste ni pol
                    </h2>
                </div>
 
                <div className="grid-gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div clasName="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">05</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-100">
                            Favorite Bands
                        </p>
                    </div>
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">Green Day</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-900">
                            RANK 1
                        </p>
                    </div>
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">Twenty One Pilots</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-900">
                            RANK 2
                        </p>
                    </div>
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">Tame Impala</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-900">
                            RANK 3
                        </p>
                    </div>
                </div>
            </section>
 
            <section className="border-y-2 border-zinc-900 bg-zinc-900 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-100">
                            Favorites
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
                            Favorite Music
                        </h2>
 
                        <div className="mt-6 space-y-4">
                            <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                                <h3 className="text-lg font-semibold text-zinc-900">
                                    Drag Path
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-zinc-600">
                                    Can you find me?
                                </p>
                            </article>
 
                            <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                                <h3 className="text-lg font-semibold text-zinc-900">
                                    Disenchanted
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-zinc-600">
                                    You're just a sad song with nothing to say.
                                </p>
                            </article>
 
                            <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                                <h3 className="text-lg font-semibold text-zinc-900">
                                    Cheers To Youth
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-zinc-600">
                                    It's my first time living.
                                </p>
                            </article>

                        </div>
                    </div>
 
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                            Favorite Bands
                        </p>
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200">
                                <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
                                <img
                                src={green}
                                alt="green"
                                className="w-full h-full max-h-[400px] object-cover rounded-2xl"
                                />
                            </div>
                            <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200">
                                <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
                                <img
                                src={top}
                                alt="top"
                                className="w-full h-full max-h-[400px] object-cover rounded-2xl"
                                />
                            </div>
                            <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200">
                                <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
                                <img
                                src={impala}
                                alt="impala"
                                className="w-full h-full max-h-[400px] object-cover rounded-2xl"
                                />
                            </div>
                            <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200">
                                <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
                                <img
                                src={seventeen}
                                alt="seventeen"
                                className="w-full h-full max-h-[400px] object-cover rounded-2xl"
                                />
                            </div>
                        </div>
                        <button className="mt-5">View Section</button>
                    </div>
                </div>
            </section>
        </div>
    );
};
 
export default AboutPage;