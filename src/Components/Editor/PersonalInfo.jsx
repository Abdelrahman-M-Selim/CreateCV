import React from "react";

export default function PersonalInfo({ personal, onChange }) {
  function update(field, value) {
    onChange({ ...personal, [field]: value });
  }

  return (
    <div style={{ padding: "0 0 10px 0" }}>
      <p
        style={{
          margin: "0 0 25px 0",
          fontSize: "0.9em",
          color: "var(--muted)",
        }}
      >
        Contact info and brief summary.
      </p>

      <div>
        <div className="form-group">
          <label>Full name</label>
          <input
            className="form-control"
            value={personal.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            autoFocus
          />
        </div>

        <div className="form-group">
          <label>Jop Title</label>
          <input
            className="form-control"
            value={personal.title}
            onChange={(e) => update("title", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Introduction</label>
          <textarea
            className="form-control"
            rows="3"
            value={personal.summary}
            onChange={(e) => update("summary", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            value={personal.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>LinkedIn (url)</label>
          <input
            className="form-control"
            value={personal.linkedin}
            onChange={(e) => update("linkedin", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>WhatsApp (url)</label>
          <input
            className="form-control"
            value={personal.whatsapp}
            onChange={(e) => update("whatsapp", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
