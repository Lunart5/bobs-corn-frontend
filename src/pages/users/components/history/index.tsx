import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";

import { User } from "../../../../types";
import { LoadingSpinner } from "../../../../components/loadingSpinner";
import { formatDate } from "../../../../utils/utils";
import useLoadUserHistory from "../../../../hooks/useLoadUserHistory";

interface UserHistoryModalProps {
  selectedUser: User;
  dialogOpen: boolean;
  handleClose: () => void;
}

export function UserHistoryModal({
  selectedUser,
  dialogOpen,
  handleClose: closeFn,
}: UserHistoryModalProps) {
  const tableColums = ["#", "ID", "Amount", "Date"];

  const handleClose = () => closeFn();

  const { loadingPurchases, userPurchases } = useLoadUserHistory({
    selectedId: selectedUser.id,
    errorCallback: handleClose,
  });

  return (
    <Dialog open={dialogOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Purchase history of: <b>{selectedUser?.name}</b>
      </DialogTitle>
      {loadingPurchases ? (
        <LoadingSpinner />
      ) : (
        <DialogContent>
          {loadingPurchases ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 4,
              }}
            >
              <CircularProgress />
            </Box>
          ) : userPurchases.length === 0 ? (
            <Alert severity="info">This user has no purchase history</Alert>
          ) : (
            <TableContainer>
              <Table>
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
                  {userPurchases.map((purchase, idx) => (
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
        </DialogContent>
      )}
      <DialogActions>
        <Button
          variant="contained"
          sx={{ color: "white" }}
          onClick={handleClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
