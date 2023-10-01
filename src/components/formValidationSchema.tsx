import * as Yup from 'yup';
import { IEmployee } from '../interfaces/IEmployee';


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string()
    .required("*Required")
    .matches(/^[a-zA-Z]+$/, "Invalid Entry"),
  lastName: Yup.string()
    .required("*Required")
    .matches(/^[a-zA-Z]+$/, "Invalid Entry"),
  email: Yup.string()
    .required("*Required")
    .email("Invalid Email"),
  phoneNumber: Yup.string()
    .required("*Required")
    .matches(phoneRegExp, "Phone number is not valid"),
  addresses: Yup.array().of(
    Yup.object().shape({
      streetName: Yup.string().required("*Required"),
      postalCode: Yup.string().required("*Required"),
      apartmentNumber: Yup.number(),
      state: Yup.string().required("*Required"),
      country: Yup.string().required("*Required"),
    })
  ),
}) as Yup.ObjectSchema<IEmployee>;