import React from 'react';
import Container from '@mui/material/Container';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddEmployeePageFormik from './pages/AddEmployeePageFormik';
import AddEmployeePageReactHookForm from './pages/AddEmployeePageReactHookForm';
import EmployeeList from './pages/EmployeeList';


const App: React.FC = () => {
  return (
    <Router>
    <Container>
        <Routes>
        <Route path="/" Component={EmployeeList} />
        <Route path="/add-employee-formik" Component={AddEmployeePageFormik} />
        <Route path="/add-employee-react-hook-form" Component={AddEmployeePageReactHookForm} />
        <Route path="/edit-employee/:id" Component={AddEmployeePageReactHookForm} />
        </Routes>
    </Container>

    </Router>

  );
};

export default App;
