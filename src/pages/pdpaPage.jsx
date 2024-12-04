import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { getLineUserId } from "../utils/storage.js";

const PdpaPage = () => {
  const [checkbox1, setCheckbox1] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const [language, setLanguage] = useState("TH"); // Default language is Thai
  const contentRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const lineUserId = getLineUserId();

    if (!lineUserId) {
      Swal.fire({
        title: language === "EN" ? "Error" : "ข้อผิดพลาด",
        text:
          language === "EN"
            ? "Line User ID is missing. Please log in again."
            : "ไม่มี Line User ID กรุณาเข้าสู่ระบบอีกครั้ง",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/"); // Redirect to login
    }
  }, [navigate, language]);

  useEffect(() => {
    const handleScroll = () => {
      const element = contentRef.current;
      if (element.scrollHeight - element.scrollTop <= element.clientHeight) {
        setIsScrolledToBottom(true);
      } else {
        setIsScrolledToBottom(false);
      }
    };

    const element = contentRef.current;
    element.addEventListener("scroll", handleScroll);

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkbox1) {
      Swal.fire({
        title: language === "EN" ? "Attention" : "แจ้งเตือน",
        text:
          language === "EN"
            ? "Please agree to the terms to proceed."
            : "กรุณายอมรับเงื่อนไขเพื่อดำเนินการต่อ",
        icon: "warning",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    try {
      const lineUserId = getLineUserId();

      if (!lineUserId) {
        Swal.fire({
          title: language === "EN" ? "Error" : "ข้อผิดพลาด",
          text:
            language === "EN"
              ? "Line User ID is missing. Please log in again."
              : "ไม่มี Line User ID กรุณาเข้าสู่ระบบอีกครั้ง",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/pdpa-access`,
        {
          lineUserId,
          checkbox1,
        }
      );

      if (response.data.success) {
        Swal.fire({
          title: language === "EN" ? "Success" : "สำเร็จ",
          text: response.data.message,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          navigate("/twoWayVerify");
        });
      } else {
        Swal.fire({
          title: language === "EN" ? "Error" : "ข้อผิดพลาด",
          text:
            response.data.message ||
            (language === "EN"
              ? "Failed to save consent."
              : "ไม่สามารถบันทึกความยินยอมได้"),
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error saving consent:", error);
      Swal.fire({
        title: language === "EN" ? "Error" : "ข้อผิดพลาด",
        text:
          language === "EN"
            ? "Failed to save consent. Please try again later."
            : "ไม่สามารถบันทึกความยินยอมได้ กรุณาลองใหม่ภายหลัง",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "EN" ? "TH" : "EN"));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#D3F1DF]">
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md border border-[#85A98F]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-2xl font-semibold text-[#5A6C57]">
            {language === "TH" ? "Consent PDPA" : "ยินยอมตาม PDPA"}
          </h2>
          <div
            className="w-20 h-8 flex items-center bg-[#D3F1DF] rounded-full p-1 cursor-pointer relative"
            onClick={toggleLanguage}
          >
            {/* Text for TH */}
            <div
              className={`absolute left-2 text-xs font-medium ${
                language === "TH" ? "text-[#85A98F]" : "text-gray-500"
              }`}
            >
              TH
            </div>
            {/* Text for EN */}
            <div
              className={`absolute right-2 text-xs font-medium ${
                language === "EN" ? "text-[#85A98F]" : "text-gray-500"
              }`}
            >
              EN
            </div>
            {/* Slider */}
            <div
              className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
                language === "EN" ? "translate-x-12" : "translate-x-0"
              }`}
            ></div>
          </div>
        </div>
  
        {/* Content */}
        <div
          ref={contentRef}
          className="overflow-y-auto max-h-64 border border-gray-300 p-4 rounded-lg bg-[#F5F7F6] mb-6"
        >
          {language === "TH" ? (
            <p className="text-sm text-[#525B44] leading-relaxed">
              {/* PDPA Content in English */}
              **PDPA Agreement Content Here** Lorem ipsum dolor sit amet...
              **PDPA Agreement Content Here** Lorem ipsum dolor sit amet...lorem300
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores ill
              **PDPA Agreement Content Here** Lorem ipsum dolor sit amet...lorem300
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores ill
              **PDPA Agreement Content Here** Lorem ipsum dolor sit amet...lorem300
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores ill
              **PDPA Agreement Content Here** Lorem ipsum dolor sit amet...lorem300
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores ill

              **PDPA Agreement Content Here** Lorem ipsum dolor sit amet...lorem300
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores ill

              **PDPA Agreement Content Here** Lorem ipsum dolor sit amet...lorem300
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores ill

              **PDPA Agreement Content Here** Lorem ipsum dolor sit amet...lorem300
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores ill
            </p>
          ) : (
            <p className="text-sm text-[#525B44] leading-relaxed">
              {/* PDPA Content in Thai */}
              **PDPA Agreement Content Here** Lorem ipsum dolor sit amet...
              **PDPA Agreement Content Here** Lorem ipsum dolor sit amet...lorem300
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores ill
              **PDPA Agreement Content Here** Lorem ipsum dolor sit amet...lorem300
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores ill
              **PDPA Agreement Content Here** Lorem ipsum dolor sit amet...lorem300
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores ill
              **PDPA Agreement Content Here** Lorem ipsum dolor sit amet...lorem300
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores ill

              **PDPA Agreement Content Here** Lorem ipsum dolor sit amet...lorem300
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores ill

              **PDPA Agreement Content Here** Lorem ipsum dolor sit amet...lorem300
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores ill

              **PDPA Agreement Content Here** Lorem ipsum dolor sit amet...lorem300
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores ill
            </p>
          )}
        </div>
  
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                disabled={!isScrolledToBottom}
                checked={checkbox1}
                onChange={() => setCheckbox1(!checkbox1)}
                className="form-checkbox text-[#85A98F] h-5 w-5"
              />
              <span className="text-sm text-[#5A6C57]">
                {language === "TH"
                  ? "I agree to the terms and conditions"
                  : "ฉันยอมรับเงื่อนไขและข้อกำหนด"}
              </span>
            </label>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 transition-all text-sm sm:text-base"
            >
              {language === "TH" ? "Cancel" : "ยกเลิก"}
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg shadow transition-all text-sm sm:text-base ${
                checkbox1
                  ? "bg-[#85A98F] text-white hover:bg-[#5A6C57]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!checkbox1}
            >
              {language === "TH" ? "Done" : "เสร็จสิ้น"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
};

export default PdpaPage;
