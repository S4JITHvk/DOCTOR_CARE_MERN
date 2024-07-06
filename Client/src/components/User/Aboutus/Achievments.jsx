function Achievements() {
    return (
      <div className="bg-white">
        <div
          className="h-72 w-full "
          style={{
            backgroundImage: `url("/assets/banner2.jfif")`,
          }}
        >
          <div className="w-full h-full bg-blue-950 opacity-80 flex items-center justify-center">
            <div>
              <h1 className="text-center font-bold text-[40px] text-white">
                ABOUT US
              </h1>
              <div className="flex justify-center mt-2 mb-2">
                <div className="boder-2 h-1 w-20 bg-gray-300"></div>
                <div className="boder-2 h-1 w-20 bg-blue-800"></div>
                <div className="boder-2 h-1 w-20 bg-gray-300"></div>
              </div>
              <p className="text-sm text-white font-thin">
                MIND CARE IS HERE TO HEAR YOU
              </p>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:p-8">
          <div className=" md:px-24 mt-20">
            <h1 className="text-[40px] text-blue-950 text-center font-bold">
              OUR DOCTORS
            </h1>
            <h1 className="text-[40px] text-blue-950 text-center font-bold">
              ACHEIVEMENT
            </h1>
            <div className="flex justify-center mt-2 mb-2">
              <div className="boder-2 h-1 w-20 bg-gray-300"></div>
              <div className="boder-2 h-1 w-20 bg-blue-800"></div>
              <div className="boder-2 h-1 w-20 bg-gray-300"></div>
            </div>
            <p className="text-center text-sm font-thin mt-4">
            Our dedicated team of doctors is committed to providing the highest quality care to our patients.
            </p>
            <p className="text-center text-sm text-gray-700 mt-8">
            With a blend of expertise and compassion, our doctors have made significant strides in advancing medical treatments. 
            Their achievements include pioneering new surgical techniques, contributing to groundbreaking research, and earning recognition from esteemed medical institutions worldwide.
             We take pride in their relentless pursuit of excellence and their unwavering commitment to improving patient outcomes.
            </p>
          </div>
          <div className="md:p-8 flex justify-center">
            <img
              className="h-[90%]"
              src="/assets/img2.jfif"
              alt=""
            />
          </div>
        </div>
      </div>
    );
  }
  
  export default Achievements;