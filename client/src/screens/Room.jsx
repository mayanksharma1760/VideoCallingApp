import React ,{useCallback, useEffect , useState}from 'react';
import { useSocket } from '../context/SocketProvider';
import ReactPlayer from 'react-player'
import Peer from '../service/Peer';
const RoomPage=()=>{

    const socket=useSocket();

    const [remoteSocketId,setRemoteSocketId]=useState(null)
    const [myStream,setMyStream]=useState(null);

    const handleUserJoined = useCallback(({email,id})=>{
        console.log(`Email : ${email} joined the room`)
        setRemoteSocketId(id);
    },[])


    const handleIncomingCall = useCallback(({from,offer})=>{
            console.log('Incoming call yeah ',from,offer);
    },[])
    useEffect(()=>{
        socket.on('user:joined',handleUserJoined)
        socket.on('incoming:call',handleIncomingCall)

        return ()=>{
            socket.off('user:joined',handleUserJoined);
            socket.off('incoming:call',handleIncomingCall)
        }
    },[socket,handleUserJoined,handleIncomingCall])


const handleCallUser= useCallback(async()=>{
    const stream= await navigator.mediaDevices.getUserMedia({
        audio:true,
        video:true
    });

    const offer=await Peer.getOffer();
    socket.emit("user:call",{to: remoteSocketId,offer})

    setMyStream(stream)

},[remoteSocketId,socket]);

    return (
        <div>
            <h1>riim page</h1>
            <h4>{remoteSocketId?'connected':"No one in room"}</h4>

            {
                remoteSocketId &&  <button onClick={handleCallUser} >CALL</button>
            }
            
            {
                myStream &&  
                <>
                <h1>My Stream</h1>
                <ReactPlayer playing muted height="300px" width="300px" url={myStream}/>
                </>
            }
            
        </div>
    )
}
export default RoomPage;