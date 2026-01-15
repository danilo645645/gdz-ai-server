import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const message = req.body.message;

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Ты школьный помощник для 6 класса. Объясняй просто и понятно." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await r.json();
    res.json({ reply: data.choices[0].message.content });
  } catch {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.listen(3000, () => console.log("Server running"));
