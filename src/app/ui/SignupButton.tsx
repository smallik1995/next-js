import { useFormStatus } from "react-dom";

const SignupButton = () => {
  const { pending } = useFormStatus();

  return (
    <button aria-disabled={pending} type="submit">
      {pending ? "Submitting..." : "Sign up"}
    </button>
  );
};

export default SignupButton;
