import React, { useRef } from 'react'
import { useState, useContext, useEffect } from 'react'
import Peer from 'simple-peer'

const VideoCall = () => {

    const [peerObj, setPeerObj] = useState(null)

    useEffect(() => {
        OpenCamera();

    }, [])

    const OpenCamera = () => {
        navigator.mediaDevices.getUserMedia({ audio: false, video: true })
        .then(stream => {
            PlayVideo(stream, 'localStream')
            const p = new Peer({ initiator: window.location.hash === '#1', trickle: false, stream })
            setPeerObj(p)
        
            p.on('signal', token => {
                document.getElementById("txtMySignal").value= JSON.stringify(token)
            })

            p.on('stream', friendStream => PlayVideo(friendStream, 'friendStream'))
        })
    }

    const PlayVideo = (stream, idVideo) => {
        const video = document.getElementById(idVideo)
            video.srcObject = stream
            video.onloadeddata = function() {
                video.play()
            }
    }

    const Connect = () => {
        const friendSignal = JSON.parse(document.getElementById("txtFriendSignal").value)
        peerObj.signal(friendSignal)
    }

    return (
        <div>
            <video id='localStream' width='300' controls></video>
            <video id='friendStream' width='300' controls></video>
            <button onClick={OpenCamera}>Open Camera</button>
            <label>My Connection Token</label>
            <textarea rows='3' cols='100' id='txtMySignal'></textarea>  
            <br></br>
            <input type='text' id='txtFriendSignal'></input>
            <br></br>
            <button onClick={Connect}>Connect</button>
        </div>
    );
};

export default VideoCall;