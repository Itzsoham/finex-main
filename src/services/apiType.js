import supabase from "./supabase";

export async function addEditType(type, id) {
  let query = supabase.from("Type");

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
  // Step 1: Fetch types with the created_by field
  const { data, error: typeError } = await supabase.from("Type").select("*");

  if (typeError) {
    console.error(typeError);
    throw new Error("Failed to fetch types");
  }

  return data;
}

export async function deleteType(id) {
  const { error } = await supabase.from("Type").delete().match({ id });

  if (error) {
    console.error(error);
    throw new Error("Failed to delete type");
  }
}
