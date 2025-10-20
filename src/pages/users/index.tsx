import { useState } from "react";
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
  Button,
  Alert,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";

import { User, UserRoles } from "../../types";
import { LoadingSpinner } from "../../components/loadingSpinner";
import { RoleLabel } from "../../components/styles";
import { UserHistoryModal } from "./components/history";
import useLoadUsers from "../../hooks/useLoadUsers";

export default function AdminUsers() {
  const { loadingUsers, usersList } = useLoadUsers();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const tableColums = ["Name", "Email", "Address", "Rol", "Actions"];

  const handleViewPurchases = async (user: User) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedUser(null);
  };

  const userIsAdmin = (user: User) => user.role === UserRoles.admin;

  if (loadingUsers) {
    return <LoadingSpinner />;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Users List
        </Typography>

        {usersList.length === 0 ? (
          <Alert severity="info" sx={{ width: "fit-content", marginX: "auto" }}>
            There are no registered users yet
          </Alert>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="users table">
              <TableHead>
                <TableRow>
                  {tableColums.map((label) => (
                    <TableCell align="center" key={label}>
                      <b>{label}</b>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {usersList.map((user) => {
                  const isAdmin = userIsAdmin(user);
                  return (
                    <TableRow key={user.id}>
                      <TableCell align="center">{user.name}</TableCell>
                      <TableCell align="center">{user.email}</TableCell>
                      <TableCell align="center">{user.address}</TableCell>
                      <TableCell align="center">
                        <RoleLabel isAdmin={isAdmin} component="span">
                          <b>{user.role}</b>
                        </RoleLabel>
                      </TableCell>
                      <TableCell align="center">
                        {!isAdmin && (
                          <Button
                            color="info"
                            variant="outlined"
                            size="small"
                            startIcon={<Visibility />}
                            onClick={() => handleViewPurchases(user)}
                          >
                            <b>Purchase History</b>
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {selectedUser && (
        <UserHistoryModal
          dialogOpen={dialogOpen}
          handleClose={handleCloseDialog}
          selectedUser={selectedUser}
        />
      )}
    </Container>
  );
}
