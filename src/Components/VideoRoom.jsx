import "/src/VideoRoom.css";
// import AgoraRTC from "agora-rtc-sdk";
import AgoraRTC from "agora-rtc-sdk-ng";

const VideoRoom = () => {
  const APP_ID = '1aa47ae8827d40cab066b64abea5748e';
  const TOKEN = sessionStorage.getItem('token');
  const CHANNEL = sessionStorage.getItem('room');
  let name = sessionStorage.getItem('name');
  let UID = sessionStorage.getItem('UID');
  let localAudioTrack;
  let localVideoTrack;

  let remoteUsers = {};

  let agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

  // Initialize the local stream and join the room
  const joinAndDisplayLocalStream = async () => {
    // document.getElementById('room-name').innerText = CHANNEL;

    // Join the channel
    agoraEngine.join(APP_ID, CHANNEL, TOKEN, UID);

    // Create and publish local tracks
    localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    localVideoTrack = await AgoraRTC.createCameraVideoTrack();

    // Create member on the server
    // let member = await createMember();

    // Publish the tracks
    agoraEngine.publish([localAudioTrack, localVideoTrack]);

    // Display the local player
    const localPlayerContainer = document.createElement("div");
    localPlayerContainer.id = UID;
    localPlayerContainer.textContent = name;
    localPlayerContainer.style.width = "640px";
    localPlayerContainer.style.height = "480px";
    document.getElementById('video-streams').append(localPlayerContainer);

    localVideoTrack.play(localPlayerContainer);

    // Set up event listeners for user events
    agoraEngine.on("user-published", handleUserPublished);
    agoraEngine.on("user-unpublished", handleUserUnpublished);

    console.log("Publish success!");
  };

  // Handle remote user publish event
  const handleUserPublished = async (user, mediaType) => {
    remoteUsers[user.uid] = user;
    await subscribeToUser(user, mediaType);
  };

  // Handle remote user unpublished event
  const handleUserUnpublished = (user) => {
    console.log(`User unpublished: ${user.uid}`);
    delete remoteUsers[user.uid];
    const remotePlayerContainer = document.getElementById(user.uid.toString());
    if (remotePlayerContainer) {
      remotePlayerContainer.remove();
    }
  };

  // Subscribe to a remote user stream
  const subscribeToUser = async (user, mediaType) => {
    agoraEngine.subscribe(user, mediaType);
    console.log(`Subscribed to user: ${user.uid}`);

    if (mediaType === "video") {
      const remoteVideoTrack = user.videoTrack;

    //   let member = await getMember(user);

      const remotePlayerContainer = document.createElement("div");
      remotePlayerContainer.id = user.uid.toString();
      remotePlayerContainer.textContent = "hello"; // Display the member's name
      remotePlayerContainer.style.width = "640px";
      remotePlayerContainer.style.height = "480px";
      document.getElementById('active-speaker').append(remotePlayerContainer);

      remoteVideoTrack.play(remotePlayerContainer);
    }

    if (mediaType === "audio") {
      const remoteAudioTrack = user.audioTrack;
      remoteAudioTrack.play();
    }
  };

  // Subscribe to existing users (pre-joined users)
  const subscribeToExistingUsers = () => {
    agoraEngine.remoteUsers.forEach((user) => {
      if (!remoteUsers[user.uid]) {
        console.log(`Subscribing to pre-existing user: ${user.uid}`);
        handleUserPublished(user, "video");
        handleUserPublished(user, "audio");
      }
    });
  };

  // Periodically check and subscribe to new users
  setInterval(() => {
    subscribeToExistingUsers();
  }, 5000);

  // Toggle the microphone
//   const toggleMic = async (e) => {
//     console.log('TOGGLE MIC TRIGGERED');
//     if (localAudioTrack.muted) {
//       await localAudioTrack.setMuted(false);
//       e.target.style.backgroundColor = '#fff';
//     } else {
//       await localAudioTrack.setMuted(true);
//       e.target.style.backgroundColor = 'rgb(255, 80, 80, 1)';
//     }
//   };

  // Toggle the camera
//   const toggleCamera = async (e) => {
//     console.log('TOGGLE CAMERA TRIGGERED');
//     if (localVideoTrack.muted) {
//       await localVideoTrack.setMuted(false);
//       e.target.style.backgroundColor = '#fff';
//     } else {
//       await localVideoTrack.setMuted(true);
//       e.target.style.backgroundColor = 'rgb(255, 80, 80, 1)';
//     }
//   };

  // Leave the room and clean up
//   const leaveAndRemoveLocalStream = async () => {
//     localAudioTrack.stop();
//     localAudioTrack.close();
//     localVideoTrack.stop();
//     localVideoTrack.close();

//     await agoraEngine.leave();

//     // await deleteMember();
//     window.open('/', '_self');
//   };

  // API Calls

//   const createMember = async () => {
//     let response = await fetch('https://huddlehub-75fx.onrender.com/create_member/', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name, room_name: CHANNEL, UID }),
//     });
//     let member = await response.json();
//     return member;
//   };

//   const getMember = async (user) => {
//     let response = await fetch(`https://huddlehub-75fx.onrender.com/get_member/?UID=${user.uid}&room_name=${CHANNEL}`);
//     let member = await response.json();
//     return member;
//   };

//   const deleteMember = async () => {
//     let response = await fetch('https://huddlehub-75fx.onrender.com/delete_member/', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name, room_name: CHANNEL, UID }),
//     });
//     let member = await response.json();
//     console.log('Member deleted', member);
//   };

//   window.addEventListener("beforeunload", deleteMember);

  // Event listeners for control buttons
//   document.getElementById('mic-btn').addEventListener('click', toggleMic);
//   document.getElementById('camera-btn').addEventListener('click', toggleCamera);
//   document.getElementById('leave-btn').addEventListener('click', leaveAndRemoveLocalStream);

  // Join the stream when the component mounts
  joinAndDisplayLocalStream();

  return (
    <div className="app-container">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="meeting-info">
          <h3>Group Team Meeting [Active]</h3>
        </div>
        <div className="user-info">
          <span className="host-name">Vishnu Agarwal</span>
          <button className="leave-btn">Leave</button>
        </div>
      </div>

      {/* Video Grid */}
      <div className="video-grid">
        <div className="thumbnails">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="thumbnail">
              <img src={`https://via.placeholder.com/100?text=User+${index + 1}`} alt={`User ${index + 1}`} />
            </div>
          ))}
        </div>
        <div id="active-speaker" className="main-video">
          <img src="https://via.placeholder.com/800x450?text=Active+Speaker" alt="Active Speaker" />
        </div>
      </div>

      {/* Control Bar */}
      <div className="control-bar">
        <button id="mic-btn" className="control-btn">Mic</button>
        <button id="camera-btn" className="control-btn">Video</button>
        <button id="leave-btn" className="control-btn leave-btn">End</button>
        <button className="control-btn">Share</button>
        <button className="control-btn">Chat</button>
      </div>
    </div>
  );
};

export default VideoRoom;
