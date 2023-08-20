// import React from 'react'
// import { useParams } from "react-router-dom"
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"
// import { AuthContext } from '../contexts/AuthContext'
// import { useContext, useEffect } from 'react'
// import { RoomContext } from '../contexts/RoomContext'
// import Loader from '../components/Loader'

// const Room = () => {
//     const params = useParams()
//     const roomID = params.id

//     const {
//       authState: { authLoading, isAuthenticated, user }
//     } = useContext(AuthContext)

//     const {
//       roomState: { rooms, roomsLoading },
//       getRooms
//     } = useContext(RoomContext)

//     useEffect(() => {
//       getRooms(); 
//     }, [])

//     let body = (<></>)
//     if(authLoading || roomsLoading) {
//       body = ( <Loader></Loader> )
//     } else if(isAuthenticated) {
//         var checkId = false
//         for(const room of rooms){
//           if(roomID == room._id) {
//                 checkId = true
//                 break
//               }
//         }
//         if(checkId) {
//             const meeting = async (element) => {
//             const appID = 282375104;
//             const serverSecret = "65c35a2732c1005ff4aca6446dd77373";
//             const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//               appID,
//               serverSecret,
//               roomID,
//               Date.now().toString(),
//               user.fullname
//             );
//             const zp = ZegoUIKitPrebuilt.create(kitToken);
        
//             zp.joinRoom({
//               container: element,
//               scenario: {
//                 mode: ZegoUIKitPrebuilt.GroupCall,
//               },
//             });
//             };
            
//             body = (
//                 <div ref={meeting} className='camera'></div>
//             )
//         } else  return window.location.replace("/meeting");
//     }  else return window.location.replace("/meeting");
  
//     return (
//       <>
//           {body}
//       </>
//   );
// };

// export default Room;