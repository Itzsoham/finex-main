import PropsType from "prop-types";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";
import { Box } from "@mui/material";
import Spinner from "./Spinner";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1> Get authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2> if user is not authenticated, redirect to login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // 3> while loading show the spinner
  if (isLoading)
    return (
      <Box
        height={"100vh"}
        width={"100vw"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Spinner />
      </Box>
    );

  // 4> if user is authenticated, render the App

  if (isAuthenticated) return children;
}

ProtectedRoute.propTypes = {
  children: PropsType.node.isRequired,
};

export default ProtectedRoute;
