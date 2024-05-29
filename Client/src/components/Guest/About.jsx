import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <section
      id="about"
      className="bg-black px-6 pb-8 pt-20 dark:bg-dark-2 lg:pb-[70px] lg:pt-[120px]"
    >
      <div className="container">
        <div className="wow fadeInUp" data-wow-delay=".2s">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <div className="mb-12 max-w-[540px] lg:mb-0">
                <h2 className="mb-5 text-3xl font-bold leading-tight text-text text-white sm:text-[40px] sm:leading-[1.2]">
                  Why Mind Care
                </h2>
                <p className="mb-10 text-text leading-relaxed text-body-color text-white">
                 
                 "Mind Care" is a revolutionary doctor consulting application designed to provide support and assistance to individuals navigating challenging mental health issues such as depression, suicidal thoughts, and social anxiety. Our platform connects users with qualified healthcare professionals who specialize in mental health care, offering a safe and confidential space for consultations. Whether you're seeking guidance, therapy, or simply someone to listen, Doctor Care is here to help you on your journey towards healing and well-being.
                  <br />
                  <br />
                  Our vision at Doctor Care is to create a world where mental health support is accessible to all, without stigma or barriers. We envision a future where individuals can easily connect with empathetic professionals and resources, empowering them to prioritize their mental well-being and live fulfilling lives
                </p>

                <Link
                  to={"/userSignup"}
                  className="inline-flex items-center justify-center rounded-md border border-secondary bg-primary px-7 py-3 text-center text-base font-medium text-white hover:border-blue-dark hover:bg-blue-dark"
                >
                  Know More
                </Link>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div className="-mx-2 flex flex-wrap sm:-mx-4 lg:-mx-2 xl:-mx-4">
                <div className="w-full px-2 sm:w-1/2 sm:px-4 lg:px-2 xl:px-4">
                  <div className="mb-4 sm:mb-8 sm:h-[400px] md:h-[540px] lg:h-[400px] xl:h-[500px]">
                    <img
                    src="https://c0.wallpaperflare.com/preview/685/663/788/adult-doctor-girl-healthcare.jpg"
                      alt="about image"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>

                <div className="w-full px-2 sm:w-1/2 sm:px-4 lg:px-2 xl:px-4">
                  <div className="mb-4 sm:mb-8 sm:h-[220px] md:h-[346px] lg:mb-4 lg:h-[225px] xl:mb-8 xl:h-[310px]">
                    <img
                      src="data:image/jpeg;base64,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"
                      alt="about image"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <Link to={"/login"}>
                    <div className="relative z-10 mb-4 flex items-center justify-center overflow-hidden bg-primary px-6 py-12 sm:mb-8 sm:h-[160px] sm:p-5 lg:mb-4 xl:mb-8">
                      <div>
                        <span className="block text-5xl font-extrabold text-white">
                          Join
                        </span>
                        <span className="block text-base font-semibold text-white">
                          to the wonderful
                        </span>

                        <span className="block text-base font-medium text-white text-opacity-70">
                          Community of positivity
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}