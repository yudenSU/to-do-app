import { BoxProps, Box } from "@mui/joy";

function Main(props: BoxProps) {
    return (
      <Box
        component="main"
        className="Main"
        {...props}
        sx={[{ p: 2 }, ...(Array.isArray(props.sx) ? props.sx : [props.sx])]}
      />
    );
  }

export default Main
