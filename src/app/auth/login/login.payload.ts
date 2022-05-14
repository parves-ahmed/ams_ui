export interface LoginResponse {
  access_token: string;
  role: string;
  refresh_token: string;
  expiresAt: Date;
  username: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}
