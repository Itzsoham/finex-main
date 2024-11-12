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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Heading from "../components/Heading";
import { useTypes } from "../features/type/useTypes";
import PropsType from "prop-types";
import { useAddExpense } from "../features/expense/useAddExpense";
import { useUser } from "../features/authentication/useUser";
import { startOfMonth, endOfMonth } from "date-fns";

function ExpenseEntry() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { types } = useTypes();
  const { isCreating: isLoading, addExpense } = useAddExpense();
  const { userId } = useUser();

  const handleFormSubmit = (values) => {
    const expenseData = {
      ...values,
      created_by: userId,
    };

    addExpense(expenseData);
  };

  return (
    <Box m="20px">
      <Heading title="Add Expense" subtitle="Add new expence entry here" />

      <Formik
        onSubmit={handleFormSubmit}
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
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
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
                type="text"
                label="Bill No"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.billNo}
                name="billNo"
                error={!!touched.billNo && !!errors.billNo}
                helperText={touched.billNo && errors.billNo}
                sx={{ gridColumn: "span 1" }}
              />
              <FormControl
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.type && !!errors.type}
              >
                <InputLabel id="type">Expense type</InputLabel>

                <Select
                  labelId="type"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="type"
                  value={values.type}
                >
                  {types?.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
                {touched.type && errors.type && (
                  <Box color="error.main" mt={1}>
                    {errors.type}
                  </Box>
                )}
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.desc}
                name="desc"
                error={!!touched.desc && !!errors.desc}
                helperText={touched.desc && errors.desc}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Vendor Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.vendor}
                name="vendor"
                error={!!touched.vendor && !!errors.vendor}
                helperText={touched.vendor && errors.vendor}
                sx={{ gridColumn: "span 4" }}
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
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Case"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.case}
                name="case"
                error={!!touched.case && !!errors.case}
                helperText={touched.case && errors.case}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Remarks"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.remarks}
                name="remarks"
                error={!!touched.remarks && !!errors.remarks}
                helperText={touched.remarks && errors.remarks}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {isLoading ? "Creating..." : "Create New Expense"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}

const checkoutSchema = yup.object().shape({
  date: yup
    .date()
    .required("required")
    .test(
      "is-current-month",
      "Date must be within the current month",
      (value) => {
        if (!value) return false; // Ensure the date exists
        const now = new Date();
        const start = startOfMonth(now); // Start of current month
        const end = endOfMonth(now); // End of current month
        return value >= start && value <= end; // Check if date is within the range
      }
    ),
  billNo: yup.string().required("required"),
  type: yup.string().required("required"),
  desc: yup.string().required("required"),
  vendor: yup.string().required("required"),
  amount: yup.number().required("required"),
  case: yup.number().required("required"),
  payment: yup.string().required("required"),
  remarks: yup.string().required("required"),
});

const initialValues = {
  date: new Date(),
  billNo: "NA",
  type: "",
  desc: "",
  vendor: "",
  amount: "",
  case: "",
  payment: "",
  remarks: "",
};

ExpenseEntry.propTypes = {
  id: PropsType.string,
};

export default ExpenseEntry;
