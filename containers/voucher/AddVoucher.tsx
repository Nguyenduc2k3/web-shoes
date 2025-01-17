import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { DataVoucherProps, VoucherValidator } from "../../interfaces/voucher";
import { CreateVoucher, EditVoucher } from "../../services/voucher";
import toast from "react-hot-toast";

const AddVoucher = ({
  handleClose,
  voucherEdit,
}: {
  handleClose: () => void;
  voucherEdit?: DataVoucherProps;
}) => {
  const [discount, setDiscount] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [quantity, setQuantity] = useState(1);

  console.log({ expiryDate });

  const [loadingCreate, setLoadingCreate] = useState(false);

  const [validatorMess, setValidatorMess] = useState<VoucherValidator>();

  const validatorForm = () => {
    const mess: any = {};

    if (!discount) {
      mess.discount = "Hãy nhập giá trị được giảm";
    }

    if (!expiryDate) {
      mess.expiryDate = "Hãy nhập ngày hết hạn";
    }

    if (quantity <= 0) {
      mess.quantity = "Hãy nhập số lượng hợp lệ";
    }

    setValidatorMess(mess);
    if (Object.keys(mess).length > 0) return true;
    return false;
  };

  const handleCreateVoucher = async () => {
    setLoadingCreate(true);
    try {
      validatorForm();
      if (voucherEdit) {
        const voucherNew = {
          id: voucherEdit.id,
          discount: Number(discount),
          expiryDate: new Date(expiryDate).toISOString(),
        };

        const res = await EditVoucher(voucherNew);
        if (res.status === 200) {
          toast.success("Sửa voucher thành công!");
          handleClose();
        }
      } else {
        const voucherCreate = {
          discount: Number(discount),
          expiryDate: new Date(expiryDate).toISOString(),
          quantity,
        };

        const res = await CreateVoucher(voucherCreate);
        if (res.status === 200) {
          toast.success("Tạo mới voucher thành công!");
          handleClose();
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingCreate(false);
  };

  useEffect(() => {
    if (voucherEdit) {
      setDiscount(voucherEdit.discount.toString());
      setExpiryDate(
        new Date(voucherEdit.expiryDate).toISOString().split("T")[0]
      );
    }
  }, [voucherEdit]);

  return (
    <div className="w-80">
      <div className="relative mb-4">
        <input
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          id="discount"
          type="number"
          className={`peer text-white bg-transparent border w-full px-2.5 py-3 rounded-lg focus:border-white hover:border-white border-color-primary ${
            validatorMess?.discount && "border-red-500"
          }`}
        />
        <label
          className={`absolute text-base px-1 rounded-lg text-[rgb(99,115,129)] peer-focus:-top-3 peer-focus:left-3 peer-focus:text-sm peer-focus:text-white transition-all duration-300 bg-[#161C24] ${
            discount.length
              ? "bg-[#161C24] text-white left-3 text-sm -top-3"
              : "top-3 left-3"
          } ${validatorMess?.discount && "text-red-500"} cursor-text `}
          htmlFor="discount"
        >
          Giảm giá
        </label>
        {validatorMess?.discount && (
          <i className="text-red-500 text-xs pl-1">{validatorMess?.discount}</i>
        )}
      </div>

      <div className="relative mb-4">
        <input
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          id="expiry-date"
          type="date"
          className={`peer text-white bg-transparent border w-full px-2.5 py-3 rounded-lg focus:border-white hover:border-white border-color-primary ${
            validatorMess?.expiryDate && "border-red-500"
          }`}
        />
        <label
          className={`absolute text-base px-1 rounded-lg text-[rgb(99,115,129)] peer-focus:-top-3 peer-focus:left-3 peer-focus:text-sm peer-focus:text-white transition-all duration-300 bg-[#161C24] ${
            expiryDate.length
              ? "bg-[#161C24] text-white left-3 text-sm -top-3"
              : "top-3 left-3"
          } ${validatorMess?.expiryDate && "text-red-500"} cursor-text `}
          htmlFor="expiry-date"
        >
          Ngày hết hạn
        </label>
        {validatorMess?.expiryDate && (
          <i className="text-red-500 text-xs pl-1">
            {validatorMess?.expiryDate}
          </i>
        )}
      </div>

      {!voucherEdit && (
        <div className="relative mb-4">
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.valueAsNumber)}
            id="quantity"
            type="number"
            className={`peer text-white bg-transparent border w-full px-2.5 py-3 rounded-lg focus:border-white hover:border-white border-color-primary ${
              validatorMess?.quantity && "border-red-500"
            }`}
          />
          <label
            className={`absolute text-base px-1 rounded-lg text-[rgb(99,115,129)] peer-focus:-top-3 peer-focus:left-3 peer-focus:text-sm peer-focus:text-white transition-all duration-300 bg-[#161C24] ${
              quantity
                ? "bg-[#161C24] text-white left-3 text-sm -top-3"
                : "top-3 left-3"
            } ${validatorMess?.quantity && "text-red-500"} cursor-text `}
            htmlFor="quantity"
          >
            Số lượng
          </label>
          {validatorMess?.quantity && (
            <i className="text-red-500 text-xs pl-1">
              {validatorMess?.quantity}
            </i>
          )}
        </div>
      )}
      <div className="flex items-center justify-center">
        <Button
          loading={loadingCreate}
          onClick={handleCreateVoucher}
          label={voucherEdit ? "Lưu" : "Tạo"}
        />
      </div>
    </div>
  );
};

export default AddVoucher;
