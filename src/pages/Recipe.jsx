import { Box, Button, useTheme } from "@mui/material";
import CreateRecipeForm from "../features/recipe/CreateRecipeForm";
import RecipeList from "../features/recipe/RecipeList";
import { useState } from "react";
import { tokens } from "../theme";
import Heading from "../components/Heading";

function Recipe() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Heading title="Recipe" subtitle="List of all Recipe" />
        <Button
          sx={{
            height: "40px",
            backgroundColor: colors.blueAccent[500],
            color: colors.grey[100],
          }}
          type="submit"
          color="info"
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Create New Recipe
        </Button>
      </Box>

      <CreateRecipeForm open={open} setOpen={setOpen} />
      <RecipeList />
    </Box>
  );
}

export default Recipe;
