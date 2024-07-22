import axios from "axios";
import { VoucherValidator } from "../../interfaces/voucher";

export const CreateVoucher = async (voucher: VoucherValidator) => {
  return await axios.post("/api/voucher", { voucher });
};

export const GetFullVoucher = async () => {
  return await axios.get("/api/voucher");
};

export const EditVoucher = async ({
  id,
  discount,
  expiryDate,
}: {
  id: string;
  discount: number;
  expiryDate: string;
}) => {
  return await axios.put("/api/voucher", {
    id,
    discount,
    expiryDate,
  });
};

export const DeleteVoucher = async (id: string) => {
  try {
    const response = await axios.delete("/api/voucher", { data: { id } });
    return response;
  } catch (error) {
    console.error("Error deleting voucher:", error);
  }
};

export const GetVoucherClient = async (userId: string) => {
  return await axios.get("/api/voucher/client", { params: { userId } });
};

export const UserUsedVoucher = async ({
  userId,
  code,
}: {
  userId: string;
  code: string;
}) => {
  return await axios.patch("/api/voucher", {
    userId,
    code,
  });
};
