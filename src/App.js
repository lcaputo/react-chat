import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useChat } from "./components/useChat";
import { db } from "./firebase";
import "bootstrap/dist/css/bootstrap.min.css";
const toDate = require("normalize-date");

function App() {
  const [message, setMessage] = React.useState("");
  const { loading, messages, error } = useChat();
  const [sending, setSending] = useState(false);

  const sendMessage = (e) => {
    e.preventDefault();

    if (message.length > 0 && message.length <= 40) {
      db.collection("messages").add({
        timestamp: Date.now(),
        message,
      });
      setSending(true);
      setMessage("");
      setTimeout(function () {
        setSending(false);
      }, 2000);
    } else if (message.length > 40) {
      alert("maximo 40 letras papu");
    } else {
      alert("no puede enviar mensajes en blanco");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container" style={{ marginTop: "-2rem" }}>
          CHAT
          <div className="row">
            <div className="col-12">
              <p>Escribe tu mensaje...</p>
              <form>
                <div className="row justify-content-center">
                  <textarea
                    className="w-50"
                    value={message}
                    disabled={sending}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  />
                  <button
                    className="my-xs-4 m-xl-0 btn btn-primary"
                    type="submit"
                    onClick={sendMessage}
                    disabled={sending}
                  >
                    Enviar Mensaje
                  </button>
                </div>
                <div className="scroll-view">
                  <ul style={{ listStyle: "none", padding: "0" }}>
                    {messages.map((m) => (
                      <li key={m.id}>
                        <div className="col-12">
                          <small style={{ fontSize: "12px", float: "left" }}>
                            {toDate(m.timestamp)
                              .toString()
                              .split(" ")
                              .slice(1, 5)
                              .map((r) => r + " ")}
                          </small>
                        </div>
                        <br />
                        <div className="col-12 text-left">{m.message}</div>
                        <hr
                          style={{
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            width: "75%",
                            margin: ".5rem",
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
