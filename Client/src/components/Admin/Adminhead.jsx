import { Fragment, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import Api from "../../API/DoctorCareApi"
import { clearUser } from '../../ReduxStore/features/userSlice';
import { useDispatch } from 'react-redux';
import UsersList from './UsersList';
import DoctorsList from './DoctorsList';
import ApprovalsList from './Approvals';
import AppointmentsList from './Appointments';
import AdminHome from './AdminHome';

const navigation = [
  { name: 'Users', path: '/admin/userList', component: UsersList },
  { name: 'Doctors', path: '/admin/doctors', component: DoctorsList },
  { name: 'Approvals', path: '/admin/approvals', component: ApprovalsList },
  { name: 'Appointments', path: '/admin/appointments', component: AppointmentsList },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Adminhead() {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(navigation[0]);

  const logout = async () => {
    try {
      let response = await Api.get('/logout')
      if (response.status === 200) {
        dispatch(clearUser())
        Navigate('/login')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar */}
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-gray-800">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-white font-bold">
                Doctor <span className="text-red-500">Care</span>
              </h1>
            </div>

            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 px-2 bg-gray-800 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.path}
                    className={classNames(
                      item === selectedItem
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                    onClick={() => setSelectedItem(item)}
                    aria-current={item === selectedItem ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Logout button */}
            <div className="mt-auto">
              <button
                onClick={logout}
                className="group w-full flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Content area */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Disclosure as="nav" className="bg-gray-800">
          {/* ... Your existing code for the Disclosure component */}
        </Disclosure>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900"> Admin Dashboard</h1>
          </div>
        </header>
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6 sm:px-6 lg:px-8">
          {selectedItem.component && <selectedItem.component />}
          </div>
        </main>
      </div>
    </div>
  );
}
