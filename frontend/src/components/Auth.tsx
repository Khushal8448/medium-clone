import { signupInput } from "@khushal_0111/medium-common";
import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInputs, setPostInputs] = useState<signupInput>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${type}`,
        postInputs,
      );
      console.log(res);
      const jwt = res.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      alert("Error while signing up");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center justify-self-stretch">
      <div className="w-96 text-center">
        <h1 className="mb-3 text-4xl font-bold">Create an account</h1>
        <h4>
          {type === "signup" ? "Already" : "Doesn't"} have an account?
          <Link
            className="underline hover:text-blue-500"
            to={type === "signup" ? "/signin" : "/signup"}
          >
            {" "}
            {type === "signup" ? "Login" : "SignUp"}
          </Link>
        </h4>

        <form className="mt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
          {type === "signup" && (
            <>
              <LableInput
                label="Firstname"
                inputType="text"
                value={postInputs.firstName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPostInputs((c) => ({ ...c, firstName: e.target.value }))
                }
                placeHolder="FirstName"
              />
              <LableInput
                label="Lastname"
                inputType="text"
                value={postInputs.lastName || ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPostInputs((c) => ({ ...c, lastName: e.target.value }))
                }
                placeHolder="Lastname"
              />
            </>
          )}
          <LableInput
            label="Email"
            inputType="email"
            value={postInputs.username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPostInputs((c) => ({ ...c, username: e.target.value }))
            }
            placeHolder="Email"
          />
          <LableInput
            label="Password"
            inputType="password"
            value={postInputs.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPostInputs((c) => ({ ...c, password: e.target.value }))
            }
            placeHolder="password"
          />

          <button
            type="submit"
            className="mt-2 rounded-lg bg-slate-900 py-2 font-semibold tracking-wide text-white hover:bg-slate-800 hover:shadow-md"
          >
            {type === "signup" ? "Sign Up" : "Sign In"}
          </button>
          <button className="mt-2 rounded-lg bg-red-700 py-2 font-semibold tracking-wide text-white hover:bg-red-600 hover:shadow-md">
            Google
          </button>
        </form>
      </div>
    </div>
  );
};

interface inputDataType {
  label: string;
  placeHolder: string;
  inputType: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LableInput({
  label,
  inputType,
  placeHolder,
  value,
  onChange,
}: inputDataType) {
  return (
    <div className="flex flex-col gap-1 text-start">
      <label className="ml-1 text-base font-semibold">{label}</label>
      <input
        value={value}
        onChange={onChange}
        className="rounded-md border px-3 py-1 text-lg tracking-wider"
        placeholder={placeHolder}
        type={inputType}
      />
    </div>
  );
}

export default Auth;
