import {
  Stack,
  styled,
  Typography,
  Box,
  FormControl,
  TextField,
  FormLabel,
  Button,
  Card as MuiCard,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../theme";
import { useLogin } from "../features/authentication/useLogin";
import * as yup from "yup";
import { Formik } from "formik";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  backgroundColor: theme.palette.mode === "dark" ? "#1F2A40" : "#fff",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0px 5px 15px rgba(20, 27, 45, 0.5), 0px 15px 35px -5px rgba(20, 27, 45, 0.08)"
      : "0px 5px 15px rgba(20, 27, 45, 0.05), 0px 15px 35px -5px rgba(20, 27, 45, 0.05)",
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  width: "100%",
  position: "relative",
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundColor: theme.palette.mode === "dark" ? "#0c122b" : "#f4f6f8",
  },
}));

export default function Login() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { isLoading, login } = useLogin();

  const handleSubmit = (values) => {
    login(values);
  };

  const checkoutSchema = yup.object().shape({
    email: yup.string().required("required"),
    password: yup.string().required("required"),
  });
  const initialValues = {
    email: "manager@test.com",
    password: "123456",
  };

  return (
    <SignInContainer direction="column" justifyContent="center">
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{
            width: "100%",
            fontSize: "clamp(2rem, 10vw, 2.15rem)",
            color: colors.primary[100],
          }}
        >
          Login into Finex
        </Typography>

        <Formik
          onSubmit={(values, actions) => {
            handleSubmit(values);
            actions.resetForm(); // Resets form after submission
          }}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            >
              <FormControl>
                <FormLabel
                  htmlFor="email"
                  sx={{
                    color: theme.palette.grey[300],
                  }}
                >
                  Email
                </FormLabel>
                <TextField
                  id="email"
                  type="email"
                  name="email"
                  value={values.email}
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email ? errors.email : ""}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  sx={{
                    input: { color: theme.palette.grey[100] },
                    ".MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: theme.palette.grey[500],
                      },
                      "&:hover fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.secondary.main,
                      },
                    },
                  }}
                />
              </FormControl>
              <FormControl>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <FormLabel
                    htmlFor="password"
                    sx={{
                      color: theme.palette.grey[300],
                    }}
                  >
                    Password
                  </FormLabel>
                </Box>
                <TextField
                  name="password"
                  value={values.password}
                  error={!!touched.password && !!errors.password}
                  helperText={
                    touched.password && errors.password ? errors.password : ""
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  fullWidth
                  variant="outlined"
                  sx={{
                    input: { color: theme.palette.grey[100] },
                    ".MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: theme.palette.grey[500],
                      },
                      "&:hover fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.secondary.main,
                      },
                    },
                  }}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: colors.greenAccent[500],
                  },
                  color: theme.palette.grey[100],
                }}
              >
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </Box>
          )}
        </Formik>
      </Card>
    </SignInContainer>
  );
}
