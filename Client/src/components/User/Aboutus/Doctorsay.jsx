function WhatDoctorsDay() {
  return (
    <div className="grid md:grid-cols-2 bg-white">
      <div className="md:p-8 flex justify-center">
        <img className="w-[90%]" src="/assets/img1.jfif" alt="" />
      </div>
      <div className="">
        <h1 className="text-center font-bold text-blue-950 mt-20 text-[30px]">
          WHAT DOCTOR'S SAY
        </h1>
        <div className="flex justify-center mt-2 mb-2">
          <div className="boder-2 h-1 w-12 bg-gray-300"></div>
          <div className="boder-2 h-1 w-12 bg-blue-800"></div>
          <div className="boder-2 h-1 w-12 bg-gray-300"></div>
        </div>
        <p className="text-sm font-thin text-center">
          Hear from our esteemed doctors about their experiences and insights.
        </p>
        <h1 className="font-semibold text-xl pl-10 mt-14">
          Exceptional Care and Support!
        </h1>
        <h1 className="pl-10">Dr. Emily Carter</h1>
        <p className="text-sm mx-10 font-thin">
          Working here has been a transformative experience. The team is highly
          supportive, and the facilities are top-notch, allowing us to provide
          the best care to our patients. The collaborative environment
          encourages continuous learning and professional growth, making it an
          ideal place for any medical professional. I am proud to be part of an
          organization that values both patient care and medical innovation. The
          resources available here enable us to stay at the forefront of medical
          advancements, and the supportive community ensures that we can focus
          on what we do best – helping our patients lead healthier lives.
        </p>
      </div>
    </div>
  );
}

export default WhatDoctorsDay;
