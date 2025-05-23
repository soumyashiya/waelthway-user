import axiosIns from "../../utils/axiosIns";
import axios from "axios";
export interface BankDetailInput {
  userId: number;
  account_name: string;
  account_type: "savings" | "current";
  account_number: string;
  ifsc_swift_code?: string;
  iban_number?: string;
  bank_name: string;
  bank_address?: string;
  country?: string;
  passbook_file?: string; // Path or URL string
}

export interface BankDetailResponse {
  id: number;
  userId: number;
  account_name: string;
  account_type: "savings" | "current";
  account_number: string;
  ifsc_swift_code?: string;
  iban_number?: string;
  bank_name: string;
  bank_address?: string;
  country?: string;
  passbook_file?: string;
  createdAt: string;
  updatedAt: string;
}

export async function addBankDetail(formData: FormData) {
  try {
    console.log("dfgvbhnj")
    const response = await axios.post("/api/v1/bankdetails/add", formData, {
      headers: {
        "Content-Type": "multipart/-data",
      },
      withCredentials: true,
    });
 
    return response.data;
  } catch (error: any) {
    console.error("Error adding bank detail:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to add bank detail");
  }
}