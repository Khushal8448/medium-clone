import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="grid  h-screen  w-full font-sans lg:grid-cols-2 lg:grid-rows-1">
      <div className="flex flex-col items-center justify-center justify-self-stretch">
        <div className="w-96 text-center">
          <h1 className="mb-3 text-4xl font-bold">Create an account</h1>
          <h4>
            Already have an account?{" "}
            <Link className="underline hover:text-blue-500" to="/signin">
              Login
            </Link>
          </h4>

          <form className="mt-6 flex flex-col gap-3">
            <div className="flex flex-col gap-1 text-start">
              <label className="ml-1 text-base font-semibold">Firstname</label>
              <input
                className="rounded-md border px-3 py-1 text-lg tracking-wider"
                placeholder="Firstname"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1 text-start">
              <label className="ml-1 text-base font-semibold">Lastname</label>
              <input
                className="rounded-md border px-3 py-1 text-lg tracking-wider"
                placeholder="Lastname"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1 text-start">
              <label className="ml-1 text-base font-semibold">Email</label>
              <input
                className="rounded-md border px-3 py-1 text-lg tracking-wider"
                placeholder="Email"
                type="email"
              />
            </div>
            <div className="flex flex-col gap-1 text-start">
              <label className="ml-1 text-base font-semibold">Password</label>
              <input
                className="rounded-md border px-3 py-1 text-lg tracking-wider"
                placeholder="Password"
                type="password"
              />
            </div>
            <button
              type="submit"
              className="mt-2 rounded-lg bg-slate-900 py-2 font-semibold tracking-wide text-white hover:bg-slate-800 hover:shadow-md"
            >
              Sign Up
            </button>
            <button
              type="submit"
              className="mt-2 rounded-lg bg-red-700 py-2 font-semibold tracking-wide text-white hover:bg-red-600 hover:shadow-md"
            >
              Google
            </button>
          </form>
        </div>
      </div>
      <div className="flex items-center justify-center justify-self-stretch bg-slate-200 max-lg:hidden">
        <div className="flex flex-col items-center justify-center px-28">
          <p className="text-2xl font-bold tracking-wide">
            "The customer service i received was exceptional. The support team
            went above and beyoud to address my concerns."
          </p>
          <p className="mt-4 self-start text-xl font-semibold">
            Jules Winnfield
          </p>
          <p className="self-start font-semibold text-slate-600">
            CEO, Acme Inc.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
