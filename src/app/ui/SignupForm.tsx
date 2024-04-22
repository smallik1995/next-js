"use client";

import { useFormState } from "react-dom";
import signup from "@/app/actions/auth";
import SignupButton from "@/app/ui/SignupButton";

const SignupForm = () => {
  const [state, action] = useFormState(signup, undefined);

  return (
    <form action={action}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" placeholder="Email" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}

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
