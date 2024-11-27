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
  const maxPoints = 10000;
  const progressWidth = Math.min((points / maxPoints) * 100, 100);
  const menuRef = useRef(null);

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-300 via-green-100 to-green-50">
      <div className="bg-white shadow-lg rounded-3xl p-4 w-full max-w-md relative">
        {/* Profile Header */}
        <div className="absolute top-4 right-4 flex items-center space-x-4">
          <img
            src={profileImage}
            alt="Profile"
            className="w-8 h-8 rounded-full shadow-md border-2 border-green-400"
          />
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-6 h-6 text-gray-600 transform transition-transform ${
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
            className="absolute right-4 top-16 bg-white shadow-lg rounded-lg w-44 z-20"
          >
            <ul>
              <li
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer text-gray-700 flex items-center"
                onClick={() => navigate('/editprofile')}
              >
                <span className="material-icons text-gray-500 mr-2">edit</span>
                Edit Profile
              </li>
              <li
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer text-gray-700 flex items-center"
                onClick={() => navigate('/pdpashow')}
              >
                <span className="material-icons text-gray-500 mr-2">policy</span>
                Consent
              </li>
              <li
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer text-gray-700 flex items-center"
                onClick={() => navigate('/allreward')}
              >
                <span className="material-icons text-gray-500 mr-2">redeem</span>
                All Rewards
              </li>
              <li
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer text-gray-700 flex items-center"
                onClick={() => navigate('/redeemedhistory')}
              >
                <span className="material-icons text-gray-500 mr-2">history</span>
                History Redeem
              </li>
            </ul>
          </div>
        )}
  
        {/* Membership Card */}
        <div
          className={`flex items-center justify-between p-10 rounded-xl shadow-md relative text-white mt-10 ${getBackgroundColor(
            prvType
          )}`}
          style={{ height: '190px' }} // ตั้งความสูงสำหรับการ์ด
        >
          {/* Logo */}
          <div className="flex flex-col items-center">
            <div className="relative">
              {/* วงกลมรอบตัว C */}
              <div className="w-20 h-20 rounded-full border-4 border-[#fbbd5c] flex items-center justify-center shadow-lg ">
                <div className="w-14 h-14 rounded-full border-4 border-[#fbbd5c] flex items-center justify-center shadow-md ">
                  <p className="text-[32px] font-extrabold bg-gradient-to-br from-[#fbd55b] to-[#d8a93a] bg-clip-text text-transparent">
                    C
                  </p>
                </div>
              </div>
              {/* ขีดด้านล่าง */}
              <div className="w-8 h-2 bg-gradient-to-r from-[#fbbd5c] to-[#d8a93a] mt-2 mx-auto shadow-sm"></div>
            </div>
          </div>
  
          {/* Card Details */}
          <div className="ml-4 flex-1">
            <h1 className="text-lg font-extrabold bg-gradient-to-r from-[#fbbd5c] to-[#d9a93a] bg-clip-text text-transparent">
              CHEE CHAN
            </h1>
            <p className="text-xs uppercase tracking-wider bg-gradient-to-r from-[#fbd55b] to-[#d8a93a] bg-clip-text text-transparent">
              Privilege Card
            </p>
            <div className="mt-2">
              <p className="text-xs tracking-wide">Points</p>
              <p className="text-lg font-semibold">{points}</p>
              <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${progressWidth}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
  
  
        <div className="flex justify-between mt-6">
          <p className="text-sm font-medium">Expire Date</p>
          <p className="text-sm">
            {loading ? 'Loading...' : expireDate ? new Date(expireDate).toLocaleDateString() : 'N/A'}
          </p>
        </div>
  
        <button
          onClick={() => navigate('/viewreward')}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-3 w-full rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md text-md font-medium mt-4"
        >
          View Rewards
        </button>
      </div>
    </div>
  );
  
  
};

export default ProfilePage;
