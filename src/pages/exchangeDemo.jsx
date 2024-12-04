import  { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const exchangeDemos = () => {
    const products = [
        {
          id: 1,
          name: "Golf Club Set Pro",
          description: `• ไม้กอล์ฟคุณภาพสูงที่มาพร้อมความสมดุลและความทนทาน
      • ออกแบบพิเศษเพื่อเพิ่มระยะทางและความแม่นยำ
      • น้ำหนักเบา ช่วยให้คุณเล่นได้อย่างสบายในทุกสถานการณ์
      • เหมาะสำหรับนักกอล์ฟทุกระดับ`,
          colors: "3 สี (น้ำเงิน, แดง, และดำ)",
          point: 25000,
          image: "https://www.golfbestbuy.com/cdn/shop/articles/bFeatured_S7_Mens_Blue_and_Red_Sets_300x300.png?v=1685248500",
        },
        {
          id: 2,
          name: "Golf Bag Deluxe",
          description: `• กระเป๋ากอล์ฟที่ผสมผสานดีไซน์หรูหรากับความทนทาน
      • มีพื้นที่จัดเก็บเพียงพอสำหรับอุปกรณ์กอล์ฟครบชุด
      • วัสดุกันน้ำเพื่อการใช้งานที่ยาวนานและมั่นใจ
      • เหมาะสำหรับทั้งนักกอล์ฟมือใหม่และมือโปร`,
          colors: "2 สี (ดำและขาว)",
          point: 10500,
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL1IyGeM3BUVLiTuxqDOesbxbV5MeAy0l32g&s",
        },
        {
          id: 3,
          name: "Golf Ball Premium Pack",
          description: `• ลูกกอล์ฟพรีเมียมที่มอบความแม่นยำและระยะทางที่เหนือกว่า
      • ผลิตจากวัสดุคุณภาพสูงเพื่อการตีที่ยอดเยี่ยม
      • ให้ความมั่นใจในทุกช็อต เพิ่มประสบการณ์การเล่นของคุณ`,
          colors: "1 สี (ขาว)",
          point: 1800,
          image: "https://www.secondchance.co.uk/wp-content/uploads/2019/04/12-Pack-Premium.jpg",
        },
        {
          id: 4,
          name: "Golf Shoes Advanced",
          description: `• รองเท้ากอล์ฟที่มาพร้อมเทคโนโลยีขั้นสูง
      • ออกแบบเพื่อเพิ่มการยึดเกาะและความมั่นคง
      • วัสดุที่ระบายอากาศได้ดี ช่วยลดการเสียดสี
      • ให้คุณเคลื่อนไหวได้อย่างมั่นใจในทุกสนาม`,
          colors: "2 สี (ดำและน้ำตาล)",
          point: 5200,
          image: "https://d23jngptvnttd7.cloudfront.net/2024/01/23130850/UADPmain.jpg",
        },
        {
          id: 5,
          name: "Golf Glove Comfort",
          description: `• ถุงมือกอล์ฟที่ช่วยเพิ่มการจับไม้กอล์ฟได้อย่างมั่นคง
      • เนื้อผ้านุ่ม ระบายอากาศได้ดี เหมาะสำหรับทุกฤดูกาล
      • ช่วยเพิ่มประสิทธิภาพการเล่น พร้อมความสบายในทุกช็อต`,
          colors: "2 สี (ขาวและดำ)",
          point: 800,
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBmh0rfNIrpgFHVcdq-fJJ6iPauoAYaGwZnQ&s",
        },
      ];
      
      
  const navigate = useNavigate(); // ใช้งาน navigate
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  const handleRedeem = (productId) => {
    Swal.fire({
      title: "แลกสินค้าเรียบร้อย",
      text: `คุณได้แลกสินค้า ID: ${productId}`,
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
    handleCloseModal();
  };

  return (
<div className="min-h-screen p-6 bg-[#D3F1DF]">
  <div className="max-w-4xl mx-auto">
    {/* ส่วนหัว */}
    <h1 className="text-xl font-bold text-[#5A6C57] text-center mb-2">
      MY VOUCHER
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
          onChange={handleSearch}
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


    {/* รายการสินค้า */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleProductClick(product)}
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
              <p className="text-sm text-[#525B44] mt-2">{product.colors}</p>
              <p className="text-md font-bold text-[#85A98F] mt-4 flex items-center">
                {product.point}
                <span className="bg-[#fbbd5c] text-white font-bold text-xs px-2 py-1 rounded-full shadow">
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

  {/* Modal */}
  {showModal && selectedProduct && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-11/12 sm:w-2/3 lg:w-1/3 relative">
        {/* ปุ่มปิด */}
        <button
          onClick={handleCloseModal}
          className="absolute top-2 right-2 text-[#5A6C57] hover:text-[#85A98F] transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex flex-col items-center">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h2 className="text-lg font-bold text-[#5A6C57]">
            {selectedProduct.name}
          </h2>
          <p className="text-sm text-[#525B44] mt-2 whitespace-pre-line leading-6">
            {selectedProduct.description}
          </p>
          <p className="text-sm text-[#525B44] mt-2">{selectedProduct.colors}</p>
          <p className="text-md font-bold text-[#85A98F] mt-4 flex items-center">
            {selectedProduct.point}
            <span className="bg-[#fbbd5c] text-white font-bold text-xs px-2 py-1 rounded-full shadow">
              P
            </span>
          </p>
          <button
            onClick={() => handleRedeem(selectedProduct.id)}
            className="mt-6 px-4 py-2 bg-[#85A98F] text-white rounded-lg hover:bg-[#5A6C57] transition"
          >
            แลกสินค้า
          </button>
        </div>
      </div>
    </div>
  )}
</div>



  );
};

export default exchangeDemos;
