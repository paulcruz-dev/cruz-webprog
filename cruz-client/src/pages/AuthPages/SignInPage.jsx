import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../../components/Button';
import { loginUser } from '../../services/UserService';

const inputClasses =
  'mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500';

const actionButtonClassName =
  'w-full rounded-xl py-3 text-xs font-semibold tracking-widest bg-indigo-600 hover:bg-indigo-500 text-white transition';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginUser({ email, password });

      if (data.type === 'viewer') {
        setError('Viewers are not allowed to log in.');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('firstName', data.firstName);
      localStorage.setItem('type', data.type);

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Welcome Back
      </h1>
      <p className="mt-3 text-sm text-zinc-400">
        Log in to continue your experience.
      </p>

      <form onSubmit={handleLogin} className="mt-8 space-y-5">
        <div>
          <label className="text-sm text-zinc-300">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className={inputClasses}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-zinc-300">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className={inputClasses}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-zinc-400">
            <input type="checkbox" className="accent-indigo-500" />
            Remember me
          </label>
          <button type="button" className="text-indigo-400 hover:text-indigo-300">
            Forgot?
          </button>
        </div>

        <button type="submit" className={actionButtonClassName}>
          SIGN IN
        </button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button variant="secondary">Google</Button>
          <Button variant="secondary">Apple</Button>
        </div>
      </form>

      <p className="mt-8 text-sm text-zinc-400">
        No account yet?{' '}
        <Link
          to="/auth/signup"
          className="text-indigo-400 hover:text-indigo-300 font-medium"
        >
          Create one
        </Link>
      </p>
    </>
  );
};

export default SignInPage;