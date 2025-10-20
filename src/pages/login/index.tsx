import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { toast } from "react-toastify";
import { authService } from "../../services/auth.services";
import { useAuthStore } from "../../store/useAuthStore";
import type { LoginData } from "../../types";
import {
  email_regex,
  field_min_text,
  field_required_text,
  invalid_email,
  loading_text,
} from "../../utils/constants";
import { FormContent, FormContentPaper } from "../../components/styles";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>();

  const setAuth = useAuthStore((state) => state.setAuth);

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await authService.login(data);
      setAuth(response.user, response.token);
      toast.success(`Welcome, ${response.user.name}!`);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Unable to sign in");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <FormContent>
        <FormContentPaper elevation={3}>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            gutterBottom
            sx={{ mb: 3 }}
          >
            🌽 Log In
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              autoComplete="email"
              autoFocus
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email", {
                required: field_required_text,
                pattern: {
                  value: email_regex,
                  message: invalid_email,
                },
              })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password", {
                required: field_required_text,
                minLength: {
                  value: 6,
                  message: field_min_text(6),
                },
              })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? loading_text : "Log In"}
            </Button>
            <Box sx={{ textAlign: "center" }}>
              <Link component={RouterLink} to="/register" variant="body2">
                Not a member? <b>Join now</b>
              </Link>
            </Box>
          </Box>
        </FormContentPaper>
      </FormContent>
    </Container>
  );
}
