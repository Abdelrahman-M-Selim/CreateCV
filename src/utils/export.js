// src/utils/export.js
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/* generateExportHtml, downloadFile, downloadHtmlFile, downloadJsonFile same as before */
export function generateExportHtml(htmlInner, title = "cv") {
  return `<!doctype html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap" rel="stylesheet">
  <style>
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
    console.error("copyTextToClipboard failed", e);
    return false;
  }
}

export function waitForImagesToLoad(root, timeout = 3000) {
  const imgs = Array.from(root.querySelectorAll("img"));
  const promises = imgs.map(
    (img) =>
      new Promise((res) => {
        if (!img.src) return res();
        if (img.complete) return res();
        const t = setTimeout(() => res(), timeout);
        img.addEventListener("load", () => {
          clearTimeout(t);
          res();
        });
        img.addEventListener("error", () => {
          clearTimeout(t);
          res();
        });
      })
  );
  return Promise.all(promises);
}

/**
 * Capture node to PDF (image) then overlay clickable link rectangles.
 * This preserves clickable links in the generated PDF.
 */
export async function downloadPdfFromNode(node, fileName = "cv.pdf") {
  try {
    await waitForImagesToLoad(node, 3000);

    // get node size in CSS pixels
    const nodeRect = node.getBoundingClientRect();
    const nodeWidthPx = nodeRect.width;
    const nodeHeightPx = nodeRect.height;

    // render to canvas (use scale for better quality)
    const scale = 2; // you can tweak this
    const canvas = await html2canvas(node, {
      scale,
      useCORS: true,
      allowTaint: false,
    });
    const imgData = canvas.toDataURL("image/png");

    // create PDF and compute dimensions
    const pdf = new jsPDF("p", "pt", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth(); // points
    // compute pageHeight to keep aspect ratio of rendered node
    const imgWidth = canvas.width; // pixels
    const imgHeight = canvas.height; // pixels
    const ratio = imgHeight / imgWidth;
    const pageHeight = Math.floor(pageWidth * ratio);

    // add image stretched to pageWidth x pageHeight
    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);

    // overlay links: find all anchors inside node
    const anchors = Array.from(node.querySelectorAll("a[href]")).filter((a) => {
      const href = a.getAttribute("href");
      return href && !href.startsWith("javascript:") && href.trim() !== "#";
    });

    // compute scale factors from CSS px -> PDF pts
    // nodeWidthPx is in CSS px; pageWidth is in PDF pts.
    // scaleX = pageWidth / nodeWidthPx
    // scaleY = pageHeight / nodeHeightPx
    const scaleX = pageWidth / nodeWidthPx;
    const scaleY = pageHeight / nodeHeightPx;

    anchors.forEach((a) => {
      const href = a.getAttribute("href");
      const r = a.getBoundingClientRect();
      // position relative to the node
      const relLeft = r.left - nodeRect.left;
      const relTop = r.top - nodeRect.top;
      const relWidth = r.width;
      const relHeight = r.height;

      // map to PDF coordinates (points)
      const x = relLeft * scaleX;
      const y = relTop * scaleY;
      const w = relWidth * scaleX;
      const h = relHeight * scaleY;

      try {
        // add a clickable link rectangle
        // jsPDF.link(x, y, w, h, { url: href })  — supported in modern jspdf
        pdf.link(x, y, w, h, { url: href });
      } catch (err) {
        console.warn("Failed to add link for", href, err);
      }
    });

    // save!
    pdf.save(fileName);
  } catch (err) {
    console.error("downloadPdfFromNode error", err);
    throw err;
  }
}

function escapeHtml(str = "") {
  return String(str).replace(/[&<>"']/g, function (m) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[m];
  });
}
