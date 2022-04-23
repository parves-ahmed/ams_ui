// represents userDTO
export interface UserPayload {
  id: number;
  username: string;
  password: string;
  email: string;
  role: string;
  // user id for role wise details
  roleId: number;
  fullName: string;
  address: string;
  mobile: string;
// Employee properties below 3
  designation: string;
  picture: File;
  signature: File;
}

