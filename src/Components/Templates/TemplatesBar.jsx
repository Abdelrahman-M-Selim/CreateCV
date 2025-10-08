import React from "react";

function TemplateThumb({ id, title, description, active, onSelect }) {
  return (
    <div className={"template-thumb" + (active ? " active" : "")} onClick={()=>onSelect(id)} role="button" tabIndex={0}>
      <div className="mini-preview">{title}</div>
      <div className="label">{description}</div>
    </div>
  );
}

export default function TemplatesBar({ templates, selected, onSelect }) {
  return (
    <div className="templates-bar">
      {templates.map(t => (
        <TemplateThumb key={t.id} {...t} active={selected === t.id} onSelect={onSelect} />
      ))}
    </div>
  );
}
