import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useUser } from "../features/authentication/useUser";
import { useMonthlySummeryData } from "../features/dashboard/useMonthlySummeryData";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SavingsIcon from "@mui/icons-material/Savings";
import Heading from "../components/Heading";
import StatBox from "../features/dashboard/StatBox";
import LineChart from "../features/dashboard/LineChart";
import Spinner from "../components/Spinner";
import PieChart from "../features/dashboard/PieChart";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { isAdmin, userId } = useUser();

  const currentUser = isAdmin ? "all" : userId;

  const { data, isLoading } = useMonthlySummeryData(currentUser, "all");

  if (isLoading) <Spinner />;

  const openingAmount = 0;
  const recipeAmount = data
    ?.map((item) => item.total_recipe)
    ?.reduce((a, b) => a + b, 0);
  const expenseAmount = data
    ?.map((item) => item.total_expense)
    ?.reduce((a, b) => a + b, 0);
  const closingAmount = recipeAmount ? recipeAmount - expenseAmount : 0;

  return (
    <Box m="20px" height="100%">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Heading title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={openingAmount}
            subtitle="Opening Amount"
            icon={
              <AccountBalanceWalletIcon
                sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={recipeAmount}
            subtitle="Recipe Amount"
            progress={parseInt(0.79)} // Passed as number
            icon={
              <CreditCardIcon
                sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={expenseAmount}
            subtitle="Total Expenses"
            icon={
              <ShoppingCartIcon
                sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={closingAmount}
            subtitle="Cash on Hand"
            icon={
              <SavingsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          height="400px"
          backgroundColor={colors.primary[400]}
          pl="30px"
        >
          <Box height="350px">
            <LineChart isdashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          height="400px"
          display="flex"
          backgroundColor={colors.primary[400]}
          justifyContent="center"
          alignItems="center"
          p="5px"
          pt="50px"
        >
          <PieChart isdashboard={true} />
        </Box>

        {/* ROW 3 */}
      </Box>
    </Box>
  );
};

export default Dashboard;
