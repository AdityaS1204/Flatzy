import React, { useState, useEffect } from "react";
import AdminDashboard from "./AdminDashboard";
import AdminLogin from "../Components/AdminLogin";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminData, setAdminData] = useState(null);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const storedAdminData = localStorage.getItem('adminData');
    
    if (token && storedAdminData) {
      try {
        const admin = JSON.parse(storedAdminData);
        setAdminData(admin);
        setIsLoggedIn(true);
        console.log('✅ User already logged in:', admin.username);
      } catch (error) {
        console.error('❌ Error parsing stored admin data:', error);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
      }
    }
  }, []);

  const handleLogin = (loginData) => {
    setAdminData(loginData.admin);
    setIsLoggedIn(true);
    console.log('✅ Login successful:', loginData.admin.username);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setAdminData(null);
    setIsLoggedIn(false);
    console.log('👋 User logged out');
  };

  return (
    <>
      {isLoggedIn ? (
        <AdminDashboard onLogout={handleLogout} adminData={adminData} />
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </>
  );
};

export default Admin;



// <div className='flex justify-center items-center flex-col h-96 border p-1'>
//               <p className='text-2xl font-bold my-6'>For Students</p>
//               <ul className='flex flex-col gap-1.5'>
//               {students.map((student, index) => (
//                 <li key={index} className='flex gap-2'><Rocket color='blue'/>{student}</li>
//               ))}
//               </ul>
//             </div>









// <div className="overflow-hidden w-full flex justify-center items-center gap-6 h-full border p-1">
// <motion.div
//   className="flex gap-20 w-max h-full px-2"
//   initial={{ opacity: 0, x: -100 }}
//   animate={{ opacity: 1, x: 100 }}
//   transition={{ duration: 0.7 }}
// >
  
//   <div className='right w-96 h-96 border p-1'>
//     <img src={'https://www.colive.com/blog/wp-content/uploads/2022/07/Pg.jpg'} alt="students in pg" className='h-full w-full rounded-2xl object-cover' />
//   </div>
// </motion.div>
// </div>