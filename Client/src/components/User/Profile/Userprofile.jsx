import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Api from "../../../API/DoctorCareApi"
import { FiUpload } from "react-icons/fi";
import toast from "react-hot-toast"
function Userprofile() {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState(user.user.name);
  const [email,setEmail]=useState("")
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setName(user.user.name);
    setEmail(user.user.email);
  }, [user.user.name, user.user.email]);

  const handleNameChange = (event) => {
    setName(event.target.value);
    if (event.target.value.trim() === '') {
      setErrors((prevErrors) => ({ ...prevErrors, name: 'Name is required' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
    }
  };

  const handleImageChange = (event) =>{
    console.log("image change");
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log(file,"file")
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file);
      uploadImage(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name.trim() === '') {
      setErrors((prevErrors) => ({ ...prevErrors, name: 'Name is required' }));
      return;
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (imageFile) {
      formData.append('profilePic', imageFile);
    }
    try {
      const response = await Api.post('/editprofile', formData);
      if (response.status === 200) {
        toast.success("Profile updated successfully")
        console.log('Profile updated successfully');
      } else {
        toast.error("Failed to update profile")
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const uploadImage = (file) => {
    if (file) {
      const formData = new FormData();
      formData.append('profile', file);

      Api.post('/uploadprofileimage', formData)
        .then((response) => {
          if (!response.data.success) {
            throw new Error('Failed to upload profile image');
          }
          console.log('Response from server:', response.data);
          toast.success('Profile image uploaded successfully!');
        })
        .catch((error) => {
          console.error('Error uploading profile image:', error);
        });
    }
  };

  

  return (
    <div className="col-span-4 sm:col-span-9 flex justify-center">
      <div className="bg-white shadow rounded-lg p-6 w-full max-w-xl">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center mb-4">
            <img
              src={selectedImage ? selectedImage:"/assets/user.png"}
              className="w-32 h-32 bg-gray-300 rounded-full mb-4"
              alt="Profile"
            />
            <div className="flex items-center justify-center mb-4">
              <label htmlFor="file-upload" className="cursor-pointer">
                <FiUpload className="text-2xl" />
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
            <input
              type="text"
              id="name"
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              placeholder="Enter your name"
              value={name}
              onChange={handleNameChange}
            />
            {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              value={user.user.email}
              readOnly
            />
          </div>
          <div className="flex justify-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Userprofile;
