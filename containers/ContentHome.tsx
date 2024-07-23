import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/router";
import { ListProduct } from "../interfaces/product";
import { GetUsersQuery } from "../interfaces/user";
import { getAllProducts } from "../services/product";
import Link from "next/link";
import PaginationClient from "../components/Pagination/PaginationClient";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Categorys, News, Support } from "../mockData";
import Footer from "../components/Footer";

const minimalUi = {
  offscreenP: {
    y: 100,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
  offscreenH: {
    y: -100,
    opacity: 0,
  },
};

const inputVariant = {
  open: {
    width: "800px",
    transition: {
      duration: 0.4,
    },
  },
  closed: {},
};
const DEFAULT_PRODUCTS_LIMIT = 52;
const ContentHome = () => {
  const [focused, setFocused] = useState(false);
  const [limitValue, setLimitValue] = useState(DEFAULT_PRODUCTS_LIMIT);

  const [products, setProducts] = useState<ListProduct[]>();
  const [totalProduct, setTotalProduct] = useState(0);
  const images = [
    // "./images/logo.png",
    // "./images/logo1.jpg",
    // "./images/bannerhotel.jpeg",
    "./images/banner1.png",
    "./images/banner2.png",
    "./images/banner3.png",

    // "./images/anh3.png",
    // "./images/anh4.png",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const Gender = ["kids", "men", "women", "all"];

  console.log(currentImageIndex, "currentImageIndex");

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex + 1 < images.length ? prevIndex + 1 : 0
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex + 1 < images.length ? prevIndex + 1 : 0
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const router = useRouter();

  const fetchProducts = async (query?: GetUsersQuery): Promise<void> => {
    try {
      const { data } = await getAllProducts({
        ...query,
        limit: limitValue,
        page: query?.page ? query?.page : 1,
      });

      setProducts(data.product);
      setTotalProduct(data.total);
    } catch (error) {
      console.log(error);
    }
  };
  const onChangePage = (page: number) => {
    router.push(
      {
        query: {
          page: page,
        },
      },
      undefined,
      { shallow: true }
    );
  };
  useEffect(() => {
    fetchProducts(router.query);
  }, [router.isReady, router.query]);

  const handleQuerySearch = (value: string) => {
    const query = { ...router.query, query: value };

    router.push({ pathname: "/product", query }, undefined, {
      shallow: true,
    });
  };

  const [startIndex, setStartIndex] = useState(0);
  console.log(startIndex, "startIndex");

  const handleNext = () => {
    setStartIndex((prevIndex) => prevIndex + 7);
  };

  const handlePrevious = () => {
    setStartIndex((prevIndex) => prevIndex - 7);
  };
  console.log(startIndex, "xxxxsxsxs");
  console.log(startIndex + 8, "loghocai");
  const categorys = Categorys.slice(startIndex, startIndex + 8);

  const handleClick = (id: number) => {
    router.push(`/article/${id}`);
  };
  return (
    <div className="max-w-sm md:max-w-2xl lg:max-w-[1200px] mx-auto">
      <div className="mt-[100px] max-w-sm lg:max-w-[1200px] mx-auto">
        <form className="flex items-center text-xl mb-12">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative  lg:w-full left-[200px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <CiSearch className="text-[rgb(99,115,129)]" />
            </div>
            <motion.input
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              variants={inputVariant}
              initial="close"
              // animate={focused ? "open" : "closed"}
              animate="open"
              onChange={(e) => handleQuerySearch(e.target.value)}
              type="text"
              id="simple-search"
              className="bg-transparent text-white border text-base placeholder:text-[rgb(99,115,129)] border-[rgba(145,158,171,0.32)] outline-none rounded-lg block lg:w-full pl-10 p-2 "
              placeholder="Search..."
            />
          </div>
          <div />
        </form>
        <div className="grid grid-cols-10 gap-10 h-[400px]">
          <div className="col-span-7 relative group ">
            <img
              className="w-full object-cover"
              style={{ maxHeight: "400px" }}
              src={images[currentImageIndex]}
              alt="Slideshow"
            />
            <div className="slideshow-controls text-center absolute top-1/2 transform -translate-y-1/2 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                className="hover:cursor-pointer mr-2 bg-black opacity-20 hover:opacity-30 text-white py-2 rounded-md px-4 text-3xl absolute left-3"
                onClick={goToPreviousImage}
              >
                <MdKeyboardArrowLeft />
              </button>
              <button
                onClick={goToNextImage}
                className="bg-black opacity-20 hover:opacity-30 text-white py-2 rounded-md px-4 text-3xl absolute right-3"
              >
                <MdKeyboardArrowRight />
              </button>
            </div>
          </div>

          <div className="col-span-3 space-y-6 flex flex-col items-center">
            <img
              className="w-full h-[200px] object-cover"
              src="./images/anh5.jpg"
              alt="Image 1"
            />
            <img
              className="w-full h-[200px] object-cover"
              src="./images/anh6.jpg"
              alt="Image 2"
            />
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-5 mt-16">
            <div className="text-[30px] font-light text-white mt-5 mb-[30px]">
              Hãy Đồng hành cùng chúng tôi
            </div>
            <div className="space-y-7">
              {Support.map((item, index) => (
                <div className="flex items-start gap-x-5">
                  <div className="text-primary">{item.icon}</div>
                  <div>
                    <div className="text-white text-lg font-bold">
                      {item.title}
                    </div>
                    <div className="text-[#ccc] text-sm">{item.content}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-7 flex justify-center">
            <img className="h-[560px]" src="./images/anhsp.png" alt="" />
          </div>
        </div>
        <div className="text-[30px] flex justify-center font-light text-white mt-5 mb-[30px]">
          Danh Mục Sản Phẩm
        </div>
        <div>
          <div className="flex gap-x-[38px] whitespace-nowrap overflow-hidden">
            {categorys.map((item, index) => (
              <div
                className="flex flex-col items-center"
                style={{ minWidth: "124px" }}
              >
                <img
                  className="w-[124px] h-[124px] rounded-full object-cover"
                  src={item.image}
                  alt=""
                />
                <div className="text-white mt-2">{item.title}</div>
                {/* <div className="text-white">{item.accommodation} chỗ ở</div> */}
                {/* <div className="text-white">{index}</div> */}
              </div>
            ))}
          </div>
          <div className="text-white">
            <button onClick={handlePrevious} disabled={startIndex === 0}>
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={startIndex + 8 >= Categorys.length}
            >
              Next
            </button>
          </div>
        </div>
        <div className="text-[30px] flex justify-center font-light text-white mt-5 mb-[30px]">
          Danh Sách Sản Phẩm
        </div>
        {products && products.length > 0 ? (
          <div>
            {Gender.map((gender) => (
              <div key={gender}>
                <h2 className="text-white">{gender.toUpperCase()}</h2>
                <div className="grid grid-cols-4 gap-6 mb-10">
                  {products?.map(
                    (product, index) =>
                      (gender === "all" || product.gender === gender) && (
                        <div key={index}>
                          <Link
                            href={`/product/${product?.id}`}
                            className="bg-product col-span-4 lg:col-span-1 rounded-lg cursor-pointer hover:-translate-y-1 transition-all duration-200"
                          >
                            <div className="p-2">
                              <img
                                className="rounded-lg w-[262px] h-[262px] object-cover"
                                src={product?.listImage[0]}
                                alt={product?.name}
                              />
                            </div>
                            <div className="py-6 px-2">
                              <h1 className="text-base font-semibold text-white">
                                {product?.name}
                              </h1>
                              <div className="flex items-center justify-between mt-5 px-3">
                                <div className="flex items-center">
                                  {product?.color.map((col, idx) => (
                                    <div
                                      className="h-3 w-3 rounded-full"
                                      key={idx}
                                      style={{ backgroundColor: col }}
                                    />
                                  ))}
                                </div>
                                <p className="text-base font-semibold text-white">
                                  {product?.price.toLocaleString("vi")} SOL
                                </p>
                              </div>
                            </div>
                          </Link>
                        </div>
                      )
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="flex w-full justify-center items-center text-xl sm:text-2xl font-bold py-40 opacity-20">
            Không có sản phẩm bạn đang tìm!!
          </p>
        )}
        {/* {products && products?.length > 0 ? (
          <div className="grid grid-cols-4 gap-6 mb-10">
            {products.map((product, idx) => (
              <Link
                href={`/product/${product?.id}`}
                className="bg-product col-span-4 lg:col-span-1 rounded-lg cursor-pointer hover:-translate-y-1 transition-all duration-200"
                key={idx}
              >
                <div className="p-2">
                  <img
                    className="rounded-lg w-[262px] h-[262px] object-cover"
                    src={product?.listImage[0]}
                    alt={product?.name}
                  />
                </div>
                <div className="py-6 px-2">
                  <h1 className="text-base font-semibold text-white">
                    {product?.name}
                  </h1>
                  <div className="flex items-center justify-between mt-5 px-3">
                    <div className="flex items-center">
                      {product?.color.map((col, idx) => (
                        <div
                          className="h-3 w-3 rounded-full"
                          key={idx}
                          style={{ backgroundColor: col }}
                        />
                      ))}
                    </div>
                    <p className="text-base font-semibold text-white">
                      {product?.price.toLocaleString("vi")} đ
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="flex w-full justify-center items-center text-xl sm:text-2xl font-bold py-40 opacity-20">
            Không có sản phẩm bạn đang tìm!!
          </p>
        )} */}
        <div className="text-[30px] flex justify-center font-light text-white mt-5 mb-[30px]">
          Tin Tức FitFusionZone
        </div>
        <div className="grid grid-cols-3 gap-5 mb-10">
          {News.map((item, index) => (
            <div
              onClick={() => handleClick(item.id)}
              key={item.id}
              className="flex flex-col items-center space-y-4"
            >
              <div className="w-[300px] h-[300px] ">
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-white">{item.title}</div>
            </div>
          ))}
        </div>
        <PaginationClient
          current={Number(router.query.page || 1)}
          pageSize={limitValue}
          total={totalProduct}
          onChange={onChangePage}
        />
        <Footer />
      </div>
    </div>
  );
};

export default ContentHome;
