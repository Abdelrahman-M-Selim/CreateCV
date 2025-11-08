import React from "react";

export default function EducationsList({ educations, onChange }) {
  function setEdu(idx, key, v) {
    const arr = educations.map((e, i) => (i === idx ? { ...e, [key]: v } : e));
    onChange(arr);
  }
  function addEdu() {
    onChange([...educations, { degree: "", institute: "" }]);
  }
  function removeEdu(idx) {
    onChange(educations.filter((_, i) => i !== idx));
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
        <h4 style={{ fontSize: "1.1em", margin: 0 }}>Education</h4>
        <button className="btn btn-sm btn-success" onClick={addEdu}>
          + Add
        </button>
      </div>
      {educations.map((e, i) => (
        <div
          key={i}
          style={{
            marginBottom: 8,
            padding: 10,
            borderRadius: 8,
            background: "rgba(0,0,0,0.02)",
          }}
        >
          <input
            className="form-control"
            placeholder="Degree and years"
            value={e.degree}
            onChange={(ev) => setEdu(i, "degree", ev.target.value)}
          />
          <input
            className="form-control"
            placeholder="Institute"
            value={e.institute}
            onChange={(ev) => setEdu(i, "institute", ev.target.value)}
          />
          <button
            className="btn btn-sm btn-danger mt-3"
            onClick={() => removeEdu(i)}
          >
            Remove
          </button>
        </div>
      ))}
      <button className="btn btn-sm" onClick={addEdu}>
        Add education
      </button>
    </div>
  );
}
