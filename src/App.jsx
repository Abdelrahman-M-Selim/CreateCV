import React, { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { DEFAULT_DATA } from "./data/defaultData";
import Editor from "./Components/Editor/Editor";
import PreviewWrapper from "./Components/Preview/PreviewWrapper";
import "./styles/main.css";

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
    // scroll to top so preview is centered in view
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function backToEdit() {
    setPreview(false);
    // scroll to top so editor is centered
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    // add a modifier class for layout control
    <div className={`app ${isPreview ? "preview-mode" : "centered-editor"}`}>
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
        // when editor is active, we still render a placeholder preview area for layout harmony (but hidden)
        <div className="preview-wrap placeholder">
          <div className="placeholder-note">Preview hidden. Complete the form and click "Show preview".</div>
        </div>
      )}
    </div>
  );
}
