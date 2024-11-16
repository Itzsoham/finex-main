import { ResponsiveLine } from "@nivo/line";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import PropTypes from "prop-types";
import { format, parseISO } from "date-fns";
import { useExpenses } from "../expense/useExpenses";
import Spinner from "../../components/Spinner";
import { useUser } from "../authentication/useUser";
import { Typography } from "@mui/material";

const processData = (expenses) => {
  const data = {};

  expenses.forEach((expense) => {
    const month = format(parseISO(expense.date), "MMM yyyy"); // Format date to 'MMM yyyy'
    const typeName = expense.type.name;

    if (!data[typeName]) {
      data[typeName] = [];
    }

    const monthData = data[typeName].find((entry) => entry.x === month);
    if (monthData) {
      monthData.y += expense.amount;
    } else {
      data[typeName].push({ x: month, y: expense.amount });
    }
  });

  return Object.keys(data).map((type) => ({
    id: type,
    data: data[type],
  }));
};

const LineChart = ({ isdashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { isLoading: isUserLoading, isAdmin, userId } = useUser();
  const { expenses, isLoading } = useExpenses(isAdmin, userId);

  if (isLoading || isUserLoading) return <Spinner />;

  // Check if expenses data is available and not empty
  const processedData =
    expenses && expenses.length > 0 ? processData(expenses) : [];

  if (processedData.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Typography variant="h4">No expenses data available</Typography>
      </Box>
    );
  }

  return (
    <ResponsiveLine
      data={processedData}
      theme={{
        axis: {
          domain: { line: { stroke: colors.grey[100] } },
          legend: { text: { fill: colors.grey[100] } },
          ticks: {
            line: { stroke: colors.grey[100], strokeWidth: 1 },
            text: { fill: colors.grey[100] },
          },
        },
        legends: { text: { fill: colors.grey[100] } },
        tooltip: {
          container: {
            color: colors.grey[800],
          },
        },
      }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -45,
        legend: isdashboard ? undefined : "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isdashboard ? undefined : "Amount",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      colors={{ scheme: "nivo" }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;

LineChart.propTypes = {
  isCustomLineColors: PropTypes.bool,
  isdashboard: PropTypes.bool,
};
