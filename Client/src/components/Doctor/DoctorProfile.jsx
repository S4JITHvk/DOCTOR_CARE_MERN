import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from "react-hot-toast";
import { FiUpload, FiTrash } from "react-icons/fi";
import fetchDoctor from "../../Services/Doctorfetch";
import Swal from 'sweetalert2';
import {docedit_profile,doc_profilepic} from "../../Services/Doctor/doctorService"
import Compressor from 'compressorjs';
function DoctorProfile() {
  const [selectedImage, setSelectedImage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [expertise, setExpertise] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [workingHospital, setWorkingHospital] = useState('');
  const [workingHospitalContact, setWorkingHospitalContact] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [medicalLicenseNo, setMedicalLicenseNo] = useState('');
  const [errors, setErrors] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const dispatch = useDispatch();
  const Doctor = useSelector((state) => state.doctor);

  useEffect(() => {
    if (Doctor.doctor) {
      setName(Doctor.doctor.name);
      setEmail(Doctor.doctor.email);
      setPhoneNumber(Doctor.doctor.phone_number);
      setExpertise(Doctor.doctor.expertise);
      setExperienceYears(Doctor.doctor.experience_years);
      setWorkingHospital(Doctor.doctor.working_Hospital);
      setWorkingHospitalContact(Doctor.doctor.working_Hospital_contact);
      setDob(Doctor.doctor.dob.split('T')[0]);
      setGender(Doctor.doctor.gender);
      setMedicalLicenseNo(Doctor.doctor.medical_license_no);
      setSelectedImage(Doctor.doctor.profile || ''); 
    }
  }, [Doctor.doctor]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      new Compressor(file, {
        quality: 0.6, 
        maxWidth: 800, 
        maxHeight: 800,
        success(result) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setSelectedImage(reader.result);
            setImageFile(result);
            setIsChanged(true);
          };
          reader.readAsDataURL(result);
        },
        error(err) {
          console.log(err.message);
        },
      });
    }
  };
  const handleChange = (setter) => (event) => {
    setter(event.target.value);
    setIsChanged(true);
  };

  const validateForm = () => {
    const newErrors = {};
    if (name.trim() === '') {
      newErrors.name = 'Name is required';
    }
    if (phoneNumber.trim() === '' || !/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Phone number is required and must be 10 digits';
    }
    if (dob.trim() === '') {
      newErrors.dob = 'Date of birth is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone_number', phoneNumber);
    formData.append('dob', dob);
    if (imageFile) {
      formData.append('profilePic', imageFile);
    }
      const response = await docedit_profile(formData) 
      if (response.status === 200) {
        toast.success("Profile updated successfully");
        fetchDoctor(dispatch);
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
        confirmButtonText: "Yes, delete it!"
      });

      if (result.isConfirmed) {
        const response = await doc_profilepic()
        if (response.status === 200) {
          fetchDoctor(dispatch);
          setSelectedImage(null);
          setImageFile(null);
          toast.success("Profile Picture removed successfully.");
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } else {
          toast.error("Failed to update profile");
        }
      }
    } 
  


  return (
    <div className="col-span-4 sm:col-span-9 flex justify-center ">
      <div className="bg-white shadow rounded-lg px-8 py-10 w-full max-w-6xl">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center mb-6">
            <img
              src={selectedImage || "/assets/doctor.jpg"}
              className="w-24 h-24 bg-green-500 rounded-full mb-4 mt-2 object-cover"
              alt="Profile"
            />
            <div className="flex items-center justify-center mb-4">
              <label htmlFor="file-upload" className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
                <FiUpload className="text-2xl" />
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
              {selectedImage && selectedImage !== "/assets/doctor.jpg" && (
                <button
                  type="button"
                  onClick={handleDeleteImage}
                  className="ml-4 bg-red-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-red-700 transition duration-300 ease-in-out"
                >
                  <FiTrash className="text-2xl" />
                </button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className='font-bold text-fuchsia-600 underline ml-10 text-lg'>PERSONAL DETAILS</div>
            <div className='font-bold text-fuchsia-600 underline ml-10 text-lg'>PROFESSIONAL DETAILS</div>
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
              <input
                type="text"
                id="name"
                className="w-full border border-green-500 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                placeholder="Enter your name"
                value={name}
                onChange={handleChange(setName)}
              />
              {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
            </div>
            <div className="mb-6">
              <label htmlFor="medical_license_no" className="block text-gray-700 font-bold mb-2">Medical License Number</label>
              <input
                type="text"
                id="medical_license_no"
                className="w-full border border-green-500 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                placeholder="Enter your medical license number"
                value={medicalLicenseNo}
                readOnly
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight custom-border-green focus:border-blue-500 border-green-500"
                placeholder="Enter your email"
                value={email}
                readOnly
              />
            </div>
            <div className="mb-6">
              <label htmlFor="expertise" className="block text-gray-700 font-bold mb-2">Expertise</label>
              <input
                type="text"
                id="expertise"
                className="w-full border border-green-500 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                placeholder="Enter your expertise"
                value={expertise}
                readOnly
              />
            </div>
            <div className="mb-6">
              <label htmlFor="phone_number" className="block text-gray-700 font-bold mb-2">Phone Number</label>
              <input
                type="text"
                id="phone_number"
                className="w-full border border-green-500 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={handleChange(setPhoneNumber)}
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-2">{errors.phoneNumber}</p>}
            </div>
            <div className="mb-6">
              <label htmlFor="experience_years" className="block text-gray-700 font-bold mb-2">Years of Experience</label>
              <input
                type="number"
                id="experience_years"
                className="w-full border border-green-500 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                placeholder="Enter your years of experience"
                value={experienceYears}
                readOnly
              />
            </div>
            <div className="mb-6">
              <label htmlFor="dob" className="block text-gray-700 font-bold mb-2">Date of Birth</label>
              <input
                type="date"
                id="dob"
                className="w-full border border-green-500 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                value={dob}
                onChange={handleChange(setDob)}
              />
              {errors.dob && <p className="text-red-500 text-sm mt-2">{errors.dob}</p>}
            </div>
            <div className="mb-6">
              <label htmlFor="working_Hospital" className="block text-gray-700 font-bold mb-2">Working Hospital</label>
              <input
                type="text"
                id="working_Hospital"
                className="w-full border border-green-500 rounded-md py-2 px-3 text-gray-700 leading-tight"
                placeholder="Enter your working hospital"
                value={workingHospital}
                readOnly
              />
            </div>
            <div className="mb-6">
              <label htmlFor="gender" className="block text-gray-700 font-bold mb-2">Gender</label>
              <input
                type="text"
                id="gender"
                className="w-full border border-green-500 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                placeholder="Enter your gender"
                value={gender}
                readOnly
              />
            </div>
            <div className="mb-6">
              <label htmlFor="working_Hospital_contact" className="block text-gray-700 font-bold mb-2">Working Hospital Contact</label>
              <input
                type="text"
                id="working_Hospital_contact"
                className="w-full border border-green-500 rounded-md py-2 px-3 text-gray-700 leading-tight"
                placeholder="Enter your working hospital contact"
                value={workingHospitalContact}
                readOnly
              />
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className={`px-4 py-2 rounded ${isChanged ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white cursor-not-allowed'}`}
              disabled={!isChanged}
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DoctorProfile;
