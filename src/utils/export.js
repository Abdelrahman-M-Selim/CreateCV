import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Generate HTML export string. You can extend template injection if needed.
 */
export function generateExportHtml(htmlInner, title = "cv") {
  return `<!doctype html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap" rel="stylesheet">
  <style>
    /* minimal embed styles - you can replace with your CSS */
    body { font-family: 'Cairo', Arial, sans-serif; padding: 20px; background:#f5f7fb; color:#222; }
    .export-wrap { max-width: 900px; margin:0 auto; }
  </style>
</head>
<body>
  <div class="export-wrap">
    ${htmlInner}
  </div>
</body>
</html>`;
}

/**
 * Download a file
 */
export function downloadFile(filename, content, type = "text/plain") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function downloadHtmlFile(filename, htmlString) {
  downloadFile(filename, htmlString, "text/html");
}

export function downloadJsonFile(filename, obj) {
  downloadFile(filename, JSON.stringify(obj, null, 2), "application/json");
}

export async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
   return console.error(" false ", e);
  }
}

/**
 * Wait for images to load inside node
 */
export function waitForImagesToLoad(root, timeout = 3000) {
  const imgs = Array.from(root.querySelectorAll("img"));
  const promises = imgs.map(img => {
    return new Promise(res => {
      if (!img.src) return res();
      if (img.complete) return res();
      const t = setTimeout(() => res(), timeout);
      img.addEventListener("load", () => { clearTimeout(t); res(); });
      img.addEventListener("error", () => { clearTimeout(t); res(); });
    });
  });
  return Promise.all(promises);
}

/**
 * Capture node to PDF using html2canvas and jsPDF
 */
export async function downloadPdfFromNode(node, fileName = "cv.pdf") {
  try {
    await waitForImagesToLoad(node, 3000);
    const canvas = await html2canvas(node, { scale: 2, useCORS: true, allowTaint: false });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF.jsPDF("p", "pt", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = imgHeight / imgWidth;
    const pageHeight = Math.floor(pageWidth * ratio);
    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
    pdf.save(fileName);
  } catch (err) {
    console.error("downloadPdfFromNode error", err);
    throw err;
  }
}

function escapeHtml(str = "") {
  return String(str).replace(/[&<>"']/g, function (m) {
    return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[m];
  });
}
