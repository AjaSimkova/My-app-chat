import React, { useState } from "react";
import "./ExplainCode.css";

export default function ExplainCode() {
  const [value, setValue] = useState();
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const API_KEY = "fake_API";
  const handleCallOpenAIAPI = async () => {
    fetch("http://localhost:8082/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: "Explain this code: " + value,
        temperature: 0,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ['"""'],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data.choices[0].text);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="box-explain">
      <h1 className="main-title">Explain Code</h1>
      <input
        class="text"
        placeholder="You can writte....."
        onChange={handleChange} 
      ></input>
      <button onClick={handleCallOpenAIAPI}>Explain</button>

      {data !== "" ? <p>{data}</p> : null}
      {error ? <p>error</p> : null}
      {loading ? <p>loading</p> : null}
    </div>
  );
}
