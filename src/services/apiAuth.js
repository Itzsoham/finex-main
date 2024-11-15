import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password, role, phone }) {
  const { data, error } = await supabase.auth.admin.createUser({
    email, // User email
    password, // User password
    email_confirmed_at: new Date().toISOString(), // Marks email as confirmed

    user_metadata: {
      // Metadata to store additional information
      fullName,
      role,
      phone,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({ fullName, avatar, phone, password }) {
  // 1 - Update user fullName and phone
  const updateData = { data: {} };
  if (phone) updateData.data.phone = phone;
  if (fullName) updateData.data.fullName = fullName;
  if (password) updateData.password = password;

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    throw new Error(error.message);
  }

  // 2 - Upload avatar image if present
  if (avatar) {
    const fileName = `avatar-${data.user.id}-${Math.random()}`;
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, avatar);

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    // 3 - Update avatar URL in User
    const { data: updatedUser, error: updateError } =
      await supabase.auth.updateUser({
        data: {
          avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
        },
      });

    if (updateError) {
      throw new Error(updateError.message);
    }

    return updatedUser;
  }

  return data;
}

export async function getAllUsers() {
  const { data, error } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteUser(userId) {
  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    throw new Error(error.message);
  }
}
