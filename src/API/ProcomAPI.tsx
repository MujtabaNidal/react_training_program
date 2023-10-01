import axios from 'axios';
import { IEmployee } from '../interfaces/IEmployee';
import { Observable, from, map } from 'rxjs';

const BASE_URL = 'https://procom-interview-employee-test.azurewebsites.net';

export const ProcomAPI = {
  getEmployees: (): Observable<IEmployee[]> => {
    return from(axios.get(`${BASE_URL}/Employee`)).pipe(
      map((response) => response.data)
    );
  },

  insertEmployee: (employee: IEmployee): Observable<IEmployee> => {
    return from(axios.post<IEmployee>(`${BASE_URL}/employee`, employee)).pipe(
      map((response) => response.data)
    );
  },

  deleteEmployee: (id: number): Observable<void> => {
    return from(axios.delete(`${BASE_URL}/employee/${id}`)).pipe(
      map(() => {})
    );
  },

  updateEmployee: (employee: IEmployee): Observable<void> => {
    return from(axios.put(`${BASE_URL}/employee/${employee.id}`, employee)).pipe(
      map(() => {}) 
    );
  },


  getEmployeeById: (id: number): Observable<IEmployee> => {
    return from(axios.get<IEmployee>(`${BASE_URL}/employee/${id}`)).pipe(
      map((response) => response.data)
    );
  },
};