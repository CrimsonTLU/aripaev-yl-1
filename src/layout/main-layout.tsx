import { Container, Typography } from "@mui/material";
import { FC, PropsWithChildren } from "react";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Palgaturu Analüüs Eestis
      </Typography>
      {children}
    </Container>
  );
};

export default MainLayout;
