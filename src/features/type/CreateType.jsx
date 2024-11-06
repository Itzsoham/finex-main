import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Heading from "../../components/Heading";
import PropTypes from "prop-types";
import { useAddType } from "./useAddType";
import { useUser } from "../authentication/useUser";
import { useEditType } from "./useEditType";

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
});

const CreateType = ({ setOpen, type }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { isCreating, addType } = useAddType();
  const { isEditing, editType } = useEditType();
  const { userId } = useUser();
  const isEditSession = Boolean(type && type.name);

  const isLoading = isCreating || isEditing;

  // Set initial values based on edit or create mode
  const initialValues = isEditSession ? { name: type.name } : { name: "" };

  const handleFormSubmit = (values) => {
    const typeData = {
      name: values.name,
      created_by: userId,
    };

    if (isEditSession) {
      editType({ type: typeData, id: type.id });
    } else {
      addType(typeData);
    }
    setOpen(false);
  };

  return (
    <Box m="20px">
      <Heading
        title={isEditSession ? "Edit Type" : "Create Type"}
        subtitle="Manage your types here"
      />

      <Formik
        onSubmit={(values, actions) => {
          handleFormSubmit(values);
          actions.resetForm(); // Resets form after submission
        }}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        enableReinitialize // This will reset values when `initialValues` change
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
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {isLoading
                  ? isEditSession
                    ? "Saving..."
                    : "Creating..."
                  : isEditSession
                  ? "Save Changes"
                  : "Create New Type"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateType;

CreateType.propTypes = {
  setOpen: PropTypes.func.isRequired,
  type: PropTypes.object,
};
