import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSocketContext } from "../../Socket/Context/SocketContext";
import { useEffect } from 'react';
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
  const { socket } = useSocketContext();
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const userId = location.state;
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
            name: 'Personal link',
            url:
             window.location.protocol + '//' + 
             window.location.host +'/redirectToCall'+
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
      });
    };

    const personalLink = `${window.location.protocol}//${window.location.host}/redirectToCall?roomID=${roomID}`;

    // Emit socket event with userId and personal link
    socket.emit('callingUser', { userId, personalLink });

    initMeeting(document.querySelector('.myCallContainer'));
  }, [roomID, userId]);

  useEffect(() => {
    return () => {
    window.location.reload()

    };
  }, []);
  const handleDisconnect = () => {
    navigate(-1); 
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div
        className="myCallContainer"
        style={{ width: '80vw', height: '80vh' }}
      ></div>
       <button onClick={handleDisconnect} style={{ width: '50%', height: '10%' }} className='bg-red-500'>Disconnect</button>
      </div>
  );
}
