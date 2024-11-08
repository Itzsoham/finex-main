import { Box } from "@mui/material";
import Heading from "../components/Heading";
import LineChart from "../features/dashboard/LineChart";

const Line = () => {
  return (
    <Box m="20px">
      <Heading title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;
