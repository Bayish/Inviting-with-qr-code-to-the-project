import React from 'react';
import {Grid, MenuItem, TextField} from "@mui/material";

const FormElement = ({fullWidth, label, name, value, onChange, required, error, autoComplete, type, select, options, multiline, rows}) => {
    let inputChildren = null;

    if (select) {
        inputChildren = options.map(option => (
            <MenuItem
                key={option._id}
                value={option._id}
            >
                {option.title}
            </MenuItem>
        ));
    }

    return (
        <Grid item xs={12}>
            <TextField
                fullWidth
                select={select}
                multiline={multiline}
                rows={rows}
                type={type}
                required={required}
                autoComplete={autoComplete}
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                error={Boolean(error)}
                helperText={error}
            >
                {inputChildren}
            </TextField>
        </Grid>
    );
};


export default FormElement;