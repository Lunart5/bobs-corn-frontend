import { CircularProgress } from "@mui/material";
import { LoadingContainer } from "../styles";

export function LoadingSpinner() {
  return (
    <LoadingContainer>
      <CircularProgress />
    </LoadingContainer>
  );
}
