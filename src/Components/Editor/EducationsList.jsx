import React from "react";

export default function EducationsList({ educations, onChange }) {
  function setEdu(idx, key, v) {
    const arr = educations.map((e,i)=> i===idx ? { ...e, [key]: v } : e);
    onChange(arr);
  }
  function addEdu() { onChange([...educations, { degree:"", institute:"" }]); }
  function removeEdu(idx) { onChange(educations.filter((_,i)=>i!==idx)); }

  return (
    <div>
      <h4>Educations</h4>
      {educations.map((e,i)=>(
        <div key={i} style={{ marginBottom:8 }}>
          <input className="form-control" placeholder="Degree and years" value={e.degree} onChange={ev=>setEdu(i,"degree",ev.target.value)} />
          <input className="form-control" placeholder="Institute" value={e.institute} onChange={ev=>setEdu(i,"institute",ev.target.value)} />
          <button className="btn btn-sm" onClick={()=>removeEdu(i)}>Remove</button>
        </div>
      ))}
      <button className="btn btn-sm" onClick={addEdu}>Add education</button>
    </div>
  );
}
