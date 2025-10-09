import React from "react";

export default function JobsList({ jobs, onChange }) {
  function setJob(idx, key, v) {
    const arr = jobs.map((j,i)=> i===idx ? { ...j, [key]: v } : j);
    onChange(arr);
  }
  function addJob() { onChange([...jobs, { title:"", description:"" }]); }
  function removeJob(idx) { onChange(jobs.filter((_,i)=>i!==idx)); }

  return (
    <div>
      <h4>Jops & Interns</h4>
      {jobs.length===0 && <div style={{ marginBottom:6 }}>No jobs added</div>}
      {jobs.map((j,i)=>(
        <div key={i} style={{ marginBottom:8 }}>
          <input className="form-control" placeholder="Job or intern title" value={j.title} onChange={ev=>setJob(i,"title",ev.target.value)} />
          <textarea className="form-control" placeholder="Description" rows="2" value={j.description} onChange={ev=>setJob(i,"description",ev.target.value)} />
          <button className="btn btn-sm" onClick={()=>removeJob(i)}>Remove</button>
        </div>
      ))}
      <button className="btn btn-sm" onClick={addJob}>Add job</button>
    </div>
  );
}
