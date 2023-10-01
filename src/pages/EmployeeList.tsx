import React, { useCallback, useEffect, useState } from "react";
import { IEmployee } from "../interfaces/IEmployee";
import { Link } from "react-router-dom";
import { Title } from "../styles/styles";
import ClipLoader from "react-spinners/ClipLoader";
import {
  Button,
  Box,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
  Snackbar,
  SnackbarContent,
  Table,
} from "@mui/material";
import Employee from "../components/Employee";
import { ProcomAPI } from "../API/ProcomAPI";
import { Subscription, catchError, of, switchMap } from "rxjs";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const EmployeeList: React.FC = ({}) => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [employeeToDeleteId, setEmployeeToDeleteId] = useState(null);
  let employeesSubscription: Subscription | null = null;

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    setShowErrorPopup(false);
  };

  const openDeleteDialog = (id: any) => {
    setIsDeleteDialogOpen(true);
    setEmployeeToDeleteId(id);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setEmployeeToDeleteId(null);
  };

  useEffect(() => {
    employeesSubscription = ProcomAPI.getEmployees().subscribe(
      (employeesData) => {
        setEmployees(employeesData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching employees:", error);
      }
    );

    return () => {
      if (employeesSubscription) {
        employeesSubscription.unsubscribe();
      }
    };
  }, []);

  const handleDeleteClick = useCallback((id: any) => {
    closeDeleteDialog();
    setLoading(true);

    ProcomAPI.deleteEmployee(id)
      .pipe(
        switchMap(() => ProcomAPI.getEmployees()),
        catchError((error) => {
          console.error("Error deleting employee:", error);
          return of([]);
        })
      )
      .subscribe(
        (employeesData: any) => {
          setEmployees(employeesData);
          setLoading(false);
          setShowSuccessPopup(true);
        },
        (error) => {
          if (error.response.status === 404) {
            setShowErrorPopup(true);
          }
        }
      );
  }, [closeDeleteDialog]);

  return (
    <div>
      <Container maxWidth="md">
        <Title>Employee List</Title>
        {isLoading ? (
          <div style={{ width: "100%", textAlign: "center", marginTop: 150 }}>
            <ClipLoader
              loading={isLoading}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <React.Fragment>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((employee) => (
                    <Employee
                      key={employee.id}
                      employee={employee}
                      onDelete={openDeleteDialog}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Snackbar
              open={showSuccessPopup}
              autoHideDuration={6000}
              onClose={handleClosePopup}
            >
              <SnackbarContent
                style={{
                  backgroundColor: "Green",
                }}
                message={
                  <span id="client-snackbar">
                    Employee deleted successfully
                  </span>
                }
              />
            </Snackbar>

            <Snackbar
              open={showErrorPopup}
              autoHideDuration={6000}
              onClose={handleClosePopup}
            >
              <SnackbarContent
                style={{
                  backgroundColor: "red",
                }}
                message={
                  <span id="client-snackbar">
                    Error Occurred: Employee does not exist
                  </span>
                }
              />
            </Snackbar>

            <Box display="flex" justifyContent="center" mt={2}>
              <Link to="/add-employee-formik">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: "20px" }}
                >
                  Add New Employee (Formik)
                </Button>
              </Link>
              <Link to="/add-employee-react-hook-form">
                <Button variant="contained" color="primary">
                  Add New Employee (react-hook-form)
                </Button>
              </Link>
            </Box>

            <Dialog
              open={isDeleteDialogOpen}
              onClose={closeDeleteDialog}
              fullWidth
              maxWidth="xs"
            >
              <DialogTitle>Delete Employee</DialogTitle>
              <DialogContent>
                Are you sure you want to delete this employee?
              </DialogContent>
              <DialogActions>
                <Button onClick={closeDeleteDialog} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    handleDeleteClick(employeeToDeleteId)
                  }}
                  color="primary"
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        )}
      </Container>
    </div>
  );
};

export default EmployeeList;
