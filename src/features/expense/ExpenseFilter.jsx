import {
  Box,
  Button,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { useSummery } from "../dashboard/useSummery";
import { useUser } from "../authentication/useUser";
import { useTeam } from "../authentication/useTeam";
import { useExpenseFilter } from "./ExpenseFilterContext";
import { useEffect } from "react";

function ExpenseFilter() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const { isAdmin, userId } = useUser();
  const { users } = useTeam();
  const { data } = useSummery(isAdmin, userId);
  const {
    month,
    setMonth,
    totalExpense,
    cashOnHand,
    selectedUser,
    setSelectedUser,
  } = useExpenseFilter();

  useEffect(() => {
    if (!isAdmin && users?.users?.length > 0) {
      setSelectedUser(userId);
    }
  }, [isAdmin, userId, users, setSelectedUser]);

  const usersData = users?.users;
  const currentUser = isAdmin ? "all" : userId;
  const summery = data?.map((summary, i) => ({
    ...summary,
    id: i,
  }));

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

export default ExpenseFilter;
