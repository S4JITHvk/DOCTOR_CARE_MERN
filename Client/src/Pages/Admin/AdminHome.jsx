import { Link, useNavigate } from "react-router-dom";
import Api from "../../API/DoctorCareApi";
import { clearUser } from "../../ReduxStore/features/userSlice";
import { useDispatch } from "react-redux";

const navigation = [
  { name: 'Dashboard', href: '/admin', current: false },
  { name: 'Users', href: '/admin/userList', current: false },
  { name: 'Doctors', href: '/admin/doctors', current: false },
  { name: 'Approvals', href: '/admin/approvals', current: false },
  { name: 'Appointments', href: '/admin/appointments', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function AdminH() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const logout = async () => {
    try {
      let response = await Api.get('/logout');
      if (response.status === 200) {
        dispatch(clearUser());
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-gray-800">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-white font-bold">
                Doctor <span className="text-red-500">Care</span>
              </h1>
            </div>

            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 px-2 bg-gray-800 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

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
    </div>
  );
}
