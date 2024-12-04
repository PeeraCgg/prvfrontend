import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HistoryExchange = () => {
  const redeemedProducts = [
    {
      id: 1,
      name: "Gift Voucher 3000 บาท",
      description: "บัตรกำนัลสำหรับใช้ในสนามกอล์ฟมูลค่า 3000 บาท",
      point: 3000,
      image: "https://passiondelivery.com/pub/media/catalog/product/cache/7e6e59e80a69ca81b40190dbfa9e211f/v/o/voucher-05.jpg", // Replace with your image URL
    },
    {
      id: 2,
      name: "Golf Ball Set",
      description: "ลูกกอล์ฟระดับพรีเมียมจำนวน 12 ลูก",
      point: 1800,
      image: "https://shop.pebblebeach.com/media/catalog/product/cache/f5145d18489ce367df032006b8df698d/6/4/6461_acces_newallcourse4pack_l.jpg", // Replace with your image URL
    },
    {
      id: 3,
      name: "Golf T-Shirt",
      description: "เสื้อกอล์ฟคุณภาพสูง สวมใส่สบาย",
      point: 2500,
      image: "https://m.media-amazon.com/images/I/61EtfWczAmL._AC_UL1300_.jpg", // Replace with your image URL
    },
  ];

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // ฟังก์ชันค้นหาสินค้า
  const filteredProducts = redeemedProducts.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-[#D3F1DF]">
      <div className="max-w-4xl mx-auto">
        {/* ส่วนหัว */}
        <h1 className="text-xl font-bold text-[#5A6C57] text-center mb-2">
          Exchanged Products
        </h1>
        <p className="text-md font-medium text-[#5A6C57] text-center mb-6">
          Your Points: 834
        </p>

        {/* ช่องค้นหา */}
        <div className="relative mb-4">
          <div className="relative max-w-sm mx-auto flex items-center bg-white shadow-md rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 ml-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 16l6-6m0 0l-6-6m6 6H3"
              />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ค้นหา"
              className="w-full p-3 text-sm border-none outline-none bg-transparent"
            />
          </div>
        </div>

        {/* เมนูแบบแท็บ */}
        <div className="flex justify-around items-center mb-6">
          <button
            className="flex-1 text-sm font-semibold text-[#5A6C57] py-2 mx-2 border border-[#85A98F] rounded-full bg-white shadow-xl hover:bg-[#85A98F] hover:text-white transition-transform transform hover:-translate-y-1"
            onClick={() => navigate("/prvcard")} // นำไปหน้า Prv Card
          >
            Prv <br />
            Card
          </button>
          <button
            className="flex-1 text-sm font-semibold text-[#5A6C57] py-2 mx-2 border border-[#85A98F] rounded-full bg-white shadow-xl hover:bg-[#85A98F] hover:text-white transition-transform transform hover:-translate-y-1"
            onClick={() => navigate("/exchangeDemo")} // นำไปหน้า Latest Items
          >
            Latest
            <br /> Items
          </button>
          <button
            className="flex-1 text-sm font-semibold text-[#5A6C57] py-2 mx-2 border border-[#85A98F] rounded-full bg-white shadow-xl hover:bg-[#85A98F] hover:text-white transition-transform transform hover:-translate-y-1"
            onClick={() => navigate("/historyExchange")} // นำไปหน้า Exchanged Products
          >
            Exchanged Products
          </button>
        </div>

        {/* รายการสินค้าที่แลกไปแล้ว */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-not-allowed"
                style={{ opacity: 0.6 }} // ทำให้ดูซีด
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-md font-semibold text-[#5A6C57]">
                    {product.name}
                  </h2>
                  <p className="text-sm text-[#525B44] mt-2 whitespace-pre-line leading-6">
                    {product.description}
                  </p>
                  <p className="text-md font-bold text-[#85A98F] mt-4 flex items-center">
                    {product.point}
                    <span className="bg-[#fbbd5c] text-white font-bold text-xs px-2 py-1 rounded-full shadow ml-2">
                      P
                    </span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">ไม่พบสินค้าที่คุณค้นหา</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryExchange;
