import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { getLineUserId } from "../utils/storage.js";

const PdpaPage = () => {
  const [checkbox1, setCheckbox1] = useState(false);
  const [language, setLanguage] = useState("TH"); // Default language is Thai
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
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-4 sm:p-6 w-full max-w-screen-sm h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm sm:text-lg font-semibold text-[#5A6C57]">
            {language === "TH" ? "Privacy Notice && Consent From" : " ประกาศความเป็นส่วนตัวและหนังสือให้ความยินยอม"}
          </h2>
          <div
            className="w-16 h-6 flex items-center bg-[#D3F1DF] rounded-full p-1 cursor-pointer relative"
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
              className={`bg-white w-6 h-4 rounded-full shadow-md transform transition-transform ${
                language === "EN" ? "translate-x-8" : "translate-x-0"
              }`}
            ></div>
          </div>
        </div>
  
        {/* Content */}
        <div className="overflow-y-auto flex-grow p-2 sm:p-4 mb-4 border border-gray-300 rounded-lg text-sm sm:text-base">
          {language === "TH" ? (
            <p className="text-sm text-[#525B44] leading-relaxed">
                  
       
 <center><strong>Privacy Notice </strong></center><br/>
For Customers, Business Partners, Visitors, and External Parties
Charter Square Holding Co., Ltd. (the  “Company” ) recognizes the importance of, and strictly adheres to, the rights and privacy of personal data owners, including customers, business partners, visitors, and external parties. This applies to the collection, use, and/or disclosure of information (collectively referred to as “data processing”) to comply with the Personal Data Protection Act B.E. 2562 (2019). The purpose of collecting, using, and disclosing your personal data is to provide tailored products and services, conduct business operations, and ensure security in business management.
This Privacy Notice includes all channels through which personal data is collected, such as websites, mobile applications, social media platforms, and online communication channels. Please read this Privacy Notice in conjunction with the terms and conditions of the specific services you use.
Personal Data<br/>
“ Personal Data”  refers to information about a living individual that enables the
 identification of that person, either directly or indirectly. <br/>
 “Sensitive Data”  refers to personal information related to race, ethnicity, political opinions, religious or philosophical beliefs, 
 sexual behavior, criminal records, health data, disability status, 
 union membership, genetic data, biometric data such as facial recognition, 
 iris scans, or fingerprints. <br/>
 <strong>1. Personal Data Collected, Used, or Disclosed by the Company</strong><br/>
1.1 Personal Details: This includes title, name, surname, age, 
date of birth, gender, nationality, photograph, educational qualifications,
 insurance information, and professional details (e.g., job title, workplace). 
 Government-issued document details (e.g., ID card number, passport number),
  signatures, licenses, and other identifying documents are also included. <br/>
1.2 Contact Information: This includes phone numbers, fax numbers, LINE ID, address, 
country of residence, email, and other contact details, including the names of associated employees. <br/>
1.3 Vehicle Information: Includes driving license, vehicle registration, 
and other vehicle-related details. <br/>
1.4 Financial Information: Bank accounts, credit card details, and other financial records. 1.5 Financial Status Information: This includes risk details for business partners, credit rating. and solvency information, as well as information found in contract-related communications. 1.6 Other Information: Information related to the relationship between the Company and business partners, such as contract data and forms provided by you.
If you provide third-party personal data (e.g., emergency contact name and phone number), the Company assumes you have obtained consent from that individual. You are responsible for ensuring you have the right to share such data, and the Company accepts no liability for any claims of rights infringement by the individual concerned.
English (United States) <br/>


<strong>2. Sensitive Personal Data</strong><br/>
The Company may need to collect sensitive data, such as religion, race, 
or biometric data (e.g.. fingerprints) or medical information. 
The Company will request your consent to collect, use, and/or disclose such data,
 except in cases where: <br/>
2.1 It is necessary to prevent or suppress danger to life, body, or health.<br/>
2.2 The information has been made public with explicit consent.<br/>
2.3 It is required for legal purposes related to:<br/>
2.3.1 Public health, such as the prevention of dangerous diseases or epidemics.<br/>
2.3.2 Scientific, historical, or statistical research, or other public interest purposes.<br/>
<strong>3. Purpose of Collecting, Using, or Disclosing Personal Data</strong><br/>
The collection, use, and disclosure of your personal data will be for
 legal purposes, contractual compliance, public benefit, permission requests,
  or as otherwise permitted by law, including but not limited to the following:<br/>
3.1 Business Communication: For business transactions, communication 
regarding products, services, and projects of the Company or its 
business partners, and responding to inquiries or requests.<br/>
3.2 Business Partner Selection: For verifying the suitability and 
qualifications of business partners, conducting background checks,
 risk identification, and managing invitations for bidding or contract compliance.<br/>
3.3 Business Partner Data Management: For maintaining and updating business partner 
directories and storing related documents.<br/>
3.4 Security and Surveillance: For identity verification, access control,
 monitoring systems, and crime prevention tools such as CCTV and internet security systems.<br/>
3.5 Investigation and Complaint Handling: For criminal or fraud prevention investigations.<br/> 3.6 Marketing Purposes: For notifying you about beneficial information, events, or new service offerings, as well as conducting surveys.<br/>
3.7 Business Administration: For managing and storing business records, as well as ensuring compliance with contracts and legal obligations.
In cases where consent is required for the collection, use, or disclosure of personal data, the Company will seek your consent accordingly.<br/>
4. Disclosure of Personal Data to External Parties<strong></strong><br/>
4.1 Service Providers: The Company may disclose your personal data to service providers such as IT developers, payment service providers, 
research agencies, financial consultants, communication agencies,
 and data storage providers, among others, strictly for service facilitation purposes.<br/>
4.2 Legal Compliance: The Company may disclose personal data when necessary to
 comply with legal obligations, government requests, or to protect the rights and 
 safety of individuals.<br/>
<strong>5. Protection of Personal Data</strong><br/>
The Company employs appropriate technical and administrative 
measures to protect personal data and limit access to authorized personnel only,
 both for physical and electronic data.<br/>
<strong>6. Data Retention Period</strong><br/>
Personal data will be retained for the duration necessary to fulfill the purposes for which it was collected and to comply with legal obligations. Longer retention periods may apply if required by law.<br/>
<strong>7. Changes to the Privacy Notice</strong><br/>
The Company reserves the right to update this Privacy Notice periodically. Any changes will take effect immediately upon being posted on the Company`s website or application.<br/>
<strong>8. Rights of Personal Data Owners</strong><br/>
Under the law, you may have the following rights:<br/>
8.1 Right to access your data and request a copy.<br/>
8.2 Right to withdraw consent at any time.<br/>
8.3 Right to request corrections to inaccurate data.<br/>
8.4 Right to request data deletion or anonymization, unless retention is required by law.<br/>
8.5 Right to transfer personal data to another data controller.<br/>
8.6 Right to request a suspension of data use.<br/>
8.7 Right to object to data collection, use, or disclosure, such as for direct marketing.<br/>
8.8 Right to file complaints if your data is misused in violation of the applicable data protection law.<br/>
<strong>9. Contact Information</strong><br/>
If you wish to exercise your rights or have any questions regarding this Privacy Notice, please contact the Company via:
Charter Square Holding Co., Ltd.
Address: 152 Charter Square Building, North Sathorn Road, Silom Bang Rak. Bangkok 10500 Phone: 02-637-8000
Email: cts_pdpa@charteredsquare.com
Issued on June 1, 2022<br/>
(Ms. Tassanee Yangmeevitaya)<br/>
 Senior Vice President<br/>



<center><strong>Privacy Notice </strong></center><br/>
(Under the Personal Data Protection Act B.E. 2019)
This Form is undersigned by me, (hereinafter referred to Data Subject) 
who has entered into a business relationship or transaction with Chartered 
Square Holding Co., Ltd. (hereinafter referred to as the Company).
 I have read and understood the details in the Company`s Privacy Notice, 
 including the rights of the Data Subject of the Company. Therefore, 
 I hereby grant my consent to the Company under the following terms and conditions:<br/>
<strong>1. Personal Data</strong><br/>
My personal data under this Form includes: Name - Surname, Company`s name, mobile phone number, email and other information which related to service request such as license plate number or Line ID, etc.<br/>
<strong>2. Specific Purpose of Consent.</strong><br/>
For information management and facilitate for Chartered Square`s service request<br/>
 <strong>3. Source of Personal Data</strong><br/>
My personal data under this Form is the data that I have provided
 to the Company myself and/or that the Company already had or
  obtained before from my previous business relationship or 
  transaction with the Company, or from other sources such as 
  email communication, as it appears on various websites, 
  online search engine Search Engine, etc.<br/>
<strong>4. Duration of Consent:</strong><br/>
I consent to the Company processing data by collecting, 
using, and disclosing my personal data within the period necessary 
which is only to carry out the purpose stated in Clause 2 above or as required by law.<br/>
<strong>5. Exercise of Rights by the Data Subject:</strong><br/>
In the event that I wish to exercise my rights to access, rectify, receive a copy, suspend, object to, or complain about the use of my personal data, including withdrawing my consent under this Form, I may do so by submitting a “Exercise of Rights Request Form” and contacting through the following channels. The exercise of such rights shall be effective from the date the Company acknowledges the exercise of such rights. I acknowledge the consequences of using the Company`s services as a result of the exercise of such rights. However, the withdrawal of consent shall not affect anything that the Company has already done lawfully prior to such withdrawal. 6. Contact Information:
Personal Data Control Center, Chartered Square Holding Company Limited, located at 152 North Sathorn Road, Silom, Bangrak, Bangkok 10500. Phone number: 02-637- 8000 Email address: cts_pdpa@charteredsquare.com
I have read and understood all the details.
 agree I do not agree** that the Company may collect, use, and disclose my personal data in accordance with this Form in all respects.<br/>
Signature………………….<br/>
Date………………<br/>
Note: The Company`s Privacy Policy can be found at www.charteredsquare.com or by scanning the [QR code], 






            </p>
          ) : (
            <p className="text-sm text-[#525B44] leading-relaxed">
                  
                  <center><strong >ประกาศความเป็นส่วนตัว</strong><br/></center>
  สําหรับลูกค้า พันธมิตรทางธุรกิจ และผู้มาติดต่อ หรือบุคคลภายนอก บริษัท ชาร์เตอร์ สแควร์ โฮลดิ้ง จํากัด (บริษัทฯ) ตระหนักถึงความสําคัญและถือปฏิบัติอย่างเคร่งครัดในสิทธิ และความเป็นส่วนตัวของเจ้าของข้อมูลส่วนบุคคล ทั้งของลูกค้า พันธมิตรทางธุรกิจ และผู้มาติดต่อ หรือบุคคลภายนอก ไม่ว่าจะเป็นวิธีการเก็บรวบรวม ใช้ และ/หรือเปิดเผยข้อมูล (เรียกรวมกันว่า “การประมวลผลข้อมูล”) เพื่อให้เป็นไปตามพรบ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 ซึ่งวัตถุประสงค์ในการเก็บรวบรวม ใช้ เปิดเผยข้อมูล ของท่าน ที่ให้ไว้กับทางบริษัทฯ เป็นไปเพื่อมอบผลิตภัณฑ์และการบริการที่ตรงกับความต้องการเฉพาะกับท่านอย่างเหมาะสม เพื่อการดําเนินธุรกิจร่วมกัน และเพื่อรักษาความปลอดภัยในการบริหารจัดการทางธุรกิจ ประกาศความเป็นส่วนตัวนี้ หมายรวมถึงเว็บไซต์ แอพพลิเคชันบนโทรศัพท์มือถือ ช่องทางสื่อสังคมออนไลน์ ช่องทางการสื่อสารทางออนไลน์ ทีได้มีการเก็บรวบรวมข้อมูลส่วนบุคคลของท่าน อย่างไรก็ตามกรุณาอ่าน ประกาศความเป็นส่วนตัว ควบคู่กับข้อตกลงและเงื่อนไข สําหรับบริการเฉพาะที่ท่านใช้<br/><br/>
  
  <strong>ข้อมูลส่วนบุคคล</strong><br/>
  “ข้อมูลส่วนบุคคล” หมายถึง ข้อมูลเกี่ยวกับบุคคลที่ยังมีชีวิตอยู่ ซึ่งทําให้สามารถระบุตัวบุคคลนั้นได้ ไม่ว่าทางตรงหรือทางอ้อม<br/>
  “ข้อมูลที่มีความอ่อนไหว” หมายถึง ข้อมูลส่วนบุคคลที่เกี่ยวกับเชื้อชาติ เผ่าพันธุ์ ความคิดเห็นทางการเมือง ความเชื่อในลัทธิ ศาสนาหรือปรัชญา พฤติกรรมทางเพศ ประวัติอาชญากรรม ข้อมูลสุขภาพ ความพิการ ข้อมูลสหภาพแรงงาน ข้อมูลพันธุกรรม ข้อมูลชีวภาพ เช่น ข้อมูลจําลองใบหน้า ข้อมูลจําลองม่านตา หรือข้อมูลจําลองลายนิ้วมือ<br/><br/>

  <strong>1. ข้อมูลส่วนบุคคลที่บริษัทฯเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูล</strong><br/>
  1.1 ข้อมูลส่วนตัว ได้แก่ คํานําหน้าชื่อ ชื่อ นามสกุล อายุ วันเกิด เพศ สัญชาติ รูปถ่าย วุฒิการศึกษา คุณสมบัติ ข้อมูลประกันภัย ทะเบียนบ้าน ข้อมูลที่เกี่ยวกับการประกอบอาชีพ (เช่น ตําแหน่งงาน สถานที่ทํางาน) ข้อมูลบนบัตรที่ออกโดยรัฐบาล (เช่น เลขที่บัตรประจําตัวประชาชน เลขหนังสือเดินทาง) ลายมือชื่อ ใบอนุญาต หรือเอกสารที่ใช้ในการระบุตัวตนอื่นๆ<br/>
  1.2 ข้อมูลเพื่อการติดต่อ ได้แก่ หมายเลขโทรศัพท์ หมายเลขโทรสาร ไลน์ไอดี (LINE ID) ที่อยู่ ประเทศที่พํานัก จดหมายอิเล็กทรอนิกส์ (e-mail) ข้อมูลผู้ติดต่อ และข้อมูลเพื่อการติดต่ออื่นๆ รวมถึงรายชื่อของพนักงานที่ท่านเกี่ยวข้องด้วย<br/>
  1.3 ข้อมูลเกี่ยวข้องกับยานพาหนะ ได้แก่ ใบอนุญาตขับขี่ ทะเบียนรถ ข้อมูลการจดทะเบียนรถ รวมถึงรายละเอียดต่างๆ ของยานพาหนะ<br/>
  1.4 ข้อมูลทางการเงิน ได้แก่ บัญชีธนาคาร สมุดเงินฝาก รายการเดินบัญชี ข้อมูลเลขบัตรเครดิต หนังสือค้ําประกันของธนาคาร และข้อมูลทางการเงินอื่นๆ<br/>
  1.5 ข้อมูลแสดงฐานะทางการเงิน ได้แก่ ข้อมูลของท่านที่เกี่ยวกับรายละเอียดความเสี่ยงสําหรับพันธมิตรทางธุรกิจ การจัดอันดับความน่าเชื่อถือทางเครดิตและความสามารถในการชําระหนี้ (credit rating and solvency) รวมถึงข้อมูลของสัญญาที่ปรากฏบนเอกสารโต้ตอบอื่นๆ เช่น จดหมายที่บริษัทฯ ได้สื่อสารไปถึงท่าน<br/>
  1.6 ข้อมูลอื่นๆ ที่ได้จัดเก็บรวบรวม หรือเปิดเผยข้อมูลที่เกี่ยวกับความสัมพันธ์ระหว่างบริษัทฯและพันธมิตรทางธุรกิจ เช่น ข้อมูลที่ท่านให้ไว้ในสัญญา แบบฟอร์ม<br/><br/>

  หากท่านได้ให้ข้อมูลส่วนบุคคลของบุคคลที่สามแก่บริษัทฯ เช่น ชื่อ และหมายเลขโทรศัพท์ ฯลฯ เพื่อการติดต่อในกรณีฉุกเฉิน บริษัทฯ จะถือว่าท่านได้ข้อมูลส่วนบุคคลของบุคคลดังกล่าวมาโดยชอบ ภายใต้ความยินยอมของบุคคลดังกล่าวแล้ว รวมทั้งมีสิทธิในการใช้หรือมอบให้ซึ่งข้อมูลส่วนบุคคลของบุคคลดังกล่าวแก่บริษัทฯ ได้ด้วย ในกรณีมีการกล่าวอ้างถึงการละเมิดสิทธิ์ของบุคคลดังกล่าว ท่านมีหน้าที่ต้องรับผิดชอบโดยตรงต่อบุคคลดังกล่าวเองทั้งสิ้น บริษัทฯ ไม่ต้องรับผิดชอบด้วยแต่อย่างใด<br/>

<strong>2. ข้อมูลส่วนบุคคลที่มีความอ่อนไหว</strong><br/>
บริษัทฯอาจมีความจําเป็นต้องเก็บรวบรวมข้อมูลที่มีความอ่อนไหว เช่น ศาสนา เชื้อชาติ ข้อมูลชีวภาพ (ลายนิ้วมือ) ข้อมูลทางการแพทย์ โดยบริษัทฯจะทําการขอความยินยอมจาก ท่านในการเก็บรวบรวม ใช้ และ/หรือเปิดเผย เว้นแต่<br/>
2.1 เพื่อป้องกันหรือระงับอันตรายต่อชีวิต ร่างกาย หรือสุขภาพของบุคคล <br/>
2.2เป็นข้อมูลที่เปิดเผยต่อสาธารณะด้วยความยินยอมโดยชัดแจ้งของเจ้าของข้อมูลส่วนบุคคล<br/>
2.3เป็นความจําเป็นในการปฏิบัติตามกฎหมายเพื่อให้บรรลุวัตถุประสงค์เกี่ยวกับ<br/>
2.3.1ประโยชน์ด้านการสาธารณะสุข เช่นการป้องกันด้านสุขภาพจากโรคติดต่ออันตรายหรือโรคระบาดอืน<br/>
2.3.2การศึกษาวิจัยทางวิทยาศาสตร์ ประวัติศาสตร์ หรือสถิติ หรือประโยชน์สาธารณะ<br/>
<strong>3. วัตถุประสงค์ในการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคลของท่าน </strong><br/>
การเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลของท่านตามวัตถุประสงค์เพื่อการใช้ ประโยชน์ของข้อมูลโดยชอบด้วย กฎหมาย เพื่อการทําหรือปฏิบัติตามสัญญา เพื่อการประโยชน์สาธารณะ เพื่อการขออนุญาต หรือตามที่กฎหมายอนุญาตให้กระทํา ซึ่งอาจเป็นกรณีดังต่อไปนี้ <br/>
3.1 การติดต่อสื่อสารทางธุรกิจ ได้แก่ การดําเนินการเพื่อการซื้อขาย การสื่อสารกับ พันธมิตรเกี่ยวกับสินค้า บริการ และงานโครงการของเราหรือของพันธมิตรทางธุรกิจ เช่น การตอบสนองตามที่สอบถามหรือความต้องการ การแจ้งถึงความคืบหน้า ผลที่ เกิดขึ้น <br/>
3.2 การคัดเลือกพันธมิตรทางธุรกิจ ได้แก่ การตรวจสอบถึงลักษณะเฉพาะและสถานะของ พันธมิตรทางธุรกิจ การตรวจสอบวิเคราะห์สถานะหรือภูมิหลังต่างๆ หรือการระบุและ จําแนกความเสียงของท่านและพันธมิตรทางธุรกิจ (รวมถึง รายชื่อผู้มีความเสียงของ ทางราชการ) การประเมินถึงความเหมาะสมและคุณสมบัติของท่านและพันธมิตรทาง ธุรกิจ การแจ้งเพื่อให้เสนอราคาหรือร่วมประมูลงาน การปฏิบัติตามสัญญาต่อท่านหรือ
พันธมิตรทางธุรกิจ<br/>
3.3 การจัดการข้อมูลของพันธมิตรทางธุรกิจ ได้แก่ การรักษาสถานะและการปรับปรุง บัญชีรายชื่อของพันธมิตรทางธุรกิจ (รวมถึงข้อมูลส่วนบุคคลของท่าน) การจัดเก็บ เอกสารสัญญาและเอกสารที่เกี่ยวข้องที่ท่านถูกอ้างถึง<br/>
3.4 การรักษาความปลอดภัยและระบบการเฝ้าระวัง ได้แก่ การจัดให้มีการพิสูจน์ยืนยัน
 ตัวตน การควบคุมการเข้าพื้นที่ และบันทึกการเข้า-ออกสถานที่ ระบบการเฝ้าระวัง 
 เครื่องมือที่ใช้งาน กล้องวงจรปิดและระบบอินเทอร์เน็ต ระบบสารสนเทศที่เกี่ยวกับการ 
 รักษาความปลอดภัยที่น่าเชื่อถือ การป้องกันและแก้ไขด้านอาชญากรรม รวมถึงการ บริหารจัดการความเสียง
  และการป้องกันการทุจริต<br/>
3.5 การสอบสวน การร้องทุกข์ และ/หรือ การป้องกันอาชญากรรมหรือการทุจริต <br/>
3.6 วัตถุประสงค์ด้านการตลาด ได้แก่ การแจ้งให้ท่านทราบถึงข่าวสารหรือประกาศ โฆษณาที่เป็นประโยชน์
 เหตุการณ์ การเสนอบริการใหม่ การจัดทําการสํารวจวิจัยข้อมูล<br/>
3.7 การบริหารด้านธุรกิจ ซึ่งไม่จํากัดเฉพาะการจัดการตามปกติและการจัดเก็บข้อมูลทาง ธุรกิจของบริษัทฯ
 การบันทึกโต้ตอบทีเกี่ยวเนื่องจากความสัมพันธ์ของเรากับท่าน หรือ เกี่ยวกับการบริหารจัดการ 
 หรือเนื่องมาจากการแก้ไขปัญหาโดยที่มีความจําเป็นต้อง
จัดเก็บข้อมูลส่วนบุคคลของท่านตามกฎหมาย หรือเพื่อการเข้าผูกพันหรือการปฏิบัติ
ตามสัญญาที่มีระหว่างกันและหากท่านไม่สามารถนําส่งข้อมูลเมื่อมีความต้องการ อาจ
ส่งผลให้ไม่สามารถบรรลุถึงวัตถุประสงค์ตามที่กล่าวมาข้างต้น
ในกรณีที่จะต้องขอความยินยอมในจัดเก็บรวบรวม ใช้หรือเปิดเผยข้อมูลส่วนบุคคล ของท่านเพื่อเหตุได 
เป็นการเฉพาะ บริษัทฯจะแจ้งให้ท่านให้ความยินยอมเช่นว่านั้น เป็นกรณีไป
<strong>4. บุคคลที่บริษัทฯอาจเปิดเผยข้อมูลส่วนบุคคลของท่านไปยังบุคคลภายนอก</strong><br/>
4.1 ผู้ให้บริการของบริษัทฯบริษัทฯอาจว่าจ้างบริษัทอื่น ตัวแทน หรือผู้รับจ้างในการให้บริการในนามของบริษัทฯ หรืออํานวยความสะดวกต่อการสร้างความสัมพันธ์ทางธุรกิจกับท่าน โดยบริษัทฯอาจ เปิดเผยข้อมูลส่วนบุคคลของท่าน ซึ่งรวมถึง<br/>
 (1) ผู้พัฒนาโครงสร้างพื้นฐาน ซอฟต์แวร์ และผู้พัฒนาเว็บไซต์ และผู้ให้บริการด้านเทคโนโลยี สารสนเทศ <br/>(2) ผู้ให้บริการด้านการชําระเงิน<br/> (3) บริษัทตัวแทนหรือหน่วยงานวิจัย (4) ผู้ให้บริการด้านการวิเคราะห์ข้อมูล<br/> (5) บริษัทตัวแทนหรือ หน่วยงานสํารวจวิจัยข้อมูล และ/หรือ ผู้เจรจาตกลงสินไหมทดแทน <br/>(6) ผู้ตรวจสอบ บัญชีหรือที่ปรึกษาด้านการเงิน (7) บริษัทตัวแทนหรือหน่วยงานด้านการติดต่อสื่อสาร สื่อโฆษณาและการตลาด <br/>(8) ผู้ให้บริการและตัวแทนด้านการชําระเงิน ระบบการชําระ เงิน การยืนยันตัวตน<br/> (9) ผู้ให้บริการด้านการบริหารจัดการที่เป็นบุคคลภายนอกที่ ได้รับการว่าจ้าง <br/>(10) ผู้ให้บริการด้านการจัดเก็บข้อมูลและบริการคลาวด์ (Cloud) ในระหว่างการบริหารความสัมพันธ์ทางธุรกิจของบริษัทฯ ผู้ให้บริการอาจจะต้อง เข้าถึงข้อมูลส่วนบุคคลของท่าน อย่างไรก็ตาม บริษัทฯจะให้ข้อมูลแก่ผู้ให้บริการของ บริษัทฯเพียงเท่าที่จําเป็นสําหรับการให้บริการดังกล่าวเท่านั้น และจะขอให้ผู้ให้บริการ ไม่ใช้ข้อมูลของท่านเพื่อวัตถุประสงค์อื่นแต่อย่างใด<br/>
4.2 ในบางกรณี อาจจะจําเป็นที่จะต้องเปิดเผยข้อมูลส่วนบุคคลของท่านเพื่อปฏิบัติตาม กฎหมาย หรือกฎข้อบังคับ ซึ่งรวมถึง การปฏิบัติตามหน่วยงานที่บังคับใช้กฎหมาย ศาล เจ้าพนักงาน หน่วยงานรัฐ หรือบุคคลภายนอกอื่นๆ ในกรณีที่เชื่อว่าจําเป็นจะต้องปฏิบัติ ตามหน้าที่ตามกฎหมายหรือกฎข้อบังคับทางกฎหมาย หรือเพื่อการปกป้องสิทธิของ
บริษัทฯ สิทธิของบุคคลอื่น หรือเพื่อความปลอดภัยของบุคคล หรือเพื่อตรวจสอบ ป้องกัน หรือจัดการเกี่ยวกับปัญหาการทุจริต หรือด้านความมั่นคงหรือความปลอดภัย<br/>
<strong>5. การปกป้องข้อมูลส่วนบุคคลของท่าน</strong><br/>
บริษัทฯ จะใช้มาตรการทางเทคนิคและการบริหารจัดการที่เหมาะสมเพื่อป้องกันและรักษา 
ความปลอดภัยของข้อมูลส่วนบุคคลและการควบคุมเข้าถึงข้อมูลส่วนบุคคลเฉพาะ
 ผู้เกี่ยวข้องเท่านั้นทั้งในส่วนของข้อมูลที่จัดเก็บในรูปแบบเอกสารและอิเล็กทรอนิกส์ <br/>
<strong>6. ระยะเวลาในการเก็บข้อมูลส่วนบุคคลของท่าน</strong><br/>
การเก็บรักษาข้อมูลส่วนบุคคลของท่านจะอยู่ในระยะเวลาเท่าที่จําเป็นอย่างสมเหตุสมผล
เพื่อให้บรรลุตามวัตถุประสงค์ที่ได้รับข้อมูลส่วนบุคคลนั้นมา และเพื่อปฏิบัติตาม 
ภาระหน้าที่ทางกฎหมายและกฎข้อบังคับต่างๆ อย่างไรก็ตาม บริษัทฯอาจเก็บข้อมูลส่วน 
บุคคลของท่านนานขึ้นหากจําเป็นตามกฎหมายที่ใช้บังคับ<br/>
 <strong>7. การเปลี่ยนแปลงประกาศความเป็นส่วนตัว</strong><br/>
บริษัทฯ ขอสงวนสิทธิ์ในการแก้ไขประกาศความเป็นส่วนตัวนี้ 
เป็นครั้งคราว ดังนั้นโปรด ตรวจสอบประกาศความเป็นส่วนตัวนี้ การเปลี่ยนแปลงใดๆ
 จะมีผลทันทีเมื่อเราเผยแพร่ ประกาศความเป็นส่วนตัว นี้ ผ่านในเว็บไซต์หรือแอปพลิเคชันของบริษัทฯ<br/>
<strong>8. สิทธิของเจ้าของข้อมูลส่วนบุคคล </strong><br/>
ภายใต้บทบัญญัติแห่งกฎหมายและข้อยกเว้นตามกฎหมายที่เกี่ยวข้อง ท่านอาจ
มีสิทธิตามที่ระบุไว้ดังต่อไปนี้<br/>
8.1 สิทธิในการขอเข้าถึงและขอรับสําเนาเกี่ยวกับข้อมูลของตนเองได้ เพื่อ ความเป็นส่วนตัวและความปลอดภัยของท่าน
 บริษัทฯ อาจขอให้ท่านพิสูจน์ ตัวตนของท่านก่อนจะให้ข้อมูลตามที่ท่านร้องขอ<br/>
8.2 สิทธิในการถอนความยินยอมของท่าน ณ เวลาใด ก็ได้ ทั้งนี้ การขอถอนความ ยินยอมดังกล่าว 
จะไม่มีผลกระทบการดําเนินการตามกฎหมายที่เกิดขึ้นมาก่อนหน้าที ท่านขอถอนความยินยอม 
ในกรณีที่มีการถอนความยินยอม บริษัทฯจะใช้ข้อมูลส่วน 8.3 สิทธิ์ในการแจ้งเพื่อให้มีการแก้ไข
 เปลี่ยนแปลง ในกรณีที่ข้อมูลไม่ถูกต้อง 8.4 สิทธิในการขอให้บริษัทฯ ลบ 
 หรือทําลายข้อมูลส่วนบุคคลของท่าน หรือทํา ให้ข้อมูลไม่สามารถระบุตัวตนของเจ้าของข้อมูลส่วนบุคคลได้ 
 เว้นแต่การเก็บ รักษาข้อมูลดังกล่าวของบริษัทฯนั้นเป็นไปเพื่อการปฏิบัติตามกฎหมาย
บุคคลของท่านเฉพาะกรณีตามที่กฎหมายอนุญาตให้กระทําได้เท่านั้น<br/>
8.5 สิทธิในการขอโอนย้ายข้อมูลไปยังผู้ควบคุมข้อมูลส่วนบุคคลอื่นโดยต้องเป็น
 ข้อมูลส่วนบุคคลที่ท่านได้ให้ไว้และกรณีที่ได้รับความยินยอมจากท่านในการเก็บ 
 รวบรวม ใช้ หรือเปิดเผยหรือเพื่อปฏิบัติตามสัญญาที่บริษัทฯมีกับท่าน<br/>
8.6 สิทธิในการขอให้ระงับการใช้ข้อมูลส่วนบุคคลตามที่กฎหมายกําหนด <br/>
8.7 สิทธิในการคัดค้านการเก็บรวบรวม ใช้หรือเปิดเผยข้อมูลส่วนบุคคล เช่น การคัดค้านการตลาดแบบตรง<br/>
8.8 สิทธิในการร้องเรียน หากพบการละเมิดการใช้ข้อมูล ไม่สอดคล้องกับพรบ. คุ้มครองข้อมูลที่บังคับใช้<br/>
<strong>9. ช่องทางการติดต่อบริษัทฯ</strong><br/>
หากเจ้าของข้อมูลส่วนบุคคล ที่เกี่ยวข้องกับบริษัทฯ ต้องการติดต่อเพื่อขอใช้สิทธิ์ของ เจ้าของข้อมูลส่วนบุคคล หรือหากมีข้อสงสัยเกี่ยวกับข้อมูลส่วนบุคคลของท่านภายใต้ ประกาศความเป็นส่วนตัวฉบับนี้ ท่านสามารถติดต่อบริษัทฯ ผ่านช่องทาง ดังต่อไปนี้
บริษัท ชาร์เตอร์ สแควร์ โฮลดิ้ง จํากัด
สถานที่ติดต่อ : เลขที่ 152 อาคาร ชาร์เตอร์ สแควร์ ถนนสาทรเหนือ แขวงสีลม เขตบางรัก กรุงเทพฯ 10500
โทรศัพท์ : 02-637-8000     อีเมล : cts pdpa@charteredsquare.com
จึงประกาศมาเพื่อทราบโดยทั่วกัน ประกาศ ณ วันที่ 1 มิถุนายน 2565<br/>

นางทัศนีย์ ยังมี 
รองประธาน



                   				   <strong>หนังสือให้ความยินยอม </strong><br/>
(ภายใต้พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 )
หนังสือฉบับนี้ ข้าพเจ้าซึ่งได้ลงลายมือชื่อไว้ท้ายหนังสือฉบับนี้ (เจ้าของข้อมูลส่วนบุคคล) ได้ติดต่อ ธุรกิจ 
หรือทําธุรกรรมกับ บริษัท ชาร์เตอร์ สแควร์ โฮลดิ้ง จํากัด (ต่อไปจะขอเรียกว่า บริษัท) ข้าพเจ้าได้ 
อ่านและรับทราบรายละเอียดในประกาศความเป็นส่วนตัว รวมถึงสิทธิของเจ้าของข้อมูลส่วนบุคคลของ 
บริษัทแล้ว จึงทําหนังสือฉบับนี้มอบให้แก่บริษัท ตามข้อกําหนดและเงื่อนไข ดังต่อไปนี้<br/>
<strong>1. ข้อมูลส่วนบุคคล</strong><br/>
ข้อมูลส่วนบุคคลของข้าพเจ้าตามหนังสือฉบับนี้ ได้แก่ ชื่อ-นามสกล, ชื่อบริษัท, 
เบอร์ โทรศัพท์, อีเมล์ และ ข้อมูลอื่นที่อาจเกี่ยวข้องกับการร้องขอบริการเซ่นเลขทะเบียนรถ หรือ Line ID เป็นต้น<br/>
 <strong>2.วัตถุประสงค์เฉพาะในการให้ความยินยอม</strong><br/>
เพื่อให้บริษัทใช้ข้อมูลในการบริหารจัดการ และอํานวยความสะดวกในการให้บริการของอาคารชาร์
เตอร์ สแควร์<br/>
<strong>3.แหล่งทีมาของซ้อม ส่วนบุคคล </strong><br/>
ข้อมูลส่วนบุคคลของข้าพเจ้าตามหนังสือฉบับนี้ เป็นข้อมูลที่ข้าพเจ้าเป็นผู้มอบให้บริษัทเอง
 และ/หรือ ที่ บริษัทมีอยู่แล้ว หรือได้มาก่อนหน้านี้จากการติดต่อธุรกิจหรือทําธุรกรรมก่อนหน้ากับข้าพเจ้า 
 หรือที่ ได้มาจากแหล่งอื่นๆ เช่น การติดต่อกันทางอีเมล์, ตามที่ปรากฏอยู่บนเวบไซต์ต่างๆ,
  โปรแกรมค้นหา ข้อมูลออนไลน์ Search Engine เป็นต้น <br/>
<strong>4.ระยะเวลาในการให้ความยินยอม </strong><br/>
ข้าพเจ้ายินยอมให้บริษัทประมวลผลข้อมูล โดยการเก็บรวบรวม ใช้ เปิดเผยข้อมูลส่วนบุคคลของ 
ข้าพเจ้าได้ ภายในระยะเวลาตามที่จําเป็นเพียงเพื่อดําเนินการจนบรรณหรือแล้วเสร็จตามวัตถุประสงค์ใน 
ข้อ 2 ข้างต้น หรือตามที่กฎหมายกําหนด<br/>
<strong>5.การใช้สิทธิของเจ้าของข้อมูลส่วนบุคคล</strong><br/>
กรณีข้าพเจ้าประสงค์จะใช้สิทธิ์ในการเข้าถึง แก้ไข รับสําเนา ระงับ คัดค้าน
 หรือร้องเรียนการใช้ข้อมูล ส่วนบุคคล รวมถึงเพิกถอนความยินยอมตามหนังสือฉบับนี้ก็สามารถทําได้ 
 โดยแจ้งความประสงค์ตาม แบบฟอร์มคําร้องขอใช้สิทธิ์ และติดต่อผ่านช่องทางด้านล่างนี้ 
 ซึ่งการใช้สิทธิดังกล่าวนี้จะมีผลบังคับใช้ นับแต่วันทีบริษัทตอบรับการใช้สิทธิ์เป็นต้นไป
  โดยข้าพเจ้าขอยอมรับต่อผลกระทบจากการใช้บริการ ของบริษัทที่เนื่องมาจากการใช้สิทธิ์นั้นๆ 
  แต่กรณีการเพิกถอนความยินยอมจะไม่กระทบการใดๆ ที บริษัทได้ทําไปแล้วโดยชอบก่อนหน้านั้น<br/>
<strong>6. ช่องทางติดต่อ</strong><br/>
ศูนย์ควบคุมข้อมูลส่วนบุคคล บริษัท ชาร์เตอร์ สแควร์ โฮลติ้ง จํากัด ตั้งอยู่ที่ 152 
ถนนสาทรเหนือ แขวง สีลม เขตบางรัก กรุงเทพมหานคร 10500 เบอร์โทรศัพท์ : 02-637-8000
 cts_pdpa@charteredsquare.com
ข้าพเจ้าได้อ่านและเข้าใจรายละเอียดทั้งหมดแล้ว และยินยอมให้บริษัท 
เก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลของข้าพเจ้า ตามหนังสือฉบับนี้ได้ทุกประการ<br/>
               ลงชื่อ……………………………………เจ้าของข้อมูลส่วนบุคคล/ผู้ให้<br/>
ความยินยอม<br/>
                              (Click here to enter text )<br/>
                               ณ วันที่ 20 สิงหาคม 2565<br/>


หมายเหตุ: ประกาศความเป็นส่วนตัว” ของบริษัท สามารถดูรายละเอียดเพิ่มเติมได้ที่ www.charteredsquare.com



            </p>
          )}
        </div>
  
        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-auto">
          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={checkbox1}
                onChange={() => setCheckbox1(!checkbox1)}
                className="form-checkbox text-[#85A98F] h-4 w-4"
              />
              <span className="text-sm text-[#5A6C57]">
                {language === "TH"
                  ? "I agree to the terms and conditions"
                  : "ฉันยอมรับเงื่อนไขและข้อกำหนดทั้งหมด"}
              </span>
            </label>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-3 py-1 bg-gray-400 text-white rounded-lg text-xs sm:text-sm"
            >
              {language === "TH" ? "Cancel" : "ยกเลิก"}
            </button>
            <button
              type="submit"
              className={`px-3 py-1 rounded-lg text-xs sm:text-sm ${
                checkbox1
                  ? "bg-[#85A98F] text-white hover:bg-[#5A6C57]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!checkbox1}
            >
              {language === "TH" ? "Accept" : "ยอมรับ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
};

export default PdpaPage;
