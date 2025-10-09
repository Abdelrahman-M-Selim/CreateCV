import React from "react";

export default function CertificatesList({ certificates, onChange }) {
  function setCert(idx,key,v){ onChange(certificates.map((c,i)=> i===idx ? {...c,[key]:v} : c)); }
  function addCert(){ onChange([...certificates,{title:"",issuer:""}]); }
  function removeCert(idx){ onChange(certificates.filter((_,i)=>i!==idx)); }

  return (
    <div>
      <h4>Certificates</h4>
      {certificates.map((c,i)=>(
        <div key={i} style={{ marginBottom:8 }}>
          <input className="form-control" placeholder="Certificate title" value={c.title} onChange={e=>setCert(i,"title",e.target.value)} />
          <input className="form-control" placeholder="Issuer" value={c.issuer} onChange={e=>setCert(i,"issuer",e.target.value)} />
          <button className="btn btn-sm" onClick={()=>removeCert(i)}>Remove</button>
        </div>
      ))}
      <button className="btn btn-sm" onClick={addCert}>Add certificate</button>
    </div>
  );
}
