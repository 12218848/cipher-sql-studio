import { useState } from "react";
import assignments from "./assignments";
import "./App.css";

function App() {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [query, setQuery] = useState("");
  const [hint, setHint] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // ---------------- GET HINT ----------------
  const getHint = async () => {
    if (!selectedAssignment) return;

    try {
      const res = await fetch("http://localhost:5000/hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: selectedAssignment.question,
        }),
      });

      const data = await res.json();
      setHint(data.hint);
    } catch {
      setHint("Failed to get hint");
    }
  };

  // ---------------- EXECUTE QUERY ----------------
  const executeQuery = async () => {
    setError("");
    setResult(null);

    try {
      const res = await fetch("http://localhost:5000/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      setResult(data.rows);
    } catch {
      setError("Failed to execute query");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1>Cipher SQL Studio</h1>

      <h2>Assignments</h2>
      {assignments.map((a) => (
        <div
          key={a.id}
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h3>{a.title}</h3>
          <p>{a.description}</p>
          <b>Difficulty:</b> {a.difficulty}
          <br />
          <br />
          <button
            onClick={() => {
              setSelectedAssignment(a);
              setQuery("");
              setHint("");
              setResult(null);
              setError("");
            }}
          >
            Start Assignment
          </button>
        </div>
      ))}

      {selectedAssignment && (
        <div style={{ marginTop: "40px" }}>
          <h2>Question</h2>
          <p>{selectedAssignment.question}</p>

          <h3>Your SQL Query</h3>
          <textarea
            rows="5"
            style={{ width: "100%" }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Write your SQL query here..."
          />

          <br />
          <br />

          <button onClick={executeQuery}>Execute Query</button>
          &nbsp;&nbsp;
          <button onClick={getHint}>Get Hint</button>

          {hint && (
            <p style={{ marginTop: "20px" }}>
              <b>Hint:</b> {hint}
            </p>
          )}

          {error && (
            <p style={{ color: "red", marginTop: "20px" }}>
              <b>Error:</b> {error}
            </p>
          )}

          {result && (
            <div style={{ marginTop: "20px" }}>
              <h3>Result</h3>
              <table border="1" cellPadding="10">
                <thead>
                  <tr>
                    {Object.keys(result[0]).map((col) => (
                      <th key={col}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.map((row, i) => (
                    <tr key={i}>
                      {Object.values(row).map((val, j) => (
                        <td key={j}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
