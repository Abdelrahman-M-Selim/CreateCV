import React from "react";
import { fileToBase64 } from "../../utils/fileHelpers";

export default function ProjectsList({ projects, onChange }) {
  function setProject(idx, key, value) {
    const arr = projects.map((p,i)=> i===idx ? { ...p, [key]: value } : p);
    onChange(arr);
  }
  function addProject() {
    onChange([...projects, { title: "", desc: "", repo: "", imageBase64: "" }]);
  }
  function removeProject(idx) {
    onChange(projects.filter((_,i)=>i!==idx));
  }
  async function onFile(e, idx) {
    const f = e.target.files[0];
    if (!f) return;
    const b64 = await fileToBase64(f);
    setProject(idx, "imageBase64", b64);
  }

  return (
    <div>
      <h4>Projects</h4>
      {projects.map((p,i)=>(
        <div key={i} style={{ marginBottom:10 }}>
          <input className="form-control" placeholder="Title" value={p.title} onChange={e=>setProject(i,"title",e.target.value)} />
          <input className="form-control" placeholder="Short description" value={p.desc} onChange={e=>setProject(i,"desc",e.target.value)} />
          <input className="form-control" placeholder="Repo url" value={p.repo} onChange={e=>setProject(i,"repo",e.target.value)} />
          <input type="file" accept="image/*" onChange={e=>onFile(e,i)} />
          {p.imageBase64 && <img src={p.imageBase64} alt="proj" style={{ width:120, marginTop:6 }} />}
          <div style={{ marginTop:6 }}>
            <button className="btn btn-sm" onClick={()=>removeProject(i)}>Remove</button>
          </div>
        </div>
      ))}
      <button className="btn btn-sm" onClick={addProject}>Add project</button>
    </div>
  );
}
