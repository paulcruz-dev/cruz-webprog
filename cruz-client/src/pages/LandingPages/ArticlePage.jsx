import Button from '../../components/Button';
import currents from '../../assets/currents.png';
import blurryface from '../../assets/blurryface.png';
import fml from '../../assets/fml.png';
import idiot from '../../assets/idiot.png';
 
const ArticlePage = () => {
    return (
        <div className="flex w-full flex-col gap-6">
            <section className="border-y-2 border-zinc-900 bg-zinc-900 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-100">
                    Articles
                </p>
                <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
                    Pol's favorite music albums.
                </h1>
                <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-100 sm:text-base">
                    Music does make things different
                </p>
                <div className="mt-6">
                    <Button to="/">Back Home</Button>
                </div>
            </section>
 
            <section className="border-y-2 border-zinc-900 bg-zinc-950 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-100">
                        Featured Articles (??)
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
                        Article card grid
                    </h2>
                </div>
 
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
                            <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100"/>
                        </div>
                        <img
                            src={blurryface}
                            alt="blurryface"
                            className="w-full h-full max-h-[200px] object-cover rounded-2xl"
                            />
                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            RANK 1
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                            Blurryface
                        </h3>
                        <Button className="mt-4">Read More</Button>
                    </article>
 
                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
                            <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100"/>
                        </div>
                        <img
                            src={fml}
                            alt="fml"
                            className="w-full h-full max-h-[200px] object-cover rounded-2xl"
                            />
                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            RANK 2
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                            FML
                        </h3>
                        <Button className="mt-4">Read More</Button>
                    </article>
 
                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
                            <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100"/>
                        </div>
                        <img
                            src={idiot}
                            alt="idiot"
                            className="w-full h-full max-h-[200px] object-cover rounded-2xl"
                            />
                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            RANK 3
                        </p>
                        <h3 className="mt2 text-lg font-semibold text-zinc-900">
                            American Idiot
                        </h3>
                        <Button className="mt-4">Read More</Button>
                    </article>
 
                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
                        </div>
                        <img
                            src={currents}
                            alt="currents"
                            className="w-full h-full max-h-[200px] object-cover rounded-2xl"
                            />
                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            RANK 4
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                            Currents
                        </h3>
                        <Button className="mt-4">Read More</Button>
                    </article>
                </div>
            </section>
        </div>
    );
};
 
export default ArticlePage;