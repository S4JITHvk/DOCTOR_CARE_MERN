import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Api from "../../API/DoctorCareApi";
import toast from "react-hot-toast";
import { FiUpload, FiTrash } from "react-icons/fi";
import Swal from 'sweetalert2';

function DoctorProfile() {
  const [selectedImage, setSelectedImage] = useState('');
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setIsChanged(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage('');
    setIsChanged(true);
  };

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
    setIsChanged(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = {};

    if (!name.trim()) {
      errors.name = 'Name is required';
    }

    if (Object.keys(errors).length === 0) {
      Api.updateUserProfile({
        name,
        selectedImage,
        phoneNumber,
        expertise,
        experienceYears,
        workingHospital,
        workingHospitalContact,
        dob,
        gender,
        medicalLicenseNo,
      })
        .then(() => {
          toast.success('Profile updated successfully');
          setIsChanged(false);
        })
        .catch(() => {
          toast.error('Failed to update profile');
        });
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="col-span-4 sm:col-span-9 flex justify-center">
      <div className="bg-white shadow   rounded-lg px-[150px] w-full max-w-6xl">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center ">
            <img
              src={selectedImage || "/assets/doctor.jpg"}
              className="w-32 h-32 bg-green-500 rounded-full mb-4 mt-2"
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
              {selectedImage && selectedImage !== "/assets/doctor.jpg" && (
                <button type="button" onClick={handleDeleteImage} className="ml-4">
                  <FiTrash className="text-2xl text-red-500" />
                </button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className='font-bold  text-fuchsia-600 underline ml-10 text-lg'>PERSONAL DETAILS</div>
            <div className='font-bold text-fuchsia-600 underline ml-10 text-lg'>PROFESSIONAL DETAILS</div>
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
              <input
                type="text"
                id="name"
                className="w-full border border-green-500  rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
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
                className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight custom-border-green focus:border-blue-500 border-green-500 "
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
                className="w-full border border-green-500  rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
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
                className="w-full border border-green-500  rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={handleChange(setPhoneNumber)}
              />
            </div>
           
            <div className="mb-6">
              <label htmlFor="experience_years" className="block text-gray-700 font-bold mb-2">Years of Experience</label>
              <input
                type="number"
                id="experience_years"
                className="w-full border border-green-500  rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                placeholder="Enter your years of experience"
                value={experienceYears}
                onChange={handleChange(setExperienceYears)}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="dob" className="block text-gray-700 font-bold mb-2">Date of Birth</label>
              <input
                type="date"
                id="dob"
                className="w-full border border-green-500  rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                value={dob}
                readOnly
              />
            </div>
            <div className="mb-6">
              <label htmlFor="working_Hospital" className="block text-gray-700 font-bold mb-2">Working Hospital</label>
              <input
                type="text"
                id="working_Hospital"
                className="w-full border border-green-500  rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                placeholder="Enter your working hospital"
                value={workingHospital}
                onChange={handleChange(setWorkingHospital)}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="gender" className="block text-gray-700 font-bold mb-2">Gender</label>
               <input
                type="text"
                id="gender"
                className="w-full border border-green-500  rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                placeholder="gender"
                value={gender}
                readOnly
              />
            </div>
            <div className="mb-6">
              <label htmlFor="working_Hospital_contact" className="block text-gray-700 font-bold mb-2">Working Hospital Contact</label>
              <input
                type="text"
                id="working_Hospital_contact"
                className="w-full border border-green-500  rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                placeholder="Enter your working hospital contact"
                value={workingHospitalContact}
                onChange={handleChange(setWorkingHospitalContact)}
              />
            </div>
           
          
           
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                !isChanged && 'opacity-50 cursor-not-allowed'
              }`}
              disabled={!isChanged}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DoctorProfile;
