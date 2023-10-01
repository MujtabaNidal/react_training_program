import { TableRow, TableCell, Button } from "@mui/material";
import React from "react";
import { IEmployee } from "../interfaces/IEmployee";
import { Link } from "react-router-dom";

type props = {
  employee: IEmployee;
  onDelete: (id:number) => void
};

const Employee: React.FC<props> = ({ employee,onDelete }) => {
    
    return (
    <TableRow>
      <TableCell>{employee.id}</TableCell>
      <TableCell>{employee.firstName}</TableCell>
      <TableCell>{employee.lastName}</TableCell>
      <TableCell>{employee.email}</TableCell>
      <TableCell>{employee.phoneNumber}</TableCell>
      <TableCell><Link to={`/edit-employee/${employee.id}`}><Button color="secondary" >Edit</Button></Link></TableCell>
      <TableCell><Button color="error" onClick={() => onDelete(employee.id!)}>Delete</Button></TableCell>
    </TableRow>
  )
};

export default Employee;
