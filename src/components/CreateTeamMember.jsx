import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Heading from "./Heading";
import { useSignup } from "../features/authentication/useSignUp";
import PropsType from "prop-types";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  role: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().min(6, "minimum 6 characters").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
});
const initialValues = {
  name: "",
  role: "",
  email: "",
  password: "",
  contact: "",
};

const CreateTeamMember = ({ setOpen }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { isLoading, signup } = useSignup();

  // Function to handle form submission and log form values
  const handleFormSubmit = (values) => {
    const { name: fullName, role, email, password, contact } = values;

    signup({ email, password, fullName }, { onSettled: () => setOpen(false) });
  };

  return (
    <Box m="20px">
      <Heading title="CREATE USER" subtitle="Create a New Team member here" />

      <Formik
        onSubmit={(values, actions) => {
          handleFormSubmit(values);
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
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name ? errors.name : ""}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.role && !!errors.role}
              >
                <InputLabel id="role">Access Level</InputLabel>

                <Select
                  labelId="role"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="role"
                  value={values.role}
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="User">User</MenuItem>
                </Select>
                {touched.role && errors.role && (
                  <Box color="error.main" mt={1}>
                    {errors.role}
                  </Box>
                )}
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email ? errors.email : ""}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={
                  touched.password && errors.password ? errors.password : ""
                }
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={
                  touched.contact && errors.contact ? errors.contact : ""
                }
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {isLoading ? "Creating..." : "Create New User"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

CreateTeamMember.propTypes = {
  setOpen: PropsType.func,
};

export default CreateTeamMember;
