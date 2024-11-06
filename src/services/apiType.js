import supabase from "./supabase";

export async function addEditType(type, id) {
  let query = supabase.from("Type");

  // create type
  if (!id) query = await query.insert([type]).select();

  // update type
  if (id) query = query.update({ ...type }).eq("id", id);

  const { data, error } = await query.select().single(); // Keep a single select() call here

  if (error) {
    console.error(error);
    throw new Error("Failed to add type");
  }

  return data;
}

export async function getAllTypes() {
  // Step 1: Fetch types with the created_by field
  const { data: types, error: typeError } = await supabase
    .from("Type")
    .select("id, name, created_by");

  if (typeError) {
    console.error(typeError);
    throw new Error("Failed to fetch types");
  }

  // Step 2: Fetch all users with the Admin API
  const { data: userData, error: userError } =
    await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });

  if (userError) {
    console.error(userError);
    throw new Error("Failed to fetch users");
  }

  // Step 3: Map user IDs to names for easy lookup
  const userMap = userData.users.reduce((acc, user) => {
    acc[user.id] = user.user_metadata.fullName; // Adjust to whatever field has the display name
    return acc;
  }, {});

  // Step 4: Combine types data with user names
  const typesWithUserNames = types.map((type) => ({
    ...type,
    created_by_name: userMap[type.created_by] || "Unknown", // Attach user name or 'Unknown' if not found
  }));

  return typesWithUserNames;
}

export async function deleteType(id) {
  const { error } = await supabase.from("Type").delete().match({ id });

  if (error) {
    console.error(error);
    throw new Error("Failed to delete type");
  }
}
