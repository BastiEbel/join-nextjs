import { getCurrentUser } from "./get-data";

type FormState = {
  errors?: { [key: string]: string };
};

export async function addNewContact(
  prevState: FormState,
  formData: FormData
): Promise<FormState | void> {
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const zipCode = formData.get("zipCode");

  if (
    typeof email !== "string" ||
    !email.includes("@") ||
    email.trim().length === 0
  ) {
    return { errors: { email: "Please enter a valid email address" } };
  }
  if (typeof name !== "string" || name.trim().length < 2) {
    return { errors: { name: "Name must be at least 2 characters long" } };
  }
  if (typeof phone !== "string" || phone.trim().length < 10) {
    return {
      errors: { phone: "Phone number must be at least 10 characters long" },
    };
  }
  if (typeof zipCode !== "string" || zipCode.trim().length === 0) {
    return { errors: { zipCode: "Zip code is required" } };
  }

  try {
    const user = await getCurrentUser();
    const userId = user?.id || "";
    if (!userId) {
      return { errors: { general: "User not authenticated" } };
    }
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/contacts`, {
      method: "POST",
      body: JSON.stringify({ name, email, phone, userId, zipCode }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const data = await response.json();
      return { errors: data.errors || { general: "Failed to add contact" } };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding contact:", error);
    return { errors: { general: "Failed to add contact" } };
  }
}
export async function deleteContact(contactId: string): Promise<void> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const user = await getCurrentUser();

    if (!user || !user.id) return;
    const response = await fetch(`${baseUrl}/api/contacts`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "User-Id": user.id,
        "Contact-Id": contactId,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to delete contact");
    }
  } catch (error) {
    console.error("Error deleting contact:", error);
  }
}
