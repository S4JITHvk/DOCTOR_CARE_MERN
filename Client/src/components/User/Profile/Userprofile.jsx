import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { FiUpload, FiTrash } from "react-icons/fi";
import fetchUser from "../../../Services/usersFetch";
import Swal from "sweetalert2";
import {
  Editprofile,
  deleteprofilepic,
} from "../../../Services/User/userService";
function Userprofile() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [name, setName] = useState(user.user.name);
  const [email, setEmail] = useState(user.user.email);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setName(user.user.name);
    setEmail(user.user.email);
    setSelectedImage(user.user.profile);
  }, [user.user]);

  const handleNameChange = (event) => {
    setName(event.target.value);
    setIsChanged(
      event.target.value.trim() !== user.user.name || imageFile !== null
    );
    if (event.target.value.trim() === "") {
      setErrors((prevErrors) => ({ ...prevErrors, name: "Name is required" }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    const previewImageUrl = URL.createObjectURL(file);
    setSelectedImage(previewImageUrl);
    setIsChanged(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name.trim() === "") {
      setErrors((prevErrors) => ({ ...prevErrors, name: "Name is required" }));
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (imageFile) {
      formData.append("profilePic", imageFile);
    }
    const response = await Editprofile(formData);
    if (response.status === 200) {
      toast.success("Profile updated successfully");
      fetchUser(dispatch);
      setIsChanged(false);
    } else {
      toast.error("Failed to update profile");
    }
  };

  const handleDeleteImage = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Remove Profile image.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const response = await deleteprofilepic();
      if (response.status === 200) {
        fetchUser(dispatch);
        setSelectedImage(null);
        setImageFile(null);
        toast.success("Profile Picture removed successfully.");
      } else {
        toast.error("Failed to update profile");
      }
    }
  };

  return (
    <div className="col-span-4 sm:col-span-9 flex justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center mb-6">
            <img
              src={selectedImage ? selectedImage : "/assets/user.png"}
              className="w-32 h-32 bg-gray-300 rounded-full mb-4 border-4 border-gray-200 object-cover"
              alt="Profile"
            />
            <div className="flex items-center justify-center mb-4 space-x-4">
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-blue-500 hover:text-blue-700"
              >
                <FiUpload className="text-2xl" />
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
              {selectedImage && selectedImage !== "/assets/user.png" && (
                <button
                  type="button"
                  onClick={handleDeleteImage}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiTrash className="text-2xl" />
                </button>
              )}
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              placeholder="Enter your name"
              value={name}
              onChange={handleNameChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-2">{errors.name}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              value={email}
              readOnly
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className={`bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold py-2 px-8 rounded-full focus:outline-none focus:shadow-outline transform transition-transform duration-300 ${
                !isChanged && "opacity-50 cursor-not-allowed"
              }`}
              disabled={!isChanged}
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Userprofile;
