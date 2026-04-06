import React from "react";

const Chatbot = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        borderRadius: "10px",
        overflow: "hidden"
      }}
    >
      <iframe
        src="https://copilotstudio.microsoft.com/environments/1ba33a5b-d052-e598-81ec-4b4b644c889c/bots/copilots_header_78848/webchat?__version__=2"
        style={{
          width: "100%",
          height: "100%",
          border: "none"
        }}
        title="Copilot Chatbot"
      />
    </div>
  );
};

export default Chatbot;