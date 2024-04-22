import { redirect } from "next/navigation";
import { createSession, deleteSession } from "../lib/session";
import { FormState, SignupFormSchema } from "../lib/definitions";
import API from "../helpers/api";
import { EMethod } from "../type";

const signup = async (state: FormState, formData: any) => {
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, password } = validatedFields.data;

  const userData = await API({
    method: EMethod.post,
    url: "auth/login",
    payload: { username, password },
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!userData) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  await createSession(userData?.userId);
};

export async function logout() {
  deleteSession();
}

export default signup;
