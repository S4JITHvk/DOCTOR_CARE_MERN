import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { FiPhoneOff } from 'react-icons/fi';
function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function App() {
	const location = useLocation();
  const navigate=useNavigate()
	const { personalLink } = location.state || {}
 const roomID = getUrlParams().get('roomID') || randomID(5);
    
  React.useEffect(() => {
    const initMeeting = async (element) => {
      // generate Kit Token
      const appID = 919371831;
      const serverSecret = "bf4e835c6eeab8a1f5ebc95e8ce554a0";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));

      // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // Start the call
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Join link',
            url:personalLink
            
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
      });
    };

    initMeeting(document.querySelector('.myCallContainer'));
  });
  useEffect(() => {
    return () => {
      window.location.reload();
    };
  }, []);
  
  const handleDisconnect = () => {
    navigate(-1);
  };


  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <div
      className="myCallContainer"
      style={{ width: '80vw', height: '80vh' }}
    ></div>
    <button
      onClick={handleDisconnect}
      style={{ width: '40%', height: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center',marginTop:0}}
      className='bg-red-500 text-white rounded-lg'
    >
      <FiPhoneOff className='mr-2' />
      Disconnect
    </button>
  </div>
  );
}
