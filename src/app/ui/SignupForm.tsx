"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import signup from "@/app/actions/auth";
import SignupButton from "./SignupButton";

const SignupForm = () => {
  const [state, action] = useFormState(signup, undefined);
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  // const handleSubmit = (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   const data = {
  //     username,
  //     password,
  //   };

  //   signup(data);
  // };

  return (
    <form action={action}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" placeholder="username" />
      </div>
      {state?.errors?.username && <p>{state.errors.username}</p>}
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <SignupButton />
    </form>
  );
};

export default SignupForm;
