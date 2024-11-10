import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useState } from "react";
import { useRecipes } from "./useRecipes";
import Spinner from "../../components/Spinner";
import { DataGrid } from "@mui/x-data-grid";

function RecipeList() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { isLoading, recipes } = useRecipes();

  if (isLoading) return <Spinner />;

  const columns = [
    {
      field: "date",
      headerName: "Date",
    },
    {
      field: "amount",
      headerName: "Amount",
    },
    {
      field: "payment",
      headerName: "Payment Type",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Box
        height="auto"
        sx={{
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
        <DataGrid rows={recipes} columns={columns} hideFooter={true} />
      </Box>
    </Box>
  );
}

export default RecipeList;
