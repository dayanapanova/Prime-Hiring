import React from 'react';
import {
    Select as MuiSelect,
    InputLabel,
    MenuItem,
    FormControl,
    FormHelperText,
} from '@mui/material';

const Select = ({ label, options, margin, error, helperText, ...restProps }) => (
    <FormControl {...{ margin, helperText }} fullWidth>
        <InputLabel {...{ margin }} id={`select-${label}`}>
            {label}
        </InputLabel>
        <MuiSelect
            labelId={`select-${label}`}
            {...{ error, label }}
            {...restProps}
        >
            {options.map(({ label, value }, index) => (
                <MenuItem
                    key={`option-${label}-${index}`}
                    {...{ value }}
                >
                    {label}
                </MenuItem>
            ))}
        </MuiSelect>
        {helperText && (
            <FormHelperText>{helperText}</FormHelperText>
        )}
    </FormControl>
);

export default Select;
