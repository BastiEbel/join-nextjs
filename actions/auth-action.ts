import { redirect } from "next/navigation";

type FormState = {
  errors?: Record<string, string>;
  formData?: FormData | undefined;
  success?: boolean;
};

export async function signup(
  prevState: FormState,
  formData: FormData
): Promise<FormState | void> {
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const name = formData.get("name");
  const errors: Record<string, string> = {};

  if (
    typeof email !== "string" ||
    !email.includes("@") ||
    email.trim().length === 0
  ) {
    errors.email = "Please enter a valid email address";
  }

  if (typeof password !== "string" || password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }

  if (typeof confirmPassword !== "string" || confirmPassword !== password) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (typeof name !== "string" || name.length < 2) {
    errors.name = "Name must be at least 2 characters long";
  }
  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/auth/signup`, {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.ok) {
      return { success: true };
    } else {
      const data = await response.json();
      return { errors: data.errors || { general: "Signup failed" } };
    }
  } catch (e) {
    console.error("Signup error:", e);
    return { errors: { general: "Signup failed" } };
  }
}

export async function login(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email");
  const password = formData.get("password");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    return {
      errors: { email: "Login failed. Please check your credentials." },
    };
  }
  const data = await response.json();
  redirect("/summary");
  return data;
}

export async function auth(
  mode: "login" | "signup",
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  if (mode === "login") {
    return await login(prevState, formData);
  }
  return (await signup(prevState, formData)) as FormState;
}

export async function logout(): Promise<FormState> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.ok) {
    redirect("/");
  } else {
    return { errors: { general: "Logout failed" } };
  }
}
