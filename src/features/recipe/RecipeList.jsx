import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useRecipes } from "./useRecipes";
import Spinner from "../../components/Spinner";
import { DataGrid } from "@mui/x-data-grid";
import { useUser } from "../authentication/useUser";

function RecipeList() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { isAdmin, userId } = useUser();
  const { isLoading, recipes } = useRecipes(isAdmin, userId);

  if (isLoading) return <Spinner />;

  const columns = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
    },
    {
      field: "payment",
      headerName: "Payment Type",
      flex: 1,
    },
  ];

  if (isAdmin) {
    columns.push({
      field: "created_by_name",
      headerName: "Created By",
      flex: 1,
    });
  }

  return (
    <Box>
      <Box
        height="75vh"
        width="100%"
        sx={{
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            height: "5px",
          },
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },

          "& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeaders [role='row']":
            {
              backgroundColor: `${colors.blueAccent[700]} !important`,
              borderBottom: "none",
            },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={recipes} columns={columns} />
      </Box>
    </Box>
  );
}

export default RecipeList;
