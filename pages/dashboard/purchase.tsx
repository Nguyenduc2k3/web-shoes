import React, { ReactElement, useEffect, useMemo, useState } from "react";
import MainAdmin from "../../components/Layouts/MainAdmin";
import { getPurchaseAll } from "../../services/product";
import LoadingPage from "../../components/Loading/LoadingPage";
import ContentHeader from "../../components/Header/ContentHeader";
import Card from "../../components/Card";
import Table from "../../components/Table";
import ModalImg from "../../components/Modal/ModalImg";
import { useRouter } from "next/router";
import { PurchaseProps } from "../../interfaces/product";
import dateFormat from "dateformat";
import DropDown from "../../components/DropDown";
import { updateStatus } from "../../services/purchase";
import toast from "react-hot-toast";

const columnPurchase = [
  "Số thứ tự",
  "Người mua",
  "Tên sản phẩm",
  "Size",
  "Màu sắc",
  "Ảnh",
  "Giá",
  "Số lượng",
  "Ngày bán",
  "Trạng thái",
];

const listStatus = [
  { title: "Đang chờ", value: "pending" },
  { title: "Đang xử lý", value: "processing" },
  { title: "Đang giao hàng", value: "shipped" },
  { title: "Đã giao thành công", value: "delivered" },
  { title: "Đã hủy", value: "cancelled" },
];

const Purchase = ({ loading }: { loading: Boolean }) => {
  const [dataPurchase, setDataPurchase] = useState<PurchaseProps[]>([]);
  const router = useRouter();

  const fetchAllPurchase = async () => {
    try {
      const res = await getPurchaseAll();
      setDataPurchase(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllPurchase();
  }, []);

  const handleItemSelected = async (
    selectedItem: { title: string; value: string },
    id: string
  ) => {
    try {
      const res = await updateStatus({ id, status: selectedItem.value });
      if (res.status === 200) {
        toast.success("Cập nhật trạng thái đơn hàng thành công!");
        fetchAllPurchase();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dataSourcePurchase = useMemo(() => {
    return dataPurchase.map((item, index) => {
      return [
        <> {index + 1}</>,
        <div className="text-primary font-bold">
          {item.user.firstName} {item.user.lastName}
        </div>,
        <div>{item.nameProd}</div>,
        <div>{item.sizeProd}</div>,
        <div>{item.colorProd}</div>,
        <img
          className="w-1/2 cursor-pointer rounded-lg object-cover"
          src={item.imageProd}
        />,
        <p>{item?.priceProd.toLocaleString("vi")} đ</p>,
        <p>{item.quantityProd}</p>,
        <>{dateFormat(item?.updatedAt, "HH:MM dd/mm/yyyy")}</>,
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold`}
        >
          <DropDown
            onChange={handleItemSelected}
            listData={listStatus}
            defaultValue={item.status}
            itemId={item.id}
          />
        </span>,
      ];
    });
  }, [dataPurchase]);

  return (
    <>
      {loading && <LoadingPage />}
      <ContentHeader
        title="Quản lý sản phẩm đã bán"
        name="Danh sách sản phẩm đã bán"
      />
      <Card>
        <Card.Content>
          <Table columns={columnPurchase} dataSource={dataSourcePurchase} />
        </Card.Content>
      </Card>
    </>
  );
};

Purchase.getLayout = function getLayout(page: ReactElement) {
  return <MainAdmin>{page}</MainAdmin>;
};

export default Purchase;
