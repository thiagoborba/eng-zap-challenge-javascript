import React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import { TextField as MaterialTextField, Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%'
  }
})

export const TextField = ({ label, icon = null, iconPosition = 'start', value, ...props }) => {
  const classes = useStyles()
  return (
    <Box>
      <MaterialTextField
        { ...props }
        className={classes.root}
        label={label}
        InputProps={{
          startAdornment: icon && (
            <InputAdornment position={iconPosition}>
              { icon }
            </InputAdornment>
          ),
        }}
        value={value}
      />
    </Box>
  );
}

export default TextField