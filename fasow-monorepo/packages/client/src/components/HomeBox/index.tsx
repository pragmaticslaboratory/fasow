import { ReactNode } from "react";

import { Card, SxProps, Typography } from "@mui/material";

import "./styles.css";

interface IProps {
  children: ReactNode;
  title: string;
}

const sx: SxProps = {
  width: "100%",
  height: "100%",
  backgroundColor: "white",
  borderRadius: 1,
};

export default function HomeBox({ children, title }: IProps) {
  return (
    <Card sx={sx}>
      <div className="home-box-content">
        <div className="home-box-title-container">
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
        </div>
        <div className="home-box-inner-container">{children}</div>
      </div>
    </Card>
  );
}
