import neon from "./neon";
import { uploadImage } from "./cloudinary";

export async function signup({ fullName, email, password, role, phone }) {
  const { data, error } = await neon.auth.signUp({
    email,
    password,
    options: {
      data: { fullName, avtar: "", role, phone },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await neon.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await neon.auth.getSession();

  if (!session?.session) return null;

  const { data, error } = await neon.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logout() {
  const { error } = await neon.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({ fullName, avatar, phone, password }) {
  // 1 - Update name / phone / password
  const updateData = { data: {} };
  if (phone) updateData.data.phone = phone;
  if (fullName) updateData.data.fullName = fullName;
  if (password) updateData.password = password;

  const { data, error } = await neon.auth.updateUser(updateData);

  if (error) {
    throw new Error(error.message);
  }

  // 2 - Upload avatar to Cloudinary (Neon has no storage) and save its URL
  if (avatar) {
    const avatarUrl = await uploadImage(avatar);

    const { data: updatedUser, error: updateError } = await neon.auth.updateUser({
      data: { avatar: avatarUrl },
    });

    if (updateError) {
      throw new Error(updateError.message);
    }

    return updatedUser;
  }

  return data;
}

// Maps created_by (uuid) -> display name. The Neon Auth user table lives in the
// neon_auth schema, which the Data API doesn't expose, so we can't read names
// from the browser yet. Returns {} for now (creator shows "Unknown"); to enable
// real names later, add a public.profiles table populated on signup and read it
// here. Imported rows reference old Supabase ids and will be "Unknown" regardless.
export async function getUsersMap() {
  return {};
}

// Team list — deferred (needs server-side admin / a profiles table).
export async function getAllUsers() {
  return { users: [] };
}

// Deleting users requires server-side admin access in Neon Auth, which isn't
// available from the browser. Team management is deferred for now.
export async function deleteUser() {
  throw new Error(
    "Deleting users isn't available yet (Neon Auth admin delete is server-side)."
  );
}
