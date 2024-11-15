import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import PropTypes from "prop-types";

const StatBox = ({ title, subtitle, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" display="flex" m="0 30px">
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Box>{icon}</Box>
        <Box>
          <Typography
            variant="h5"
            sx={{ color: colors.greenAccent[500], marginTop: "5px" }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        marginLeft="10px"
        justifyContent="center"
        alignItems="center"
        flex="1"
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{ color: colors.grey[100] }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

StatBox.propTypes = {
  title: PropTypes.number,
  subtitle: PropTypes.string,
  icon: PropTypes.element,
};

export default StatBox;
