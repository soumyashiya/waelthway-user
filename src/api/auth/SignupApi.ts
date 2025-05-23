import axios from "axios";
interface NewUser {
  name: string;
  email: string;
  password: string;
  country:string
  phone: string;
  countryCode: String,
}

interface UserResponse {
  id: number;
  name: string;
  email: string;
  country: string;
  phone: string;
  status: string; // e.g., "active", "inactive"
  role: string;   // e.g., "user", "admin"
  wallet_balance: string; // could also be number if backend returns a number
  isIB: boolean;
  createdAt: string; // ISO date string (e.g., from new Date().toISOString())
}


export async function addUser(userData: NewUser): Promise<UserResponse> {
  try {
    const response = await axios.post("/api/v1/user/users", userData, {
      withCredentials: true
    });

    return response.data;
  } catch (error: any) {
    console.error("Error adding user:", error.response?.data || error.message);

    throw new Error(error.response?.data?.message || "Failed to add user");
  }
}
