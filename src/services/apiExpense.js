import supabase from "./supabase";

export async function addEditExpense(expense, id) {
  let query = supabase.from("Expense");

  // Create expense
  if (!id) {
    const { data, error } = await query.insert([expense]).select();

    if (error) {
      console.error(error);
      throw new Error("Failed to add expense");
    }

    if (data && data.length > 0) {
      return data[0]; // Return the inserted data if it exists
    } else {
      throw new Error("No data returned from insert");
    }
  }

  // Update expense
  if (id) {
    const { data, error } = await query
      .update({ ...expense })
      .eq("id", id)
      .select();

    if (error) {
      console.error(error);
      throw new Error("Failed to update expense");
    }

    if (data && data.length > 0) {
      return data[0]; // Return the updated data if it exists
    } else {
      throw new Error("No data returned from update");
    }
  }
}

export async function getAllExpenses() {
  // Step 1: Fetch types with the created_by field
  const { data: expenses, error: typeError } = await supabase
    .from("Expense")
    .select("*,type(name)");

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
  const expensessWithUserNames = expenses.map((expense) => ({
    ...expense,
    created_by_name: userMap[expense.created_by] || "Unknown", // Attach user name or 'Unknown' if not found
  }));

  return expensessWithUserNames;
}

export async function deleteExpense(id) {
  const { error } = await supabase.from("Expense").delete().match({ id });

  if (error) {
    console.error(error);
    throw new Error("Failed to delete type");
  }
}

export async function approveExpense(id) {
  const { error } = await supabase
    .from("Expense")
    .update({ status: "Approved" })
    .match({ id });

  if (error) {
    console.error(error);
    throw new Error("Failed to approve expense");
  }
}
