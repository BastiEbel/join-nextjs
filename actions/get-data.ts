"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getCurrentUser() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("sessionId")?.value;

    if (!sessionId) return null;
    const res = await fetch(`${baseUrl}/api/auth/user`, {
      method: "GET",
      headers: {
        Cookie: `sessionId=${sessionId}`,
      },
      credentials: "include",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.user;
  } catch (e) {
    console.log(e);
  }
}

export async function getAllContacts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const user = await getCurrentUser();

    if (!user || !user.id) return [];
    const res = await fetch(`${baseUrl}/api/contacts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Id": user.id,
      },
      credentials: "include",
    });
    if (!res.ok) return [];
    const data = await res.json();
    revalidatePath("/contacts");
    return data.contacts;
  } catch (e) {
    console.log(e);
    return [];
  }
}
