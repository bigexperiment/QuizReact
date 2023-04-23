import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [joke, setJoke] = useState("loading...");

  useEffect(() => {
    let apiKey = "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";
    let prompt = window.prompt("About what?");

    if (prompt) {
      fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Please answer  this piece of prompt using  emojis. first say the   emojis and tell the answer.  [${prompt}]`,
            },
          ],
        }),
      })
        .then((r) => r.json())
        .then((r) => {
          console.log(r.choices[0].message.content);
          setJoke(r.choices[0].message.content);
        });
    }
  }, []);

  return (
    <div className="poem-container">
      <pre className="poem">{joke}</pre>
    </div>
  );
}

export default App;
