export interface LoginResponse {
  authToken: string;
  role: string;
  refreshToken: string;
  expiresAt: Date;
  username: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}
