import React from "react";
import { Box, CircularProgress } from "@material-ui/core";

const CircularProgressBox = (props: any) => {
  const { circularProps, boxProps }: any = props;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      {...boxProps}
    >
      <CircularProgress {...circularProps} />
    </Box>
  );
};
export default CircularProgressBox;
