import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import PropTypes from "prop-types";
import { tokens } from "../../theme";
import { useExpenses } from "../expense/useExpenses";

// Transform expenses data to be compatible with Nivo's Bar chart format
const processData = (expenses) => {
  const data = {};

  expenses.forEach((expense) => {
    const typeName = expense.type.name;
    const vendor = expense.vendor;

    if (!data[typeName]) {
      data[typeName] = { type: typeName };
    }
    if (!data[typeName][vendor]) {
      data[typeName][vendor] = 0;
    }
    data[typeName][vendor] += expense.amount;
  });

  return Object.values(data);
};

const BarChart = ({ isdahboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { expenses } = useExpenses();
  // console.log(expenses);
  // Check if expenses data is available and not empty
  const processedData =
    expenses && expenses.length > 0 ? processData(expenses) : [];
  // Get unique vendor names for the 'keys' array
  const vendors = [...new Set(expenses?.map((expense) => expense.vendor))];

  return (
    <ResponsiveBar
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
      keys={vendors} // Use vendor names as keys
      indexBy="type" // Group by type
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isdahboard ? undefined : "Type",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isdahboard ? undefined : "Amount",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
                backgroundColor: "pink",
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={(e) =>
        `${e.id}: ${e.formattedValue} for type: ${e.indexValue}`
      }
    />
  );
};

BarChart.propTypes = {
  isdahboard: PropTypes.bool,
};

export default BarChart;
