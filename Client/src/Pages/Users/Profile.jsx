import React from 'react'
import Userprofile from '../../components/User/Profile/Userprofile'
import Sidebar from '../../components/User/Profile/Sidebar'
function Profile() {
  return (
    <div className="bg-gray-100">
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
        <Sidebar />
        <Userprofile/>
      </div>
    </div>
  </div>
  )
}

export default Profile
