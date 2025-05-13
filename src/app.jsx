import React, { useState } from "react";
import axios from "axios";

function App() {
  const [mode, setMode] = useState("Content");
  const [formData, setFormData] = useState({
    companyName: "",
    productService: "",
    keyPoints: "",
    clientMaterials: "",
    brief: "",
    contentType: "Advertorial",
    wordCount: "",
    topic: "",
    tweak: "",
  });

  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleModeChange = (e) => {
    setMode(e.target.value);
    setResult("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      let response;
      if (mode === "Content") {
        const {
          companyName,
          productService,
          keyPoints,
          clientMaterials,
          brief,
          contentType,
          wordCount,
        } = formData;

        if (
          !companyName ||
          !productService ||
          !keyPoints ||
          !clientMaterials ||
          !brief ||
          !contentType ||
          !wordCount
        ) {
          alert("Please complete all required fields.");
          return;
        }

        response = await axios.post(
          "https://chloebotbackend-production.up.railway.app/generate",
          formData
        );
      } else {
        if (!formData.topic) {
          alert("Please enter a topic to research.");
          return;
        }

        response = await axios.post(
          "https://chloebotbackend-production.up.railway.app/research",
          {
            topic: formData.topic,
          }
        );
      }

      console.log("✅ API response:", response.data);

      if (!response.data.content) {
        console.warn("⚠️ No content returned from API");
        setResult("<p>No results found.</p>");
      } else {
        setResult(response.data.content);
      }
    } catch (error) {
      console.error("Generate error:", error);
      setError(
        "Failed to generate " +
          mode.toLowerCase() +
          ": " +
          (error.response?.data || error.message)
      );
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      alert("Output copied to clipboard!");
    } catch (err) {
      alert("Failed to copy output.");
    }
  };

  const handleTweak = async () => {
    if (!result) {
      alert("Please generate content before requesting a tweak.");
      return;
    }

    if (!formData.tweak) {
      alert("Please enter a tweak instruction.");
      return;
    }

    try {
      const response = await axios.post(
        "https://chloebotbackend-production.up.railway.app/tweak",
        {
          original: result,
          instruction: formData.tweak,
        }
      );
      setResult(response.data.content);
    } catch (error) {
      console.error("Tweak error:", error);
      alert(
        "Failed to submit tweak: " + (error.response?.data || error.message)
      );
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 20 }}>
      <h1>ChloeBot ✨</h1>

      <label style={{ fontWeight: "bold" }}>Choose Mode:</label>
      <select
        name="mode"
        value={mode}
        onChange={handleModeChange}
        style={{ marginBottom: 20 }}
      >
        <option value="Content">Content</option>
        <option value="Research">Research</option>
      </select>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        {mode === "Content" && (
          <>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              onChange={handleChange}
              required
              style={{ padding: 12, fontSize: 16 }}
            />
            <input
              type="text"
              name="productService"
              placeholder="Product/Service"
              onChange={handleChange}
              required
              style={{ padding: 12, fontSize: 16 }}
            />
            <textarea
              name="keyPoints"
              placeholder="Key Points"
              onChange={handleChange}
              required
              rows={4}
              style={{ padding: 12, fontSize: 16 }}
            />
            <textarea
              name="clientMaterials"
              placeholder="Materials Provided by Client"
              onChange={handleChange}
              required
              rows={4}
              style={{ padding: 12, fontSize: 16 }}
            />
            <textarea
              name="brief"
              placeholder="Brief"
              onChange={handleChange}
              required
              rows={4}
              style={{ padding: 12, fontSize: 16 }}
            />
            <select
              name="contentType"
              onChange={handleChange}
              required
              style={{ padding: 12, fontSize: 16 }}
            >
              <option value="Advertorial">Advertorial</option>
              <option value="Breaking news">Breaking News</option>
              <option value="Feature">Feature</option>
              <option value="Online article">Online Article</option>
            </select>
            <input
              type="number"
              name="wordCount"
              placeholder="Word Count"
              onChange={handleChange}
              required
              style={{ padding: 12, fontSize: 16 }}
            />
          </>
        )}

        {mode === "Research" && (
          <input
            type="text"
            name="topic"
            placeholder="Optional: e.g. lithium, iron ore, sustainability"
            onChange={handleChange}
            style={{ padding: 12, fontSize: 16 }}
          />
        )}

        <button
          type="submit"
          style={{ marginTop: 10, padding: 12, fontSize: 16 }}
        >
          Generate ✍️
        </button>
      </form>

      {error && (
        <div style={{ color: "red", marginTop: 20 }}>
          <strong>{error}</strong>
        </div>
      )}

      {result && (
        <div
          style={{
            marginTop: 40,
            background: "#f4f4f4",
            padding: 20,
            borderRadius: 8,
          }}
        >
          <h2>Generated Output:</h2>

          {mode === "Research" ? (
            <div
              style={{ whiteSpace: "normal" }}
              dangerouslySetInnerHTML={{
                __html: result || "<p>No articles found.</p>",
              }}
            />
          ) : (
            <div style={{ whiteSpace: "pre-wrap" }}>{result}</div>
          )}

          {mode === "Content" && (
            <>
              <button
                onClick={handleCopy}
                style={{
                  marginTop: 10,
                  padding: 10,
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: 5,
                }}
              >
                Copy to Clipboard
              </button>

              <div style={{ marginTop: 30 }}>
                <label style={{ fontWeight: "bold" }}>Request a tweak:</label>
                <input
                  type="text"
                  name="tweak"
                  placeholder="e.g. Make it more concise, add stats, use a more professional tone"
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: 12,
                    fontSize: 16,
                    marginTop: 10,
                  }}
                />
                <button
                  onClick={handleTweak}
                  style={{
                    marginTop: 10,
                    padding: 10,
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: 5,
                  }}
                >
                  Submit Tweak Request
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
