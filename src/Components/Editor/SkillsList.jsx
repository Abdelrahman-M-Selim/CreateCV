import React from "react";

export default function SkillsList({ personalSkills, profSkills, onChangePersonal, onChangeProf }) {
  function setPersonal(idx, v) {
    const arr = [...personalSkills]; arr[idx] = v; onChangePersonal(arr);
  }
  function removePersonal(idx) { const arr = personalSkills.filter((_,i)=>i!==idx); onChangePersonal(arr); }
  function addPersonal() { onChangePersonal([...personalSkills, "New skill"]); }

  function setProf(idx, key, v) {
    const arr = profSkills.map((s,i)=> i===idx ? { ...s, [key]: v } : s);
    onChangeProf(arr);
  }
  function addProf() { onChangeProf([...profSkills, { name: "New Skill", level: 60 }]); }
  function removeProf(idx) { onChangeProf(profSkills.filter((_,i)=>i!==idx)); }

  return (
    <div>
      <h4>Personal skills</h4>
      <ul className="list-plain">
        {personalSkills.map((s, i) => (
          <li key={i}>
            <input className="form-control" value={s} onChange={e=>setPersonal(i,e.target.value)} />
            <button className="btn btn-sm" onClick={()=>removePersonal(i)}>Remove</button>
          </li>
        ))}
      </ul>
      <button className="btn btn-sm" onClick={addPersonal}>Add personal skill</button>

      <hr />

      <h4>Professional skills</h4>
      {profSkills.map((s,i)=>(
        <div key={i} style={{ display:"flex", gap:8, marginBottom:8 }}>
          <input className="form-control" value={s.name} onChange={e=>setProf(i,"name",e.target.value)} />
          <input type="number" className="form-control" value={s.level} onChange={e=>setProf(i,"level",Math.max(0,Math.min(100,Number(e.target.value)||0)))} style={{width:90}} />
          <button className="btn btn-sm" onClick={()=>removeProf(i)}>Remove</button>
        </div>
      ))}
      <button className="btn btn-sm" onClick={addProf}>Add professional skill</button>
    </div>
  );
}
