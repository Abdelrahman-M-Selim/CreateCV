import React from "react";

export default function JobsList({ jobs, onChange }) {
  function setJob(idx, key, v) {
    const arr = jobs.map((j, i) => (i === idx ? { ...j, [key]: v } : j));
    onChange(arr);
  }
  function addJob() {
    onChange([...jobs, { title: "", description: "" }]);
  }
  function removeJob(idx) {
    onChange(jobs.filter((_, i) => i !== idx));
  }

  return (
    <div style={{ marginBottom: 15 }}>
      <div
        className="block-head"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <h4 style={{ fontSize: "1.1em", margin: 0 }}>Work Experience</h4>
        <button className="btn btn-sm btn-success" onClick={addJob}>
          + Add Job
        </button>
      </div>
      {jobs.length === 0 && (
        <div style={{ marginBottom: 6 }}>No jobs added</div>
      )}
      {jobs.map((j, i) => (
        <div
          key={i}
          style={{
            marginBottom: 12,
            padding: 10,
            borderRadius: 8,
            background: "rgba(0,0,0,0.02)",
          }}
        >
          <input
            className="form-control"
            placeholder="Job or intern title"
            value={j.title}
            onChange={(ev) => setJob(i, "title", ev.target.value)}
            style={{ marginBottom: 8 }}
          />
          <textarea
            className="form-control"
            placeholder="Description"
            rows="2"
            value={j.description}
            onChange={(ev) => setJob(i, "description", ev.target.value)}
            style={{ marginBottom: 8 }}
          />
          <button
            className="btn btn-sm btn-danger mt-2"
            onClick={() => removeJob(i)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
