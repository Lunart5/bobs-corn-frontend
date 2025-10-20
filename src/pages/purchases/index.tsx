import {
  Container,
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
} from "@mui/material";

import { formatDate } from "../../utils/utils";
import { LoadingSpinner } from "../../components/loadingSpinner";
import useLoadPurchases from "../../hooks/useLoadPurchases";

export default function MyPurchases() {
  const tableColums = ["#", "ID", "Amount", "Date"];
  const { loadingPurchases, purchasesList } = useLoadPurchases();

  if (loadingPurchases) {
    return <LoadingSpinner />;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }} textAlign="center">
        <Typography variant="h3" component="h1" gutterBottom>
          My Orders
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Purchase History
        </Typography>

        {purchasesList.length === 0 ? (
          <Alert severity="info">No purchase history. Buy some corn!</Alert>
        ) : (
          <TableContainer sx={{ maxWidth: 650, mx: "auto" }} component={Paper}>
            <Table sx={{ maxWidth: 650 }} aria-label="tabla de compras">
              <TableHead>
                <TableRow>
                  {tableColums.map((label) => (
                    <TableCell key={label}>
                      <b>{label}</b>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {purchasesList.map((purchase, idx) => (
                  <TableRow key={purchase.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{purchase.id}</TableCell>
                    <TableCell>
                      {purchase.amount} unit{purchase.amount > 1 && "s"}
                    </TableCell>
                    <TableCell>{formatDate(purchase.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Container>
  );
}
