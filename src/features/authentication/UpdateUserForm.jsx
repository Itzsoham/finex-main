import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PropTypes from "prop-types";
import * as yup from "yup";
import Heading from "../../components/Heading";
import { Formik } from "formik";
import { useUpdateUser } from "./useUpdateUser";
import { useUser } from "./useUser";
import Spinner from "../../components/Spinner";
import { useState } from "react";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

function UpdateUserForm({ setOpen }) {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { user, isLoading } = useUser();
  const { isUpdating, updateUser } = useUpdateUser();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");

  if (isLoading) return <Spinner />;

  const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    password: yup.string().min(6, "Password must be at least 6 characters"),
    contact: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("required"),
    avatar: yup.string().url("invalid url"),
  });

  const initialValues = {
    name: user?.user_metadata?.fullName || "",
    email: user?.email || "",
    password: "",
    contact: user?.user_metadata?.phone || "",
    avatar: user?.user_metadata?.avatar || "",
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file ? file.name : ""); // Display file name
  };

  const handleFormSubmit = (values) => {
    const { name: fullName, contact: phone, password } = values;
    updateUser(
      { fullName, avatar: selectedFile, phone, password },
      { onSettled: () => setOpen(false) }
    );
  };

  return (
    <Box m="20px">
      <Heading title="Update USER" subtitle="Update your info here" />

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
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                disabled={true}
                value={values.email}
                name="email"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Password"
                value={values.password}
                name="password"
                sx={{ gridColumn: "span 4" }}
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.password && !!errors.password}
                helperText={
                  touched.password && errors.password ? errors.password : ""
                }
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

              {/* File Upload Field */}
              <Box sx={{ gridColumn: "span 4" }}>
                <Button variant="outlined" color="secondary" component="label">
                  Upload Avatar
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                  />
                </Button>
                {fileName && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected file: {fileName}
                  </Typography>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "1.2rem",
                mt: "20px",
              }}
            >
              <Button
                color="secoundary"
                variant="outlined"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" color="secondary" variant="contained">
                {isUpdating ? "Updating..." : "Update"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}

UpdateUserForm.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

export default UpdateUserForm;
