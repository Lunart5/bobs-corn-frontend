import { useForm } from "react-hook-form";
import { useNavigate, Link as RouterLink } from "react-router-dom";
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
import type { RegisterData } from "../../types";
import {
  email_regex,
  field_max_text,
  field_min_text,
  field_required_text,
  invalid_email,
  loading_text,
} from "../../utils/constants";
import { FormContentPaper, FormContent } from "../../components/styles";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<RegisterData>();

  const onSubmit = async (data: RegisterData) => {
    try {
      await authService.register(data);
      toast.success("Account Created Successfully!");
      navigate("/login");
    } catch (error: any) {
      toast.error(
        error.response?.data?.error || "Error creating your account"
      );
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
            🌽 Create Account
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              autoFocus
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              autoComplete="name"
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register("name", {
                required: field_required_text,
                minLength: {
                  value: 3,
                  message: field_min_text(3),
                },
                maxLength: {
                  value: 50,
                  message: field_max_text(50),
                },
              })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              autoComplete="email"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email", {
                required: field_required_text,
                pattern: {
                  value: email_regex,
                  message: invalid_email,
                },
                maxLength: {
                  value: 50,
                  message: field_max_text(50),
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
              autoComplete="new-password"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password", {
                required: field_required_text,
                minLength: {
                  value: 6,
                  message: field_min_text(6),
                },
                maxLength: {
                  value: 50,
                  message: field_max_text(50),
                },
              })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              id="confirm_password"
              autoComplete="new-password"
              error={!!errors.confirm_password}
              helperText={errors.confirm_password?.message}
              {...register("confirm_password", {
                required: field_required_text,
                maxLength: {
                  value: 50,
                  message: field_max_text(50),
                },
                validate: (value) =>
                  value === getValues("password") ||
                  "The passwords do not match",
              })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              autoComplete="address"
              error={!!errors.address}
              helperText={errors.address?.message}
              {...register("address", {
                required: field_required_text,
                minLength: {
                  value: 5,
                  message: field_min_text(5),
                },
                maxLength: {
                  value: 50,
                  message: field_max_text(50),
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
              {isSubmitting ? loading_text : "Sign Up"}
            </Button>
            <Box sx={{ textAlign: "center" }}>
              <Link component={RouterLink} to="/login" variant="body2">
                Have an account? <b>Sign in</b>
              </Link>
            </Box>
          </Box>
        </FormContentPaper>
      </FormContent>
    </Container>
  );
}
