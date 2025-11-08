import React from "react";

function TemplateThumb({ id, title, description, active, onSelect }) {
  return (
    <div
      className={`template-thumb ${active ? "active" : ""}`}
      onClick={() => onSelect(id)}
      role="radio"
      aria-checked={active} 
      tabIndex={0}
      title={`Select ${title} template`}
    >
      <div className="mini-preview">
        <i
          className={`bi bi-file-earmark-person-fill template-icon ${
            active ? "active-icon" : ""
          }`}
        ></i>
      </div>
      <div className="label">
        <strong style={{ display: "block", fontSize: "1em" }}>{title}</strong>
        <span className="muted-small">{description}</span>
      </div>
      {active && <span className="active-badge">Selected</span>}
    </div>
  );
}

export default function TemplatesBar({ templates, selected, onSelect }) {
  return (
    <div className="templates-bar-wrapper">
      <h3
        style={{
          margin: "0 0 10px 0",
          fontSize: "1.2em",
          color: "var(--text)",
        }}
      >
        Choose CV Template
      </h3>
      <div className="templates-bar">
        {templates.map((t) => (
          <TemplateThumb
            key={t.id}
            {...t}
            active={selected === t.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
