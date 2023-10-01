import React from 'react';
import { FormHelperText, FormHelperTextProps , TextField } from '@mui/material';
import { useField } from 'formik';
  
interface FormComponentsProps {
    name: string;
    label: string;
  }

const TextFieldWrapper: React.FC<FormComponentsProps> = ({ name, ...otherProps }) => {
    const [field, meta] = useField(name);
    
const configFormHelperTextProps: FormHelperTextProps   = {
        ...field,
        ...otherProps,
    };


         configFormHelperTextProps.error = true;

    return (
        <>
        <TextField {...field} {...otherProps} fullWidth variant="outlined" />
        {meta && meta.touched && meta.error && (
          <FormHelperText {...configFormHelperTextProps}>{meta.error}</FormHelperText>
        )}
      </>
    );
};

export default TextFieldWrapper;