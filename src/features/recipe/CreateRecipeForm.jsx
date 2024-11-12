import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import PropTypes from "prop-types";
import { useAddRecipe } from "./useAddRecipe";
import { Formik } from "formik";
import * as yup from "yup";
import Heading from "../../components/Heading";
import DatePicker from "react-datepicker";
import { useUser } from "../authentication/useUser";
import "react-datepicker/dist/react-datepicker.css";

const checkoutSchema = yup.object().shape({
  date: yup.date().required("required"),
  amount: yup.number().required("required"),
  payment: yup.string().required("required"),
});

const initialValues = {
  date: new Date(),
  amount: "",
  payment: "",
};

function CreateRecipeForm({ open, setOpen }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { userId, isLoading } = useUser();

  const { isCreating, addRecipe } = useAddRecipe();

  const handleFormSubmit = (values) => {
    const valuesWithUserId = { ...values, created_by: userId };
    addRecipe(valuesWithUserId);
    setOpen(false);
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "auto",
            height: "auto",
            overflow: "auto",
            bgcolor: colors.primary[400],
            borderRadius: "5px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box m="20px">
            <Heading title="CREATE Recipe" subtitle="Create a Recipe here" />

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
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <DatePicker
                      selected={values.date}
                      onChange={(date) => setFieldValue("date", date)}
                      onBlur={handleBlur}
                      dateFormat="dd/MM/yyyy"
                      customInput={
                        <TextField
                          label="Date"
                          variant="filled"
                          fullWidth
                          error={!!touched.date && !!errors.date}
                          helperText={touched.date && errors.date}
                          sx={{ gridColumn: "span 2" }}
                        />
                      }
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Amount"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.amount}
                      name="amount"
                      error={!!touched.amount && !!errors.amount}
                      helperText={touched.amount && errors.amount}
                      sx={{ gridColumn: "span 1" }}
                    />
                    <FormControl
                      variant="filled"
                      sx={{ gridColumn: "span 2" }}
                      error={!!touched.payment && !!errors.payment}
                    >
                      <InputLabel id="type">Payment type</InputLabel>

                      <Select
                        labelId="payment"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="payment"
                        value={values.payment}
                      >
                        <MenuItem value="cash">Cash</MenuItem>
                        <MenuItem value="cheque">Cheque</MenuItem>
                        <MenuItem value="online">Online</MenuItem>
                      </Select>
                      {touched.payment && errors.payment && (
                        <Box color="error.main" mt={1}>
                          {errors.payment}
                        </Box>
                      )}
                    </FormControl>
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px">
                    <Button
                      disabled={isLoading || isCreating}
                      type="submit"
                      color="secondary"
                      variant="contained"
                    >
                      {isCreating ? "Creating..." : "Create New Recipe"}
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

CreateRecipeForm.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default CreateRecipeForm;
