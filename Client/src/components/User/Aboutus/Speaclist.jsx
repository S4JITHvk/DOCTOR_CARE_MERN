function MeetOurSpecialist() {
  return (
    <div className="bg-white">
      <div className="grid md:grid-cols-2 md:p-8">
        <div className="md:px-24 mt-20">
          <h1 className="text-[40px] text-blue-950 text-center font-bold">
            MEET OUR SPECIALISTS
          </h1>
          <div className="flex justify-center mt-2 mb-2">
            <div className="border-2 h-1 w-14 bg-gray-300"></div>
            <div className="border-2 h-1 w-14 bg-blue-800"></div>
            <div className="border-2 h-1 w-14 bg-gray-300"></div>
          </div>
          <p className="text-center text-sm font-thin mt-4">
            Our specialists are here to provide you with the best care possible.
          </p>
          <p className="text-center text-sm text-gray-700 mt-8">
            Our team of highly skilled specialists is dedicated to delivering
            personalized and compassionate care to every patient. With a wealth
            of experience and a commitment to excellence, they work
            collaboratively to ensure you receive the best possible treatment
            and support. Whether you need routine care or specialized treatment,
            our specialists are here to guide you every step of the way.
          </p>
        </div>
        <div className="flex justify-center md:p-8">
          <img
            className="w-[90%] h-[90%]"
            src="/assets/hero-bg.jpg"
            alt="Specialist team"
          />
        </div>
      </div>
    </div>
  );
}

export default MeetOurSpecialist;
