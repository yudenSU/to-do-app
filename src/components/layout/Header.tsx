import { Box, BoxProps } from "@mui/joy";
import React from "react";

interface HeaderProps extends BoxProps {
  children?: React.ReactNode;  // Explicitly allow children
}

function Header({ children, ...props }: HeaderProps) {
  return (
    <Box
      component="header"
      className="Header"
      {...props}
      sx={[
        {
          p: 2,
          gap: 2,
          bgcolor: "background.surface",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1100,
          gridColumn: "1 / -1",
          borderBottom: "1px solid",
          borderColor: "divider",
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      {children}  {/* Render children */}
    </Box>
  );
}

export default Header;
