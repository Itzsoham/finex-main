import neon from "./neon";
import { getUsersMap } from "./apiAuth";

export async function getFilteredExpenses(
  isAdmin,
  userId,
  selectedUser,
  selectedMonth
) {
  let query = neon.from("Expense").select("*,type(name)");

  // Apply filters based on isAdmin
  if (!isAdmin) {
    query = query.eq("created_by", userId); // Non-admin users can only fetch their data
    userId = selectedUser;
  }

  // Apply user filter if a specific user is selected
  if (selectedUser !== "all") {
    query = query.eq("created_by", selectedUser);
  }

  // Apply month filter if a specific month is selected
  if (selectedMonth !== "all") {
    // Split the selectedMonth (e.g., "Nov, 2024") into parts
    const [monthAbbr, year] = selectedMonth.split(", ");
    const monthNumber = new Date(`${monthAbbr} 1, ${year}`).getMonth(); // Convert to zero-indexed numeric month
    const startDate = new Date(year, monthNumber, 1); // Start of the selected month
    const endDate = new Date(year, monthNumber + 1, 1); // Start of the next month

    query = query.gte("date", startDate.toISOString().split("T")[0]); // Format as YYYY-MM-DD
    query = query.lt("date", endDate.toISOString().split("T")[0]); // Format as YYYY-MM-DD
  }

  const { data: expenses, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch filtered expenses");
  }

  // Map created_by -> user name via the Neon Auth synced users table.
  const userMap = await getUsersMap();

  const expensesWithUserNames = expenses.map((expense) => ({
    ...expense,
    created_by_name: userMap[expense.created_by] || "Unknown",
  }));

  return expensesWithUserNames;
}

export async function addEditExpense(expense, id) {
  let query = neon.from("Expense");

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

export async function deleteExpense(id) {
  const { error } = await neon.from("Expense").delete().match({ id });

  if (error) {
    console.error(error);
    throw new Error("Failed to delete type");
  }
}

export async function approveExpense(id) {
  const { error } = await neon
    .from("Expense")
    .update({ status: "Approved" })
    .match({ id });

  if (error) {
    console.error(error);
    throw new Error("Failed to approve expense");
  }
}
