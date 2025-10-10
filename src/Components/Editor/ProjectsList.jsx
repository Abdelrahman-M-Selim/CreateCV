import React from "react";

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

  return (
     <div style={{ marginBottom: 15 , padding: 10, borderRadius: 8, background: "rgba(0,0,0,0.02)"}}>
    <div className="block-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
      <h4 style={{ fontSize: '1.1em', margin: 0 }}>Projects</h4>
      <button className="btn btn-sm btn-success" onClick={addProject}>+ Add Project</button>
    </div>
      {projects.map((p,i)=>(
        <div key={i} style={{ marginBottom:10 }}>
          <input className="form-control" placeholder="Title" value={p.title} onChange={e=>setProject(i,"title",e.target.value)} />
          <input className="form-control" placeholder="Short description" value={p.desc} onChange={e=>setProject(i,"desc",e.target.value)} />
          <input className="form-control" placeholder="Repo url" value={p.repo} onChange={e=>setProject(i,"repo",e.target.value)} />
          <div style={{ marginTop:6 }}>
            <button className="btn btn-sm btn-danger mt-2" onClick={()=>removeProject(i)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}
