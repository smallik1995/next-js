import { SignupFormSchema, FormState } from "@/app/lib/definitions";
import bcrypt from "bcryptjs";
import { createSession } from "../lib/session";

const signup = async (state: FormState, formData: FormData) => {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // 2. Prepare data for insertion into database
  const { email, password } = validatedFields.data;
  // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Insert the user into the database or call an Auth Library's API
  const data = await db
    .insert(users)
    .values({
      email,
      password: hashedPassword,
    })
    .returning({ id: users.id });

  const user = data[0];

  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  // 4. Create user session
  await createSession(user.id);
};

export default signup;
