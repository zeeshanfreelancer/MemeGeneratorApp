import { useState, useEffect } from "react";

export default function Main() {
  const [meme, setMeme] = useState({
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
    imageUrl: "http://i.imgflip.com/1bij.jpg"
  });

  const [allMemes, setAllMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch memes");
        }
        return res.json();
      })
      .then(data => {
        setAllMemes(data.data.memes);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  function getMemeImage() {
    if (allMemes.length === 0) return;
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const newMemeUrl = allMemes[randomNumber].url;
    setMeme(prevMeme => ({
      ...prevMeme,
      imageUrl: newMemeUrl
    }));
  }

  function handleChange(event) {
    const { value, name } = event.currentTarget;
    setMeme(preMeme => ({
      ...preMeme,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            type="text"
            placeholder="One does not simply"
            name="topText"
            onChange={handleChange}
            value={meme.topText}
          />
        </label>

        <label>
          Bottom Text
          <input
            type="text"
            placeholder="Walk into Mordor"
            name="bottomText"
            onChange={handleChange}
            value={meme.bottomText}
          />
        </label>
        <button onClick={getMemeImage}>Get a new meme image 🖼</button>
      </div>
      {loading && <div className="loading">Loading memes...</div>}
      {error && <div className="error">{error}</div>}
      <div className="meme">
        <img src={meme.imageUrl} alt="Generated Meme" />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}