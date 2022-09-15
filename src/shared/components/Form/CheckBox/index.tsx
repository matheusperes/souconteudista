import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

type IFormCheckbox = {
  name: string;
  label: string;
  defaultValue?: boolean;
  control: Control<any>;
  margin_type?: 'no-margin' | 'left-margin';
};

export function FormCheckbox({ margin_type, name, control, defaultValue, label }: IFormCheckbox) {
  // const sxFixed = useMemo(() => {
  //   let marginTop: string | undefined = '1em';
  //   let marginLeft: string | undefined;

  //   if (margin_type) {
  //     marginTop = undefined;
  //   }

  //   if (margin_type === 'left-margin') {
  //     marginLeft = '1em';
  //   }

  //   return {
  //     marginTop,
  //     marginLeft,
  //   };
  // }, [margin_type]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || false}
      render={({ field }) => (
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            }
            label={label}
          />
        </FormGroup>
      )}
    />
  );
}
