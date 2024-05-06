import React, { useState } from 'react';

function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
  <div className="flex min-h-full flex-col justify-center px-10 py-12 lg:px-8" style={{ 
  backgroundImage: `url('/public/assets/bg.jpg')`, 
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  paddingBottom: '9rem'
}}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="mt-15 text-center text-2xl font-bold leading-9 tracking-tight text-red-500">DOCTOR CARE</h1>
          <h2 className="mt-15 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up for an account</h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" action="#">
            <div>
              <label htmlFor="name" className="block text-sm font-bold leading-6 text-gray-900">Name</label>
              <div className="mt-1">
                <input id="name" name="name" type="text" autoComplete="name" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-md font-bold leading-6 text-gray-900">Email address</label>
              <div className="mt-1">
                <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-md font-bold leading-6 text-gray-900">Password</label>
              <div className="mt-1 relative rounded-md border border-gray-300">
  <input
    id="password"
    name="password"
    type={showPassword ? "text" : "password"}
    autoComplete="new-password"
    required
    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"   />
  <button
    type="button"
    className="absolute inset-y-0 right-0 px-3 py-1.5 text-sm font-semibold text-gray-900 bg-transparent border-l border-gray-300 focus:outline-none"
    onClick={togglePasswordVisibility}
  >
    {showPassword ? "Hide" : "Show"}
  </button>
</div>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-md font-bold  leading-6 text-gray-900">Confirm Password</label>
              <div className="mt-1 relative rounded-md border border-gray-300">
  <input
    id="password"
    name="password"
    type={showPassword ? "text" : "password"}
    autoComplete="new-password"
    required
    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"   />
  <button
    type="button"
    className="absolute inset-y-0 right-0 px-3 py-1.5 text-sm font-semibold text-gray-900 bg-transparent border-l border-gray-300 focus:outline-none"
    onClick={togglePasswordVisibility}
  >
    {showPassword ? "Hide" : "Show"}
  </button>
</div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account? <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign in</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
