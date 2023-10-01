import React, { useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import { Button, Box, Grid, Typography, Snackbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import TextField from "../components/FormComponents";
import { ProcomAPI } from "../API/ProcomAPI";
import { IEmployee } from "../interfaces/IEmployee";
import { Title } from "../styles/styles";
import { FORM_VALIDATION } from '../components/formValidationSchema';

const INITIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  addresses: [
    {
      streetName: "",
      postalCode: "",
      apartmentNumber: "",
      state: "",
      country: "",
    },
  ],
};


const AddEmployeePageFormik: React.FC = ({
}) => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
  };

  const handleSubmit = async (
    values: any,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const newEmployee: IEmployee = {
        id: 0,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phone,
        addresses: values.addresses.map((address: any) => ({
          ...address,
          apartmentNumber: parseInt(address.apartmentNumber), // Convert to integer
        })),
      };

      // console.log(newEmployee);
      // const response = await ProcomAPI.insertEmployee(newEmployee);
      // console.log("Employee added successfully");
      setShowSuccessPopup(true);
      setSubmitting(false);

      navigate("/");
    } catch (error) {
      console.error("Error adding employee", error);
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Title>Add Employee (Formik)</Title>

      <Formik
        initialValues={INITIAL_FORM_STATE}
        validationSchema={FORM_VALIDATION}
        onSubmit={handleSubmit}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Employee Details</Typography>
              </Grid>

              <Grid item xs={6}>
                <TextField name="firstName" label="*First Name" />
              </Grid>

              <Grid item xs={6}>
                <TextField name="lastName" label="*Last Name" />
              </Grid>

              <Grid item xs={6}>
                <TextField name="email" label="*Email" />
              </Grid>

              <Grid item xs={6}>
                <TextField name="phone" label="*Phone Number" />
              </Grid>
            </Grid>
            <FieldArray name="addresses">
              {({
                push,
                remove,
              }: {
                push: (obj: any) => void;
                remove: (index: number) => void;
              }) => (
                <React.Fragment>
                  {values.addresses.map((_, index) => (
                    <Grid key={index} container spacing={2}>
                      <Grid item xs={12} marginTop={2}>
                        <Typography variant="h6">
                          Address {index + 1}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name={`addresses[${index}].streetName`}
                          label="*Street Name"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          name={`addresses[${index}].postalCode`}
                          label="*Postal Code"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          name={`addresses[${index}].apartmentNumber`}
                          label="*Apartment Number"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          name={`addresses[${index}].state`}
                          label="*State"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          name={`addresses[${index}].country`}
                          label="*Country"
                        />
                      </Grid>

                      <Grid item xs={6}>
                        {values.addresses.length > 1 && (
                          <Button
                            onClick={() => remove(index)}
                            variant="contained"
                            style={{
                              marginRight: "20px",
                              backgroundColor: "red",
                            }}
                          >
                            Remove Address
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  ))}
                  <Grid item xs={6} marginTop={2}>
                    <Button
                      onClick={() =>
                        push({
                          streetName: "",
                          postalCode: "",
                          apartmentNumber: "",
                          state: "",
                          country: "",
                        })
                      }
                      variant="contained"
                      color="primary"
                    >
                      Add Address
                    </Button>
                  </Grid>
                </React.Fragment>
              )}
            </FieldArray>

            <Snackbar
              open={showSuccessPopup}
              autoHideDuration={6000}
              onClose={handleClosePopup}
              message="Employee added successfully"
            />

            <Box display="flex" justifyContent="center" mt={2}>
              <Link to="/">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: "20px" }}
                >
                  Back
                </Button>
              </Link>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddEmployeePageFormik;
