import { useState } from "react";
import { api } from "../api";

export default function ChatPanel() {

  const [msg,setMsg]=useState("");
  const [res,setRes]=useState("");

  const send = async () => {
    try {
      const r = await api.post("/chat",{message:msg});
      setRes(r.data.generatedSQL || JSON.stringify(r.data,null,2));
    } catch (e) {
      setRes("Error calling backend");
      console.error(e);
    }
  };

  return (
    <div className="chat">
      <input
        placeholder="Ask question..."
        onChange={e=>setMsg(e.target.value)}
      />
      <button onClick={send}>Ask</button>
      <pre>{res}</pre>
    </div>
  );
}