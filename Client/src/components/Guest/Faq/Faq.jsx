import { Link } from "react-router-dom";

export default function Features() {
  return (
    <section className="pb-8 p-10 lg:p-28 pt-20 bg-black lg:pb-[70px] lg:pt-[90px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[485px] text-center lg:mb-[70px]">
              <h2 className="mb-3 text-3xl font-bold text-white sm:text-4xl md:text-[40px] md:leading-[1.2]">
                Core features
              </h2>
            </div>
          </div>
        </div>
        <div className="-mx-4 flex flex-wrap mb-3">
          <div className="w-full px-4 md:w-1/2 lg:w-1/4 bg-primary/[0.3] rounded-2xl pt-5 ps-6 border-2 border-white mb-4">
            <div className="wow fadeInUp group mb-12" data-wow-delay=".1s">
              <div className="relative z-10 mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-[14px] bg-primary">
                <span className="absolute left-0 top-0 -z-[1] mb-8 flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-[14px] bg-primary bg-opacity-20 duration-300 group-hover:rotate-45"></span>
                <svg
                  className="svg-container"
                  fill="#ffffff"
                  width="200px"
                  height="200px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 10.975V8a2 2 0 0 0-2-2h-6V4.688c.305-.274.5-.668.5-1.11a1.5 1.5 0 0 0-3 0c0 .442.195.836.5 1.11V6H5a2 2 0 0 0-2 2v2.998l-.072.005A.999.999 0 0 0 2 12v2a1 1 0 0 0 1 1v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a1 1 0 0 0 1-1v-1.938a1.004 1.004 0 0 0-.072-.455c-.202-.488-.635-.605-.928-.632zM7 12c0-1.104.672-2 1.5-2s1.5.896 1.5 2-.672 2-1.5 2S7 13.104 7 12zm8.998 6c-1.001-.003-7.997 0-7.998 0v-2s7.001-.002 8.002 0l-.004 2zm-.498-4c-.828 0-1.5-.896-1.5-2s.672-2 1.5-2 1.5.896 1.5 2-.672 2-1.5 2z" />
                </svg>
              </div>
              <h4 className="mb-3 text-xl font-bold text-white">
                Personalized Consultations
              </h4>
              <p className="mb-8 text-gray-200 lg:mb-9">
                Connect with our dedicated team of doctors for personalized
                consultations, medical advice, and answers to your health
                concerns, all from the comfort of your home.
              </p>

              <Link
                to="/login"
                className="text-white font-medium hover:text-primary"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 lg:w-1/4 rounded-2xl pt-5 ps-6 border-2 border-white mb-4">
            <div className="wow fadeInUp group mb-12" data-wow-delay=".1s">
              <div className="relative z-10 mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-[14px] bg-primary">
                <span className="absolute left-0 top-0 -z-[1] mb-8 flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-[14px] bg-primary bg-opacity-20 duration-300 group-hover:rotate-45"></span>
                <svg
                  className="svg-container"
                  fill="#ffffff"
                  width="200px"
                  height="200px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 10.975V8a2 2 0 0 0-2-2h-6V4.688c.305-.274.5-.668.5-1.11a1.5 1.5 0 0 0-3 0c0 .442.195.836.5 1.11V6H5a2 2 0 0 0-2 2v2.998l-.072.005A.999.999 0 0 0 2 12v2a1 1 0 0 0 1 1v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a1 1 0 0 0 1-1v-1.938a1.004 1.004 0 0 0-.072-.455c-.202-.488-.635-.605-.928-.632zM7 12c0-1.104.672-2 1.5-2s1.5.896 1.5 2-.672 2-1.5 2S7 13.104 7 12zm8.998 6c-1.001-.003-7.997 0-7.998 0v-2s7.001-.002 8.002 0l-.004 2zm-.498-4c-.828 0-1.5-.896-1.5-2s.672-2 1.5-2 1.5.896 1.5 2-.672 2-1.5 2z" />
                </svg>
              </div>
              <h4 className="mb-3 text-xl font-bold text-white">
                Expert  Support
              </h4>
              <p className="mb-8 text-gray-200 lg:mb-9">
                Join our community of healthcare professionals and patients for
                support, encouragement, and shared knowledge on managing health
                and wellness.
              </p>

              <Link
                to="/login"
                className="text-white font-medium hover:text-primary"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 lg:w-1/4 bg-primary/[0.3] rounded-2xl pt-5 ps-6 border-2 border-white mb-4">
            <div className="wow fadeInUp group mb-12" data-wow-delay=".1s">
              <div className="relative z-10 mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-[14px] bg-primary">
                <span className="absolute left-0 top-0 -z-[1] mb-8 flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-[14px] bg-primary bg-opacity-20 duration-300 group-hover:rotate-45"></span>
                <svg
                  className="svg-container"
                  fill="#ffffff"
                  width="200px"
                  height="200px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 10.975V8a2 2 0 0 0-2-2h-6V4.688c.305-.274.5-.668.5-1.11a1.5 1.5 0 0 0-3 0c0 .442.195.836.5 1.11V6H5a2 2 0 0 0-2 2v2.998l-.072.005A.999.999 0 0 0 2 12v2a1 1 0 0 0 1 1v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a1 1 0 0 0 1-1v-1.938a1.004 1.004 0 0 0-.072-.455c-.202-.488-.635-.605-.928-.632zM7 12c0-1.104.672-2 1.5-2s1.5.896 1.5 2-.672 2-1.5 2S7 13.104 7 12zm8.998 6c-1.001-.003-7.997 0-7.998 0v-2s7.001-.002 8.002 0l-.004 2zm-.498-4c-.828 0-1.5-.896-1.5-2s.672-2 1.5-2 1.5.896 1.5 2-.672 2-1.5 2z" />
                </svg>
              </div>
              <h4 className="mb-3 text-xl font-bold text-white">
                Appointment Booking
              </h4>
              <p className="mb-8 text-gray-200 lg:mb-9">
                Book appointments instantly with your preferred doctors based on
                availability, specialization, and your specific health needs.
              </p>

              <Link
                to="/login"
                className="text-white font-medium hover:text-primary"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 lg:w-1/4 rounded-2xl pt-5 ps-6 border-2 border-white mb-4">
            <div className="wow fadeInUp group mb-12" data-wow-delay=".1s">
              <div className="relative z-10 mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-[14px] bg-primary">
                <span className="absolute left-0 top-0 -z-[1] mb-8 flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-[14px] bg-primary bg-opacity-20 duration-300 group-hover:rotate-45"></span>
                <svg
                  className="svg-container"
                  fill="#ffffff"
                  width="200px"
                  height="200px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 10.975V8a2 2 0 0 0-2-2h-6V4.688c.305-.274.5-.668.5-1.11a1.5 1.5 0 0 0-3 0c0 .442.195.836.5 1.11V6H5a2 2 0 0 0-2 2v2.998l-.072.005A.999.999 0 0 0 2 12v2a1 1 0 0 0 1 1v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a1 1 0 0 0 1-1v-1.938a1.004 1.004 0 0 0-.072-.455c-.202-.488-.635-.605-.928-.632zM7 12c0-1.104.672-2 1.5-2s1.5.896 1.5 2-.672 2-1.5 2S7 13.104 7 12zm8.998 6c-1.001-.003-7.997 0-7.998 0v-2s7.001-.002 8.002 0l-.004 2zm-.498-4c-.828 0-1.5-.896-1.5-2s.672-2 1.5-2 1.5.896 1.5 2-.672 2-1.5 2z" />
                </svg>
              </div>
              <h4 className="mb-3 text-xl font-bold text-white">
                Secure Payment Options
              </h4>
              <p className="mb-8 text-gray-200 lg:mb-9">
                Ensure secure transactions and flexible payment options for
                your medical bills and appointments using our integrated
                payment gateways.
              </p>

              <Link
                to="/login"
                className="text-white font-medium hover:text-primary"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
