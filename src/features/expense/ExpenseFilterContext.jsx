import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useMonthlySummeryData } from "../dashboard/useMonthlySummeryData";
import { useUser } from "../authentication/useUser";

const ExpenseFilterContext = createContext();

function ExpenseFilterProvider({ children }) {
  const [totalExpense, setTotalExpense] = useState(0);
  const [cashOnHand, setCashOnHand] = useState(0);
  const [selectedUser, setSelectedUser] = useState("all");
  const [month, setMonth] = useState("all");

  const { isAdmin, userId } = useUser();
  const { data } = useMonthlySummeryData(selectedUser, month);

  useEffect(() => {
    if (data?.length > 0) {
      const expense = data[0]; // Assuming one record per user per month
      setTotalExpense(expense.total_expense || 0);
      setCashOnHand(expense.balance_at_end || 0);
    } else {
      setTotalExpense(0);
      setCashOnHand(0);
    }
  }, [data, setCashOnHand, setTotalExpense]);

  useEffect(() => {
    if (selectedUser === "all" || month === "all") {
      setTotalExpense(0);
      setCashOnHand(0);
    }
  }, [
    selectedUser,
    setSelectedUser,
    isAdmin,
    userId,
    month,
    totalExpense,
    cashOnHand,
    setCashOnHand,
    setTotalExpense,
  ]);

  return (
    <ExpenseFilterContext.Provider
      value={{
        month,
        selectedUser,
        cashOnHand,
        totalExpense,
        setMonth,
        setSelectedUser,
      }}
    >
      {children}
    </ExpenseFilterContext.Provider>
  );
}

function useExpenseFilter() {
  const context = useContext(ExpenseFilterContext);
  if (!context) {
    throw new Error(
      "useExpenseFilter must be used within a ExpenseFilterProvider"
    );
  }
  return context;
}

export { ExpenseFilterProvider, useExpenseFilter };

ExpenseFilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
