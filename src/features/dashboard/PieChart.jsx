import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useExpenses } from "../expense/useExpenses";
import PropTypes from "prop-types";
import Spinner from "../../components/Spinner";

const processData = (expenses) => {
  const data = {};

  expenses.forEach((expense) => {
    const typeName = expense.type.name;
    if (!data[typeName]) {
      data[typeName] = 0;
    }
    data[typeName] += expense.amount;
  });

  // Convert to array format compatible with ResponsivePie
  return Object.keys(data)?.map((key) => ({
    id: key,
    label: key,
    value: data[key],
  }));
};

const PieChart = ({ isdashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { expenses, isLoading } = useExpenses();

  if (isLoading) return <Spinner />;

  // Check if expenses data is available and not empty
  const processedData =
    expenses && expenses.length > 0 ? processData(expenses) : [];
  return (
    <ResponsivePie
      data={processedData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.grey[800],
          },
        },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={
        isdashboard
          ? []
          : [
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 10,
                itemWidth: 150,
                itemHeight: 18,
                itemTextColor: "#999",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                    },
                  },
                ],
              },
            ]
      }
    />
  );
};

PieChart.propTypes = {
  isdashboard: PropTypes.bool,
};

export default PieChart;
