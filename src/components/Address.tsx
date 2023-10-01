import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

interface IAddressProps {
  index: number;
  remove: (index: number) => void;
  control: any;
  errors: any;
}

const Address: React.FC<IAddressProps> = ({
  index,
  remove,
  control,
  errors,
}) => {
  return (
    <Grid key={index} container spacing={2}>
      <Grid item xs={12} marginTop={2}>
        <Typography variant="h6">Address {index + 1}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Controller
          name={`addresses[${index}].streetName`}
          control={control}
          render={({ field }) => (
            <TextField {...field} label="*Street Name" fullWidth />
          )}
        />
        {errors.addresses &&
          errors.addresses[index] &&
          errors.addresses[index].streetName && (
            <Typography color="error">
              {errors.addresses[index].streetName.message}
            </Typography>
          )}
      </Grid>
      <Grid item xs={6}>
        <Controller
          name={`addresses[${index}].postalCode`}
          control={control}
          render={({ field }) => (
            <TextField {...field} label="*Postal Code" fullWidth />
          )}
        />
        {errors.addresses &&
          errors.addresses[index] &&
          errors.addresses[index].postalCode && (
            <Typography color="error">
              {errors.addresses[index].postalCode.message}
            </Typography>
          )}
      </Grid>
      <Grid item xs={6}>
        <Controller
          name={`addresses[${index}].apartmentNumber`}
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Apartment Number" fullWidth />
          )}
        />
        {errors.addresses &&
          errors.addresses[index] &&
          errors.addresses[index].apartmentNumber && (
            <Typography color="error">
              {errors.addresses[index].apartmentNumber.message}
            </Typography>
          )}
      </Grid>
      <Grid item xs={6}>
        <Controller
          name={`addresses[${index}].state`}
          control={control}
          render={({ field }) => (
            <TextField {...field} label="*State" fullWidth />
          )}
        />
        {errors.addresses &&
          errors.addresses[index] &&
          errors.addresses[index].state && (
            <Typography color="error">
              {errors.addresses[index].state.message}
            </Typography>
          )}
      </Grid>
      <Grid item xs={6}>
        <Controller
          name={`addresses[${index}].country`}
          control={control}
          render={({ field }) => (
            <TextField {...field} label="*Country" fullWidth />
          )}
        />
        {errors.addresses &&
          errors.addresses[index] &&
          errors.addresses[index].country && (
            <Typography color="error">
              {errors.addresses[index].country.message}
            </Typography>
          )}
      </Grid>
      <Grid item xs={6}>
        {index > 0 && (
          <Button
            onClick={() => remove(index)}
            variant="contained"
            style={{ marginRight: "20px", backgroundColor: "red" }}
          >
            Remove Address
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default Address;
