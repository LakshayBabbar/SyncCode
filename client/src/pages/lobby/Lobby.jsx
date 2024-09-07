import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

const Lobby = () => {
  const [roomId, setRoomId] = useState("");
  const newRoom = () => {
    const id = uuid();
    setRoomId(id);
  };
  const navigate = useNavigate();

  const handleRoom = (e) => {
    e.preventDefault();
    navigate(`/room/${roomId}`, {
      state: { username: e.target[0].value },
    });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <form
        className="flex flex-col px-5 py-10 rounded-md bg-slate-900 w-96 gap-2 text-white"
        onSubmit={handleRoom}
      >
        <h1 className="text-center text-3xl text-white font-bold mb-5">
          SynCode
        </h1>
        <input
          type="text"
          placeholder="Enter your name"
          required
          className="bg-transparent border px-2 py-1 rounded-md"
        />
        <input
          type="text"
          placeholder="Room Id"
          className="bg-transparent border px-2 py-1 rounded-md"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          required
        />
        <button type="submit" className="bg-slate-800 text-white py-1 my-2">
          Join
        </button>
        <button type="button" className="text-blue-400" onClick={newRoom}>
          Create new room
        </button>
      </form>
    </div>
  );
};

export default Lobby;
