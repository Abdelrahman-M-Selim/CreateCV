import React from "react";
import { generateExportHtml, downloadHtmlFile, downloadJsonFile, copyTextToClipboard, downloadPdfFromNode } from "../../utils/export";

export default function PreviewToolbar({ previewRef, data }) {
  async function onDownloadPdf() {
    if (!previewRef.current) return;
    try {
      await downloadPdfFromNode(previewRef.current, `${(data.personal.fullName||"cv").replace(/\s+/g,"_")}.pdf`);
    } catch { alert("PDF export failed. Check console."); }
  }

  function onExportHtml() {
    const inner = previewRef.current ? previewRef.current.innerHTML : "";
    const html = generateExportHtml(inner, data.personal.fullName);
    downloadHtmlFile("cv_output.html", html);
  }

  function onCopyHtml() {
    const inner = previewRef.current ? previewRef.current.innerHTML : "";
    const html = generateExportHtml(inner, data.personal.fullName);
    copyTextToClipboard(html).then(ok=> alert(ok ? "HTML copied" : "Copy failed"));
  }

  function onExportJson() {
    downloadJsonFile("cv_data.json", data);
  }

  return (
    <div className="preview-toolbar">
      <div>
        <button className="btn" onClick={onDownloadPdf}>Download PDF</button>
        <button className="btn" onClick={onExportHtml}>Export HTML</button>
        <button className="btn" onClick={onCopyHtml}>Copy HTML</button>
        <button className="btn" onClick={onExportJson}>Export JSON</button>
      </div>
    </div>
  );
}
