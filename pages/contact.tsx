import React, { ReactElement } from "react";
import MainClient from "../components/Layouts/MainClient";
import { CustomHeader } from "../components/Header/CustomHeader";

const Contact = () => {
  return (
    <div>
      <CustomHeader>
        <title>Liên Hệ | Cuc Shoes</title>
      </CustomHeader>
      <div className="bg-dark w-full z-[1200] relative">
        <h1>Trang Liên Hệ</h1>
      </div>
    </div>
  );
};

Contact.getLayout = function getLayout(page: ReactElement) {
  return <MainClient>{page}</MainClient>;
};

export default Contact;
