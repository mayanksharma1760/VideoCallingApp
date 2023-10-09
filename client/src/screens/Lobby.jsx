import React, { useCallback, useState, useEffect } from "react";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";
import "./Lobby.css";
const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);
  return (
    <div>
      
      {/* <form onSubmit={handleSubmitForm}>
        <label htmlFor="email">Email ID</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="room">Room Number</label>
        <input
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <button>Join</button>
      </form> */}

      <form onSubmit={handleSubmitForm}>
        <div className="login_form_container">
          <div className="login_form">
            <h2>Lobby</h2>
            <div className="input_group">
              <i className="fa fa-user"></i>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input_text"
                placeholder="Enter your E-mail"
              />
            </div>
            <div className="input_group">
              <i className="fa fa-unlock-alt"></i>

              <input
                type="text"
                id="room"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="input_text"
                placeholder="Enter the Room Number"
              />
            </div>
            <div className="button_group" id="login_button">
              <button>Join</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LobbyScreen;
