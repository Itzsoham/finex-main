import {
  Box,
  Button,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { tokens } from "../../theme";
import { useSummery } from "../dashboard/useSummery";
import { useUser } from "../authentication/useUser";
import { useTeam } from "../authentication/useTeam";
import { useMonthlySummeryData } from "../dashboard/useMonthlySummeryData";

function ExpenseFilter({ selectedUser, setSelectedUser, month, setMonth }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const { isAdmin, userId } = useUser();
  const { users } = useTeam();
  const { data } = useSummery(isAdmin, userId);

  const [totalExpense, setTotalExpense] = useState(0);
  const [cashOnHand, setCashOnHand] = useState(0);

  const { data: monthlyData } = useMonthlySummeryData(selectedUser, month);

  const usersData = users?.users;
  const currentUser = isAdmin ? "all" : userId;
  const summery = data?.map((summary, i) => ({
    ...summary,
    id: i,
  }));

  useEffect(() => {
    if (monthlyData?.length > 0) {
      const expense = monthlyData[0]; // Assuming one record per user per month
      setTotalExpense(expense.total_expense || 0);
      setCashOnHand(expense.balance_at_end || 0);
    } else {
      setTotalExpense(0);
      setCashOnHand(0);
    }
  }, [monthlyData]);

  useEffect(() => {
    if (selectedUser === "all") {
      setSelectedUser(currentUser);
    }

    if (selectedUser === "all" || month === "all") {
      setTotalExpense(0);
      setCashOnHand(0);
    }
  }, [
    selectedUser,
    setSelectedUser,
    month,
    currentUser,
    totalExpense,
    cashOnHand,
  ]);

  return (
    <Box display="flex" alignItems="flex-end" gap="10px">
      <Box display="flex" flexDirection="column">
        <InputLabel id="users">Users</InputLabel>
        <Select
          variant="outlined"
          sx={{
            height: "40px",
            width: "150px",
            backgroundColor: colors.blueAccent[500],
            color: colors.grey[100],
          }}
          labelId="users"
          name="users"
          defaultValue={currentUser}
          value={selectedUser}
          disabled={!isAdmin}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          {usersData?.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.user_metadata.fullName}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box display="flex" flexDirection="column">
        <InputLabel id="month">Month</InputLabel>
        <Select
          variant="outlined"
          sx={{
            height: "40px",
            width: "150px",
            backgroundColor: colors.blueAccent[500],
            color: colors.grey[100],
          }}
          labelId="month"
          name="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          {summery?.map((month, i) => (
            <MenuItem key={i} value={month.month}>
              {month.month}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box display="flex" flexDirection="column">
        <InputLabel id="amount">Total Expense</InputLabel>
        <InputBase
          variant="outlined"
          type="number"
          label="Amount"
          name="amount"
          disabled={true}
          value={totalExpense}
          onChange={(e) => setTotalExpense(e.target.value)}
          sx={{
            height: "40px",
            width: "150px",
            padding: "0 10px",

            borderRadius: "3px",
            backgroundColor: colors.blueAccent[500],
            color: colors.grey[100],
          }}
        />
      </Box>

      <Box display="flex" flexDirection="column">
        <InputLabel id="cash">Cash On Hand</InputLabel>
        <InputBase
          variant="outlined"
          type="number"
          label="cash"
          name="cash"
          disabled={true}
          value={cashOnHand}
          onChange={(e) => setCashOnHand(e.target.value)}
          sx={{
            height: "40px",
            width: "150px",
            padding: "0 10px",

            borderRadius: "3px",
            backgroundColor: colors.blueAccent[500],
            color: colors.grey[100],
          }}
        />
      </Box>

      <Button
        sx={{
          height: "40px",
          backgroundColor: colors.blueAccent[500],
          color: colors.grey[100],
        }}
        type="submit"
        color="info"
        variant="contained"
        onClick={() => navigate("/add")}
      >
        Create New Expense
      </Button>
    </Box>
  );
}

ExpenseFilter.propTypes = {
  selectedUser: PropTypes.string,
  setSelectedUser: PropTypes.func,
  month: PropTypes.string,
  setMonth: PropTypes.func,
};

export default ExpenseFilter;
