import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  Button,
  Box,
  Grid,
  Typography,
  Snackbar,
  TextField,
  SnackbarContent,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProcomAPI } from "../API/ProcomAPI";
import { IEmployee } from "../interfaces/IEmployee";
import { Title } from "../styles/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import Address from "../components/Address";
import ClipLoader from "react-spinners/ClipLoader";
import { FORM_VALIDATION } from '../components/formValidationSchema';
import { switchMap, catchError, of, Subject, takeUntil } from "rxjs";


const AddEmployeePageReactHookForm: React.FC = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showFetchErrorPopup, setShowFetchErrorPopup] = useState(false);
  const [employee, setEmployee] = useState(null);
  const { id } = useParams();
  const employeeIdToEdit = id ? parseInt(id, 10) : null;
  const navigate = useNavigate();
  const[isLoading, setLoading] = useState(false);


  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    setShowErrorPopup(false);
  };

  const defaultValues = useMemo(
    () => ({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      addresses: [
        {
          streetName: "",
          postalCode: "",
          apartmentNumber: 0,
          state: "",
          country: "",
        },
      ],
    }),
    []
  );

  const {
    handleSubmit,
    control,  
    formState: { isSubmitting, isDirty, isValid , errors },
    reset,
  } = useForm({
    resolver: yupResolver(FORM_VALIDATION),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  const onSubmit = handleSubmit((data: IEmployee) => {
    reset(data);
    if (employeeIdToEdit) {
      ProcomAPI.updateEmployee(data) 
        .pipe(
          catchError((error) => {
            console.error("Error updating employee:", error);
            return of([]);
          })
        )
        .subscribe(
          (employeeData: any) => {
            setEmployee(employeeData);
            setShowSuccessPopup(true);
          },
          (error) => {
            if (error.response.status === 409) {
              setShowErrorPopup(true);
            }
          }
        );
    } else {
      ProcomAPI.insertEmployee(data)
        .pipe(
          catchError((error) => {
            console.error("Error inserting employee:", error);
            return of([]);
          })
        )
        .subscribe(
          (employeeData: any) => {
            setEmployee(employeeData);
            navigate('/')
          },
          (error) => {
            if (error.response.status === 409) {
              setShowErrorPopup(true);
            }
          }
        );
    }
  
    reset();
  });

    useEffect(() => {
    const fetchEmployee = () => {
      if (employeeIdToEdit !== null) {
        setLoading(true);
        ProcomAPI.getEmployeeById(employeeIdToEdit)
          .pipe(
            catchError((error) => {
              setShowFetchErrorPopup(true);
              return of(null);
            }),
          )
          .subscribe((employeeData: any) => {
            // setDataFetched(true);
            setEmployee(employeeData);
            reset(employeeData);
            // console.log(employee);
             setLoading(false);
          });
      }
    };
  
    fetchEmployee();

  }, [id]);

  return (
    <div>
      <Title>Add Employee (React-Hook-Form)</Title>
      {isLoading ? (
        <div style={{ width: "100%", textAlign: "center", marginTop: 150}}>
        <ClipLoader
        loading={isLoading}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
      ) : (
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Employee Details</Typography>
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="*First Name" fullWidth />
              )}
            />
            {errors.firstName && (
              <Typography color="error">{errors.firstName.message}</Typography>
            )}
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="*Last Name" fullWidth />
              )}
            />
              {errors.lastName && (
              <Typography color="error">{errors.lastName.message}</Typography>
               )}
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="*Email" fullWidth />
              )}
            />
              {errors.email && (
              <Typography color="error">{errors.email.message}</Typography>
               )}
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="*Phone Number" fullWidth />
              )}
            />
              {errors.phoneNumber && (
                <Typography color="error">{errors.phoneNumber.message}</Typography>
              )}
          </Grid>
        </Grid>
        <div>
          {fields.map((address, index) => (
            <Address
              control={control}
              index={index}
              key={index}
              remove={remove}
              errors={errors}
            />
          ))}
        </div>
        <Grid item xs={6} marginTop={2}>
          <Button
            onClick={() =>
              append({
                streetName: "",
                postalCode: "",
                apartmentNumber: 0,
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

        <Snackbar
          open={showSuccessPopup}
          autoHideDuration={6000}
          onClose={handleClosePopup}
          >
          <SnackbarContent style={{
            backgroundColor:'Green',
          }}
          message={<span id="client-snackbar">Employee updated successfully</span>}
        />
        </Snackbar>

      <Snackbar
          open={showErrorPopup}
          autoHideDuration={6000}
          onClose={handleClosePopup}
        >
        <SnackbarContent style={{
            backgroundColor:'red',
          }}
          message={<span id="client-snackbar">Error Occurred: Email or Id already exists</span>}
        />
        </Snackbar>

        <Snackbar
          open={showFetchErrorPopup}
          autoHideDuration={6000}
          onClose={handleClosePopup}
        >
        <SnackbarContent style={{
            backgroundColor:'red',
          }}
          message={<span id="client-snackbar">Error Occurred: Unable to fetch employee</span>}
        />
        </Snackbar>

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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isDirty && isValid}
          > 
           {isSubmitting? (
              <ClipLoader size={24} color="white" />
            ) : (
              "Submit"
            )} 
          </Button>
        </Box>
      </form>
      )}
    </div>
  );
};

export default AddEmployeePageReactHookForm;
