import React from "react";
import { fileToBase64 } from "../../utils/fileHelpers";

export default function PhotoUploader({ photoBase64, onChange }) {
  async function onFile(e) {
    const f = e.target.files[0];
    if (!f) return;
    const b64 = await fileToBase64(f);
    onChange(b64);
  }

  return (
    <div className="form-group">
      <label>Profile photo</label>
      <input type="file" accept="image/*" onChange={onFile} className="form-control" />
      {photoBase64 && <div style={{ marginTop: 8 }}><img src={photoBase64} alt="preview" style={{ width: 100, height: 100, objectFit: "cover", borderRadius: "50%" }} /></div>}
    </div>
  );
}
