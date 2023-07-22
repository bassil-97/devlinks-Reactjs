import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingSpinner() {
  return <CircularProgress sx={{ width: "100%", color: "var(--primary-color)" }} />;
}
