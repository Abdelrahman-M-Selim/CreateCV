import React from "react";

/**
 * Simple LTR template for preview and export
 */
export default function TemplateClassic({ data }) {
  const p = data.personal;
  return (
    <div className="resume-card">
      <div className="left-col">
        <div className="photo-wrap">
          {p.photoBase64 ? <img className="photo" src={p.photoBase64} alt={p.fullName} /> : <div style={{ width:"100%",height:"100%",background:"#ddd" }} />}
        </div>
        <h2 className="name">{p.fullName}</h2>
        <p className="role">{p.title}</p>

        <section className="section">
          <h3>Personal skills</h3>
          <ul className="bullets">{(data.personalSkills||[]).map((s,i)=><li key={i}>{s}</li>)}</ul>
        </section>

        <section className="section">
          <h3>Professional skills</h3>
          {(data.profSkills||[]).map((s,i)=>(
            <div key={i} className="skill" data-level={s.level}>
              <div className="skill-head">
                <span className="skill-name">{s.name}</span>
                <span className="skill-level">{s.level}%</span>
              </div>
              <div className="skill-bar"><div className="skill-fill" style={{ transform:`scaleX(${Math.max(0,Math.min(100,s.level))/100})` }} /></div>
            </div>
          ))}
        </section>
      </div>

      <div className="right-col">
        <div className="header">
          <div className="header-inner">
            <div className="title">
              <h1 className="big-name">{p.fullName}</h1>
              <p className="sub">{(p.title || "").toUpperCase()}</p>
            </div>
            <div className="contacts">
              {p.whatsapp && <a href={p.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>}
              {p.linkedin && <a href={p.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
              {p.email && <a href={`mailto:${p.email}`}>{p.email}</a>}
            </div>
          </div>
        </div>

        <section className="section">
          <h3>Summary</h3>
          <p>{p.summary}</p>
        </section>

        <section className="section timeline">
          <h3>Education</h3>
          {(data.educations||[]).map((ed,i)=>(
            <div className="item" key={i}>
              <strong>{ed.degree}</strong>
              <p className="muted">{ed.institute}</p>
            </div>
          ))}
        </section>

        <section className="section timeline">
          <h3>Experience</h3>
          { (data.jobs||[]).length === 0 ? <div className="item"><strong>No jobs yet</strong></div> : data.jobs.map((j,i)=>(
            <div className="item" key={i}>
              <strong>{j.title}</strong>
              <p className="muted">{j.description}</p>
            </div>
          ))}
        </section>

        <section className="section timeline">
          <h3>Projects</h3>
          {(data.projects||[]).map((pr,i)=>(
            <div className="item intro" key={i}>
              <strong>{pr.title}</strong>
              {pr.repo && <div><a href={pr.repo} target="_blank" rel="noreferrer">Repo</a></div>}
              <p className="muted">{pr.desc}</p>
              {pr.imageBase64 && <img src={pr.imageBase64} alt={pr.title} style={{ maxWidth:120, marginTop:8 }} />}
            </div>
          ))}
        </section>

        <section className="section timeline">
          <h3>Certificates</h3>
          {(data.certificates||[]).map((c,i)=>(
            <div className="item" key={i}>
              <strong>{c.title}</strong>
              <p className="muted">{c.issuer}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
