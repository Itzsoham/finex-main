import { Box } from "@mui/material";
import Heading from "../components/Heading";

function Dashboard() {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Heading title="Dashboard" subtitle="Welcome to the Dashboard" />
      </Box>
    </Box>
  );
}

export default Dashboard;
