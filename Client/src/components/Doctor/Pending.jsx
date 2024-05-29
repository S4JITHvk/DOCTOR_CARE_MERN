import React from 'react';
import { clearDoctor } from '../../ReduxStore/features/doctorSlice';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
function Pending() {
    const dispatch=useDispatch()
    const logout =  () => {
        try {
            dispatch(clearDoctor());
            Cookies.remove('doctortoken');
            window.location.reload()
        } catch (err) {
          console.log(err);
        }
      };
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">WELCOME TO MIND CARE</h1>
                        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Oops.</p>
                        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, Your verification is still going on by admin. Try login later..... </p>
                        <button onClick={logout} className="inline-flex text-white bg-black hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Home</button>
                    </div>   
                </div>
            </section>
    </div>
  );
}

export default Pending;
