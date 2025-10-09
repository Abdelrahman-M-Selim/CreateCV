import React, { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { DEFAULT_DATA } from "./data/defaultData";
import Editor from "./Components/Editor/Editor";
import PreviewWrapper from "./Components/Preview/PreviewWrapper";
import "App.css";

export default function App() {
  const [data, setData] = useLocalStorage("cv_data_v1", DEFAULT_DATA);
  const [isPreview, setPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(data.settings?.selectedTemplate || "classic");

  function handleChange(next) {
    setData({ ...next, settings: { ...next.settings, selectedTemplate } });
  }

  function openPreview() {
    // ensure selected template saved to data
    setData({ ...data, settings: { ...data.settings, selectedTemplate } });
    setPreview(true);
  }

  function backToEdit() {
    setPreview(false);
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cv_data.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function loadJsonFile(e) {
    const f = e.target.files[0];
    if (!f) return;
    const text = await f.text();
    try {
      const parsed = JSON.parse(text);
      setData(parsed);
      setSelectedTemplate(parsed.settings?.selectedTemplate || "classic");
      alert("JSON loaded");
    } catch (err) {
      alert("Invalid JSON" ,err);
    }
  }

  return (
    <div className="app">
      <Editor
        data={data}
        onChange={handleChange}
        onGenerate={openPreview}
        onExportJson={exportJson}
        onLoadJson={loadJsonFile}
      />

      {isPreview ? (
        <PreviewWrapper
          data={data}
          selectedTemplate={selectedTemplate}
          onSelectTemplate={(id)=> { setSelectedTemplate(id); setData({ ...data, settings: { ...data.settings, selectedTemplate: id } }); }}
          onBack={backToEdit}
        />
      ) : (
        <div className="preview-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 400 }}>
          <div style={{ color:"#666" }}>Preview hidden. Click "Show preview" in the editor.</div>
        </div>
      )}
    </div>
  );
}
