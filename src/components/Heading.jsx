import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import PropsType from "prop-types";

const Heading = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
        textTransform={"uppercase"}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

Heading.propTypes = {
  title: PropsType.string,
  subtitle: PropsType.string,
};

export default Heading;
