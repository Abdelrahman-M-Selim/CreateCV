import React from "react";

export default function CertificatesList({ certificates = [], onChange }) {
  function setCert(idx, key, v) {
    const arr = certificates.map((c, i) =>
      i === idx ? { ...c, [key]: v } : c
    );
    onChange(arr);
  }
  function addCert() {
    onChange([
      ...certificates,
      { title: "", issuer: "", imageBase64: "", url: "" },
    ]);
  }
  function removeCert(idx) {
    onChange(certificates.filter((_, i) => i !== idx));
  }

  return (
    <div style={{ marginBottom: 15 }}>
      <div
        className="block-head"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <h4 style={{ fontSize: "1.1em", margin: 0 }}>Certificates</h4>
        <button className="btn btn-sm btn-success" onClick={addCert}>
          + Add
        </button>
      </div>
      {certificates.map((c, i) => (
        <div
          key={i}
          style={{
            marginBottom: 12,
            padding: 8,
            borderRadius: 8,
            background: "rgba(0,0,0,0.02)",
          }}
        >
          <input
            className="form-control"
            placeholder="Certificate title"
            value={c.title}
            onChange={(e) => setCert(i, "title", e.target.value)}
          />
          <input
            className="form-control"
            placeholder="Issuer"
            value={c.issuer}
            onChange={(e) => setCert(i, "issuer", e.target.value)}
          />
          <input
            className="form-control"
            placeholder="Certificate link (optional)"
            value={c.url || ""}
            onChange={(e) => setCert(i, "url", e.target.value)}
          />
          <div
            style={{
              marginTop: 8,
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <button
              className="btn btn-sm btn-danger"
              onClick={() => removeCert(i)}
              style={{ marginLeft: "auto" }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
