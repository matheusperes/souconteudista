import { TextField, TextFieldProps } from '@mui/material';
import { Control, Controller, FieldError } from 'react-hook-form';

type MyTextFieldProps = TextFieldProps & {
  control: Control<any>;
  name: string;
  errors?: FieldError | undefined;
};

export function MyTextField({ control, name, defaultValue, errors, label }: MyTextFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field }) => (
        <TextField
          {...field}
          error={errors !== undefined}
          helperText={errors?.message}
          fullWidth
          label={label}
          multiline
        />
      )}
    />
  );
}
