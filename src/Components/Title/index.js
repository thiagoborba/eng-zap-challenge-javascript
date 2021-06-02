import { Typography } from '@material-ui/core';

export const Title = ({ ...props }) => {
  return (
    <Typography
      { ...props }
      style={{ margin: 0 }}
    />
  )
}

export default Title