import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button";
import { createUser } from "../../services/UserService";

const inputClasses =
  "mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500";

const actionButtonClassName =
  "w-full rounded-xl py-3 text-xs font-semibold tracking-widest bg-indigo-600 hover:bg-indigo-500 text-white transition";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    contactNumber: "",
    email: "",
    username: "",
    password: "",
    address: "",
    type: "viewer",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await createUser(formData);

      navigate("/auth/signin");
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed"
      );
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Create Account
      </h1>

      <p className="mt-3 text-sm text-zinc-400">
        Join and start your journey today.
      </p>

      <form
        onSubmit={handleSignup}
        className="mt-8 space-y-5"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm text-zinc-300">
              First Name
            </label>

            <input
              type="text"
              name="firstName"
              placeholder="John"
              className={inputClasses}
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm text-zinc-300">
              Last Name
            </label>

            <input
              type="text"
              name="lastName"
              placeholder="Doe"
              className={inputClasses}
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-zinc-300">
            Age
          </label>

          <input
            type="text"
            name="age"
            placeholder="21"
            className={inputClasses}
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-sm text-zinc-300">
            Gender
          </label>

          <select
            name="gender"
            className={inputClasses}
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-zinc-300">
            Contact Number
          </label>

          <input
            type="text"
            name="contactNumber"
            placeholder="09123456789"
            className={inputClasses}
            value={formData.contactNumber}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-sm text-zinc-300">
            Address
          </label>

          <input
            type="text"
            name="address"
            placeholder="Your address"
            className={inputClasses}
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-sm text-zinc-300">
            Username
          </label>

          <input
            type="text"
            name="username"
            placeholder="johndoe"
            className={inputClasses}
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-sm text-zinc-300">
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className={inputClasses}
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-sm text-zinc-300">
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="••••••••"
            className={inputClasses}
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          className={actionButtonClassName}
        >
          CREATE ACCOUNT
        </button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button variant="secondary">Google</Button>
          <Button variant="secondary">Apple</Button>
        </div>
      </form>

      <p className="mt-8 text-sm text-zinc-400">
        Already have an account?{" "}
        <Link
          to="/auth/signin"
          className="text-indigo-400 hover:text-indigo-300 font-medium"
        >
          Sign in
        </Link>
      </p>
    </>
  );
};

export default SignUpPage;