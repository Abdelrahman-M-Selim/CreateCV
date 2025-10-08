import React, { useRef } from "react";
import TemplatesBar from "../Templates/TemplatesBar";
import TemplateRenderer from "./TemplateRenderer";
import PreviewToolbar from "../Toolbar/PreviewToolbar";

const TEMPLATES = [
  { id: "classic", title: "Classic", description: "Dark left column" },
  { id: "modern", title: "Modern", description: "Header style" },
  { id: "minimal", title: "Minimal", description: "Clean layout" }
];

export default function PreviewWrapper({ data, selectedTemplate, onSelectTemplate, onBack }) {
  const previewRef = useRef(null);

  return (
    <main className="preview-wrap">
      <div style={{ marginBottom: 8 }}>
        <button className="btn" onClick={onBack}>Back to edit</button>
      </div>

      <TemplatesBar templates={TEMPLATES} selected={selectedTemplate} onSelect={onSelectTemplate} />

      <PreviewToolbar previewRef={previewRef} data={data} />

      <div id="preview" ref={previewRef} role="region" aria-label="Resume preview">
        <TemplateRenderer data={data} selectedTemplate={selectedTemplate} />
      </div>
    </main>
  );
}
