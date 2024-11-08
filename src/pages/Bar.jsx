import { Box } from "@mui/material";
import Heading from "../components/Heading";
import BarChart from "../features/dashboard/BarChart";

const Bar = () => {
  return (
    <Box m="20px">
      <Heading title="Bar Chart" subtitle="Simple Bar Chart" />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};

export default Bar;
