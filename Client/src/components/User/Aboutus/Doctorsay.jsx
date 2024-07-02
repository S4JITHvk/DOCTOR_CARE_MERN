function WhatDoctorsDay() {
    return (
      <div className="grid md:grid-cols-2 bg-white">
        <div className="md:p-8 flex justify-center">
          <img
            className="w-[90%]"
            src="/assets/img1.jfif"
            alt=""
          />
        </div>
        <div className="">
          <h1 className="text-center font-bold text-blue-950 mt-20 text-[30px]">WHAT DOCTOR'S SAY</h1>
          <div className="flex justify-center mt-2 mb-2">
            <div className="boder-2 h-1 w-12 bg-gray-300"></div>
            <div className="boder-2 h-1 w-12 bg-blue-800"></div>
            <div className="boder-2 h-1 w-12 bg-gray-300"></div>
          </div>
          <p className="text-sm font-thin text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ipsum!
          </p>
          <h1 className="font-semibold text-xl pl-10 mt-14">Amazing service!</h1>
          <h1 className="pl-10">John Partho</h1>
          <p className="text-sm mx-10 font-thin">
            They provide great service facilty consectetur adipisicing elit.
            Itaque rem, praesentium, iure, ipsum magnam deleniti a vel eos
            adipisci suscipit fugit placeat. Quibusdam laboriosam eveniet nostrum
            nemo commodi numquam quod.
          </p>
        </div>
      </div>
    );
  }
  
  export default WhatDoctorsDay;