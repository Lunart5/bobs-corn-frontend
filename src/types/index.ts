export enum UserRoles {
  admin = "ADMIN",
  user = "USER",
}

export interface SuccessResponse<T> {
  success: boolean;
  data: T;
}
export interface ErrorResponse {
  success: boolean;
  error: any;
}

export interface User {
  id: number;
  email: string;
  name: string;
  address: string;
  role: UserRoles;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterData {
  email: string;
  name: string;
  password: string;
  confirm_password: string;
  address: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface Purchase {
  id: string;
  userId: string;
  amount: number;
  createdAt: string;
  price: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export interface RateLimitError {
  message: string;
  retryAfter: number;
}
