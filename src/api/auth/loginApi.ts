import axios from "axios"; 
interface LoginCredentials {
  email: string;
  password: string;
}
interface LoginResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token?: string; // if returned
}
 
export async function loginUser(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  try {
    const response = await axios.post("/api/v1/auth/login", credentials,{
        withCredentials: true
    } );
 
    return response.data;
  } catch (error: any) {
    console.error("Error during login:", error.response?.data || error.message);
 
    throw new Error(error.response?.data?.message || "Login failed");
  }
}