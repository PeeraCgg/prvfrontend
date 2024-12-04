import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import liff from '@line/liff'; // Import LIFF SDK
import { getLineUserId } from '../utils/storage';
import axios from 'axios';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [displayName, setDisplayName] = useState('User');
  const [expireDate, setExpireDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [points, setPoints] = useState(0);
  const [prvType, setPrvType] = useState('');
  const menuRef = useRef(null);
  const [isFront, setIsFront] = useState(true); // สถานะหน้าหรือหลังบัตร
  const toggleCard = () => setIsFront((prev) => !prev); // ฟังก์ชัน Toggle Card
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Initialize LIFF
        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });

        if (liff.isLoggedIn()) {
          const profile = await liff.getProfile();
          setProfileImage(profile.pictureUrl);
          setDisplayName(profile.displayName);
        } else {
          liff.login();
        }

        const lineUserId = getLineUserId();
        if (!lineUserId) {
          alert('Line User ID is missing. Please log in again.');
          navigate('/');
          return;
        }

        setLoading(true);
        const privilegeResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/get-user-privilege`,
          { params: { lineUserId } }
        );

        const { prvType, prvExpiredDate, currentPoint } = privilegeResponse.data.data;

        setExpireDate(prvExpiredDate);
        setPoints(currentPoint);
        setPrvType(prvType);
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getBackgroundColor = (type) => {
    switch (type.toLowerCase()) {
      case 'silver':
        return 'bg-gradient-to-r from-gray-200 to-gray-300';
      case 'gold':
        return 'bg-gradient-to-r from-yellow-200 to-yellow-300';
      case 'platinum':
        return 'bg-gradient-to-r from-gray-400 to-gray-500';
      case 'diamond':
        return 'bg-gradient-to-r from-indigo-500 to-indigo-600';
      default:
        return 'bg-gradient-to-r from-gray-200 to-gray-300';
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#D3F1DF] px-4">
      <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 w-full max-w-xs sm:max-w-sm md:max-w-md relative">
        
        {/* My Card Label */}
        <div className="absolute top-7 left-4 text-lg font-bold text-gray-700">
          My Card
        </div>
    
        {/* Profile Header */}
        <div className="absolute top-4 right-4 flex items-center space-x-2 bg-gradient-to-r from-[#85A98F] to-[#5A6C57] px-3 py-2 rounded-full shadow-md border border-gray-300">
          <img
            src={profileImage}
            alt="Profile"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-md border-2 border-white"
          />
          <div className="flex items-center space-x-1">
            <span className="bg-[#fbbd5c] text-white font-bold text-xs px-2 py-1 rounded-full shadow">
              P
            </span>
            <p className="text-white font-semibold text-xs sm:text-sm">{points}</p>
          </div>
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-5 h-5 sm:w-6 sm:h-6 text-white transform transition-transform ${
                menuOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
    
        {/* Dropdown Menu */}
        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute right-4 top-16 bg-white shadow-lg rounded-lg w-44 z-20 border border-gray-200"
          >
            <ul>
              <li
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer text-gray-700 flex items-center"
                onClick={() => navigate('/editprofile')}
              >
                Edit Profile
              </li>
              <li
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer text-gray-700 flex items-center"
                onClick={() => navigate('/pdpashow')}
              >
                Consent
              </li>
              <li
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer text-gray-700 flex items-center"
                onClick={() => navigate('/allreward')}
              >
                All Rewards
              </li>
              <li
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer text-gray-700 flex items-center"
                onClick={() => navigate('/redeemedhistory')}
              >
                History Redeem
              </li>
            </ul>
          </div>
        )}
  
        {/* Membership Card */}
        <div
          className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-xl shadow-lg text-white mt-20 ${getBackgroundColor(
            prvType
          )}`}
          style={{ height: '220px' }}
        >
          {isFront ? (
            <>
              {/* Front Side */}
              {/* Circle Decoration */}
              <div className="flex flex-col items-center mt-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-4 border-[#fbbd5c] flex items-center justify-center shadow-lg">
                    <div className="w-12 h-12 rounded-full border-4 border-[#fbbd5c] flex items-center justify-center shadow-md">
                      <p className="text-xl font-extrabold bg-gradient-to-br from-[#fbd55b] to-[#d8a93a] bg-clip-text text-transparent">
                        C
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-2 bg-gradient-to-r from-[#fbbd5c] to-[#d8a93a] mt-1 mx-auto shadow-sm"></div>
                </div>
              </div>

              {/* Card Details */}
              <div className="flex flex-col items-center -mt-10">
                <h1 className="text-md font-extrabold bg-gradient-to-r from-[#fbbd5c] to-[#d9a93a] bg-clip-text text-transparent text-center">
                  CHEE CHAN
                </h1>
                <p className="text-xs uppercase tracking-wider bg-gradient-to-r from-[#fbd55b] to-[#d8a93a] bg-clip-text text-transparent text-center">
                  Privilege Card
                </p>
              </div>

              {/* Expiry Date */}
              <div className="absolute bottom-2 right-4 text-xs text-gray-200">
                {loading
                  ? 'Loading...'
                  : expireDate
                  ? `Expire: ${new Date(expireDate).toLocaleDateString()}`
                  : 'N/A'}
              </div>
            </>
          ) : (
            <>
             {/* Back Side */}
<div className="flex flex-col items-center justify-center h-full">
  {/* QR Code */}
  <img
    src="https://cheechangolf.com/wp-content/uploads/2020/01/M.png"
    alt="QR Code"
    className="w-24 h-24 object-contain mb-4"
  />
  
  {/* Text Below QR Code */}
  <h1 className="text-md font-extrabold bg-gradient-to-r from-[#fbbd5c] to-[#d9a93a] bg-clip-text text-transparent text-center">
    CHEE CHAN
  </h1>
  <p className="text-xs uppercase tracking-wider bg-gradient-to-r from-[#fbd55b] to-[#d8a93a] bg-clip-text text-transparent text-center">
    Privilege Card
  </p>
</div>
            </>
          )}
             </div>

{/* Toggle Slider */}
<div className="flex justify-center mt-4">
  <div
    onClick={toggleCard}
    className={`relative w-8 h-8 border rounded-full shadow-inner flex items-center justify-center cursor-pointer transition-all duration-300 ${
      isFront ? 'bg-gray-100 border-gray-300' : 'bg-blue-500 border-blue-700'
    }`}
  >
    {/* Slider Button */}
    <div className="h-6 w-6 rounded-full bg-white shadow-md"></div>
  </div>
</div>

        {/* Terms and Conditions */}
        <div className="mt-6 text-left">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Terms & Conditions</h3>
          <div className="text-sm text-gray-700 max-h-32 overflow-y-auto space-y-2 border border-gray-200 p-4 rounded-lg bg-[#F9F9F9] shadow-inner">
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Chee Chan Privilege Card is valid for 1 year from the issued date.</li>
              <li>Cardholder must show the Privilege Card to access benefits.</li>
              <li>Benefits are non-transferable to any other individual.</li>
              <li>The cardholder must present the card at the Chee Chan Golf Resort for privileges.</li>
              <li>
                Chee Chan Golf Resort reserves the right to adjust prices or impose additional restrictions.
              </li>
              <li>Changes may be applied at any time with or without prior notice.</li>
            </ul>
          </div>
        </div>
  
        <button
          onClick={() => navigate('/exchangeDemo')} // viewreward realpage
          className="bg-gradient-to-r from-[#85A98F] to-[#5A6C57] text-white py-3 px-4 w-full rounded-lg hover:from-[#5A6C57] hover:to-[#85A98F] transition-all duration-300 shadow-md text-sm sm:text-md font-medium mt-6"
        >
          View Rewards
        </button>
      </div>
    </div>
  );
};
  
  
  
  


export default ProfilePage;
