import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses =
  'mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500';

const actionButtonClassName =
  'w-full rounded-xl py-3 text-xs font-semibold tracking-widest bg-indigo-600 hover:bg-indigo-500 text-white transition';

const SignUpPage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Create Account
      </h1>
      <p className="mt-3 text-sm text-zinc-400">
        Join and start your journey today.
      </p>

      <form className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm text-zinc-300">First Name</label>
            <input type="text" placeholder="John" className={inputClasses} />
          </div>

          <div>
            <label className="text-sm text-zinc-300">Last Name</label>
            <input type="text" placeholder="Doe" className={inputClasses} />
          </div>
        </div>

        <div>
          <label className="text-sm text-zinc-300">Email</label>
          <input type="email" placeholder="you@example.com" className={inputClasses} />
        </div>

        <div>
          <label className="text-sm text-zinc-300">Password</label>
          <input type="password" placeholder="••••••••" className={inputClasses} />
          <p className="mt-2 text-xs text-zinc-500">
            Use at least 8 characters with symbols and numbers.
          </p>
        </div>

        <button type="submit" className={actionButtonClassName}>
          CREATE ACCOUNT
        </button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button variant="secondary">Google</Button>
          <Button variant="secondary">Apple</Button>
        </div>
      </form>

      <p className="mt-8 text-sm text-zinc-400">
        Already have an account?{' '}
        <Link to="/auth/signin" className="text-indigo-400 hover:text-indigo-300 font-medium">
          Sign in
        </Link>
      </p>
    </>
  );
};

export default SignUpPage;