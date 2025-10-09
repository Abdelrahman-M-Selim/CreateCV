import React from "react";

/**
 * SkillsList
 * Props:
 *  - personalSkills, profSkills, languages
 *  - onChangePersonal, onChangeProf, onChangeLanguages
 */
export default function SkillsList({
  personalSkills = [],
  profSkills = [],
  languages = [],
  onChangePersonal,
  onChangeProf,
  onChangeLanguages,
}) {
  // personal skills handlers
  function setPersonal(idx, v) {
    const arr = [...personalSkills];
    arr[idx] = v;
    onChangePersonal && onChangePersonal(arr);
  }
  function addPersonal() {
    onChangePersonal && onChangePersonal([...personalSkills, "New skill"]);
  }
  function removePersonal(idx) {
    onChangePersonal &&
      onChangePersonal(personalSkills.filter((_, i) => i !== idx));
  }

  // prof skills handlers
  function setProfName(idx, name) {
    const arr = profSkills.map((s, i) => (i === idx ? { ...s, name } : s));
    onChangeProf(arr);
  }
  function setProfLevel(idx, level) {
    let v = Number(level);
    if (isNaN(v)) v = 0;
    v = Math.max(0, Math.min(100, Math.round(v)));
    const arr = profSkills.map((s, i) => (i === idx ? { ...s, level: v } : s));
    onChangeProf(arr);
  }
  function addProf() {
    onChangeProf([...(profSkills || []), { name: "New Skill", level: 60 }]);
  }
  function removeProf(idx) {
    onChangeProf(profSkills.filter((_, i) => i !== idx));
  }

  // languages handlers (same UI as prof skills)
  function setLangName(idx, name) {
    const arr = languages.map((l, i) => (i === idx ? { ...l, name } : l));
    onChangeLanguages && onChangeLanguages(arr);
  }
  function setLangLevel(idx, level) {
    let v = Number(level);
    if (isNaN(v)) v = 0;
    v = Math.max(0, Math.min(100, Math.round(v)));
    const arr = languages.map((l, i) => (i === idx ? { ...l, level: v } : l));
    onChangeLanguages && onChangeLanguages(arr);
  }
  function addLang() {
    onChangeLanguages && onChangeLanguages([...(languages || []), { name: "New Language", level: 60 }]);
  }
  function removeLang(idx) {
    onChangeLanguages && onChangeLanguages(languages.filter((_, i) => i !== idx));
  }

  return (
    <div>
      <h4>Personal skills</h4>
      <ul className="list-plain">
        {personalSkills.map((s, i) => (
          <li key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
            <input className="form-control" value={s} onChange={(e) => setPersonal(i, e.target.value)} />
            <button className="btn btn-sm" onClick={() => removePersonal(i)}>Remove</button>
          </li>
        ))}
      </ul>
      <button className="btn btn-sm" onClick={addPersonal}>Add personal skill</button>

      <hr />

      <div className="block-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <h4>Professional skills</h4>
        <div>
          <button type="button" className="btn btn-sm" onClick={addProf}>Add</button>
        </div>
      </div>

      <div id="profSkills">
        {(profSkills || []).map((s, idx) => (
          <div key={idx} className="prof-skill-row mb-2" style={{ padding: 10, borderRadius: 8, background: "rgba(0,0,0,0.02)", marginBottom: 12 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
              <input className="form-control" type="text" value={s.name} onChange={(e) => setProfName(idx, e.target.value)} placeholder="Skill name" style={{ flex: 1 }} />
              <input className="form-control small-number" type="number" min={0} max={100} value={s.level} onChange={(e) => setProfLevel(idx, e.target.value)} style={{ width: 90 }} />
              <button className="btn btn-sm" onClick={() => removeProf(idx)}>Remove</button>
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input type="range" min="0" max="100" value={s.level} onChange={(e) => setProfLevel(idx, e.target.value)} className="skill-range" aria-label={`${s.name} level`} style={{ flex: 1 }} />
              <div style={{ width: 48, textAlign: "center", fontSize: 12 }}>{s.level}%</div>
            </div>
          </div>
        ))}
      </div>

      <small className="muted">Percentage from 0 to 100</small>

      {/* ===== Languages section ===== */}
      <hr style={{ marginTop: 18, marginBottom: 8 }} />
      <div className="block-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <h4>Languages</h4>
        <div>
          <button type="button" className="btn btn-sm" onClick={addLang}>Add</button>
        </div>
      </div>

      <div id="languages">
        {(languages || []).map((l, idx) => (
          <div key={idx} className="lang-row" style={{ padding: 10, borderRadius: 8, background: "rgba(0,0,0,0.02)", marginBottom: 12 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
              <input className="form-control" type="text" value={l.name} onChange={(e) => setLangName(idx, e.target.value)} placeholder="Language (e.g. English)" style={{ flex: 1 }} />
              <input className="form-control small-number" type="number" min={0} max={100} value={l.level} onChange={(e) => setLangLevel(idx, e.target.value)} style={{ width: 90 }} />
              <button className="btn btn-sm" onClick={() => removeLang(idx)}>Remove</button>
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input type="range" min="0" max="100" value={l.level} onChange={(e) => setLangLevel(idx, e.target.value)} className="skill-range" aria-label={`${l.name} level`} style={{ flex: 1 }} />
              <div style={{ width: 48, textAlign: "center", fontSize: 12 }}>{l.level}%</div>
            </div>
          </div>
        ))}
      </div>

      <small className="muted">Language proficiency (0-100)</small>
    </div>
  );
}
