import React from "react";
import {
  generateExportHtml,
  downloadHtmlFile,
  downloadJsonFile,
  copyTextToClipboard,
  downloadPdfFromNode,
} from "../../utils/export";

export default function PreviewToolbar({ previewRef, data }) {
  // Handlers (remain the same)
  async function onDownloadPdf() {
    if (!previewRef.current) return;
    try {
      await downloadPdfFromNode(
        previewRef.current,
        `${(data.personal.fullName || "cv").replace(/\s+/g, "_")}.pdf`
      );
    } catch {
      alert("PDF export failed. Check console.");
    }
  }

  function onExportHtml() {
    const inner = previewRef.current ? previewRef.current.innerHTML : "";
    const html = generateExportHtml(inner, data.personal.fullName);
    downloadHtmlFile("cv_output.html", html);
  }

  function onCopyHtml() {
    const inner = previewRef.current ? previewRef.current.innerHTML : "";
    const html = generateExportHtml(inner, data.personal.fullName);
    copyTextToClipboard(html).then((ok) =>
      alert(ok ? "HTML copied" : "Copy failed")
    );
  }

  function onExportJson() {
    downloadJsonFile("cv_data.json", data);
  }

  return (
    <div className="preview-toolbar">
      <h3 className="toolbar-title">Export & Actions</h3>
      <div className="toolbar-actions">
        {/* Group 1: Output/Export */}
        <div className="action-group">
          <button className="btn btn-primary" onClick={onDownloadPdf}>
            <i className="bi bi-file-pdf-fill" style={{ marginRight: 6 }} />{" "}
            Download PDF
          </button>

          <button className="btn btn-secondary" onClick={onExportHtml}>
            <i
              className="bi bi-file-earmark-code-fill"
              style={{ marginRight: 6 }}
            />{" "}
            Export HTML
          </button>

          <button className="btn btn-secondary" onClick={onCopyHtml}>
            <i className="bi bi-clipboard-fill" style={{ marginRight: 6 }} />{" "}
            Copy HTML
          </button>
        </div>

        <div className="action-group">
          <button className="btn btn-secondary" onClick={onExportJson}>
            <i className="bi bi-filetype-json" style={{ marginRight: 6 }} />{" "}
            Export JSON
          </button>
        </div>
      </div>
    </div>
  );
}
