import { Box, Paper, styled } from "@mui/material";

export const FormContent = styled(Box)({
  marginTop: "64px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const FormContentPaper = styled(Paper)({
  padding: "32px",
  width: "100%",
});

export const LoadingContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "50vh",
});

export const RoleLabel = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isAdmin",
})<{ isAdmin: boolean }>(({ isAdmin, theme }) => ({
  padding: "8px 10px",
  borderRadius: "8px",
  backgroundColor: isAdmin
    ? theme.palette.success.light
    : theme.palette.info.light,
  color: "white",
}));
