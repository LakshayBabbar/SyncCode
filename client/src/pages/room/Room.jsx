import { useLocation, useNavigate } from "react-router-dom";
import EditorCom from "../../components/editor/Editor";
import { useEffect, useRef, useState } from "react";
import { initSocket } from "../../Socket";
import { useParams } from "react-router-dom";

function WebEditor() {
  const [output, setOutput] = useState("");
  const [code, setCode] = useState("");
  const { roomId } = useParams();
  const Location = useLocation();
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();
  const handleEditorChange = async (value) => {
    setCode(value);
    const req = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: "python",
        version: "3",
        files: [{ name: "hello.py", content: value }],
      }),
    });
    const res = await req.json();
    setOutput(res.run.stdout);
  };

  const socketRef = useRef(null);
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      const handleErrors = (err) => {
        console.log("Error", err);
        navigate("/");
      };

      socketRef.current.emit("join", {
        roomId,
        username: Location.state?.username,
      });

      // Listen for new clients joining the chatroom
      socketRef.current.on("joined", ({ clients, username, socketId }) => {
        // this insure that new user connected message do not display to that user itself
        if (username !== Location.state?.username) {
          alert(`${username} joined the room.`);
        }
        setClients(clients);
        // also send the code to sync
        socketRef.current.emit("sync_code", {
          code: code,
          socketId,
        });
      });

      // listening for disconnected
      socketRef.current.on("disconnected", ({ socketId, username }) => {
        alert(`${username} left the room`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();

    // cleanup
    return () => {
      socketRef.current && socketRef.current.disconnect();
      socketRef.current.off("joined");
      socketRef.current.off("disconnected");
    };
  }, []);

  if (!Location.state) {
    alert("Something went wrong");
  }

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      alert(`roomIs is copied`);
    } catch (error) {
      console.log(error);
      alert("unable to copy the room Id");
    }
  };

  const leaveRoom = async () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen overflow-y-hidden bg-white">
      <div className="bg-[#1e1e1e] w-1/2 h-[100%]">
        <EditorCom
          data={{
            name: "main.py",
            value: "",
            lan: "python",
          }}
          getValue={handleEditorChange}
        />
      </div>
      <div className="w-1/2 bg-slate-950 h-1/2 text-white p-5">
        <pre>{output}</pre>
      </div>
    </div>
  );
}

export default WebEditor;
