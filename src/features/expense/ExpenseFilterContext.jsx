import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useMonthlySummeryData } from "../dashboard/useMonthlySummeryData";

const ExpenseFilterContext = createContext();

function ExpenseFilterProvider({ children }) {
  const [totalExpense, setTotalExpense] = useState(0);
  const [cashOnHand, setCashOnHand] = useState(0);
  const [selectedUser, setSelectedUser] = useState("all");
  const [month, setMonth] = useState("all");

  const { data } = useMonthlySummeryData(selectedUser, month);

  useEffect(() => {
    if (data?.length > 0) {
      const recipeAmount = data
        ?.map((item) => item.total_recipe)
        ?.reduce((a, b) => a + b, 0);
      const expenseAmount = data
        ?.map((item) => item.total_expense)
        ?.reduce((a, b) => a + b, 0);
      const closingAmount = recipeAmount ? recipeAmount - expenseAmount : 0;

      setTotalExpense(expenseAmount);
      setCashOnHand(closingAmount);
    } else {
      setTotalExpense(0);
      setCashOnHand(0);
    }
  }, [data, setCashOnHand, setTotalExpense]);

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
