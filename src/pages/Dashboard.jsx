import { Box, Button, Typography, useTheme } from "@mui/material";
import { useState } from "react";
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
import RecipeList from "../features/recipe/RecipeList";
import CreateRecipeForm from "../features/recipe/CreateRecipeForm";
import { getCurrentMonthFormatted } from "../services/helpers";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const { isAdmin, userId } = useUser();

  const currentUser = isAdmin ? "all" : userId;

  const { data, isLoading } = useMonthlySummeryData(
    currentUser,
    getCurrentMonthFormatted()
  );

  if (isLoading) <Spinner />;

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
            title={data?.[0]?.balance_before}
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
            title={data?.[0]?.total_recipe}
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
            title={data?.[0]?.total_expense}
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
            title={data?.[0]?.balance_at_end}
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
          gridColumn="span 8"
          gridRow="span 2"
          height="400px"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          ></Box>
          <Box height="350px" m="-20px 0 0 0">
            <LineChart isDashboard={true} /> {/* Corrected prop */}
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          height="400px"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recipe List
            </Typography>
            <Button
              sx={{
                height: "33px",
                backgroundColor: colors.blueAccent[500],
                color: colors.grey[100],
                fontSize: "10px",
              }}
              type="submit"
              color="info"
              variant="contained"
              onClick={() => setOpen(true)}
            >
              Create New Recipe
            </Button>
          </Box>
          <CreateRecipeForm open={open} setOpen={setOpen} />
          <RecipeList />
        </Box>

        {/* ROW 3 */}
      </Box>
    </Box>
  );
};

export default Dashboard;
