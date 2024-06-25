import React from 'react'
import toast from 'react-hot-toast';
import { useSocketContext } from '../../../../Socket/Context/SocketContext';
function Callreject({t,Caller}) {
    const{onCallRejected}=useSocketContext()
  return (
    <>
       <button
                className="px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-700"
                onClick={() => {
                  onCallRejected(Caller)
                  toast.dismiss(t);
                }}
              >
                Reject
              </button>
    </>
  )
}

export default Callreject
