import { Box } from "@mui/material";
import Heading from "../components/Heading";
import PieChart from "../features/dashboard/PieChart";

const Pie = () => {
  return (
    <Box m="20px">
      <Heading title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default Pie;
