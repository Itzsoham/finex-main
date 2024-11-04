import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Heading from "../components/Heading";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataTeam } from "../data/mockData";

function Team() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      <Heading title="Team" subtitle="Manage your team members" />
      <Box>
        <DataGrid rows={mockDataTeam} />
      </Box>
    </Box>
  );
}

export default Team;
