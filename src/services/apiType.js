import neon from "./neon";

export async function addEditType(type, id) {
  let query = neon.from("Type");

  // Create type
  if (!id) {
    const { data, error } = await query.insert([type]).select().single(); // single() to get one result
    if (error) {
      console.error(error);
      throw new Error("Failed to add type");
    }
    return data;
  }

  // Update type
  if (id) {
    const { data, error } = await query
      .update({ ...type })
      .eq("id", id)
      .select()
      .single();
    if (error) {
      console.error(error);
      throw new Error("Failed to update type");
    }
    return data;
  }
}

export async function getAllTypes() {
  const { data, error } = await neon.from("Type").select("*");

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch types");
  }

  return data;
}

export async function deleteType(id) {
  const { error } = await neon.from("Type").delete().match({ id });

  if (error) {
    console.error(error);
    throw new Error("Failed to delete type");
  }
}
