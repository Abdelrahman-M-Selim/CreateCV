import React, { useEffect, useState } from "react";

export default function TemplateClassic({ data }) {
  const p = data.personal || {};
  const prof = data.profSkills || [];

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60); 
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="resume-card">
      <div className="left-col">
        <div className="photo-wrap">
          {p.photoBase64 ? (
            <img className="photo" src={p.photoBase64} alt={p.fullName} />
          ) : (
            <div
              style={{ width: "100%", height: "100%", background: "#ddd" }}
            />
          )}
        </div>
        <h2 className="name">{p.fullName}</h2>
        <p className="role">{p.title}</p>

        <section className="section">
          <h3>Personal skills</h3>
          <ul className="bullets">
            {(data.personalSkills || []).map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>

        <section className="section">
          <h3>Professional skills</h3>

          {(prof || []).map((s, i) => {
            const level = Math.max(0, Math.min(100, Number(s.level) || 0));
            return (
              <div
                key={i}
                className="skill"
                data-level={level}
                style={{ marginBottom: 12 }}
              >
                <div
                  className="skill-head"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span className="skill-name">{s.name}</span>
                  <span className="skill-level">{level}%</span>
                </div>
                <div
                  className="skill-bar"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    height: 10,
                    borderRadius: 999,
                    overflow: "hidden",
                    marginTop: 6,
                  }}
                >
                  <div
                    className="skill-fill"
                    style={{
                      height: "100%",
                      transformOrigin: "left",
                      transform: mounted
                        ? `scaleX(${level / 100})`
                        : "scaleX(0)",
                      transition: "transform .9s cubic-bezier(.2,.9,.2,1)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </section>
        <section className="section">
          <h3>Languages</h3>
          {(data.languages || []).map((l, i) => {
            const lvl = Math.max(0, Math.min(100, Number(l.level) || 0));
            return (
              <div
                key={i}
                className="skill"
                data-level={lvl}
                style={{ marginBottom: 10 }}
              >
                <div
                  className="skill-head"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span className="skill-name">{l.name}</span>
                  <span className="skill-level">{lvl}%</span>
                </div>
                <div
                  className="skill-bar"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    height: 10,
                    borderRadius: 999,
                    overflow: "hidden",
                    marginTop: 6,
                  }}
                >
                  <div
                    className="skill-fill"
                    style={{
                      height: "100%",
                      transformOrigin: "left",
                      transform: `scaleX(${lvl / 100})`,
                      transition: "transform .9s cubic-bezier(.2,.9,.2,1)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </section>
      </div>

      <div className="right-col">
        <div className="header ">
          <div className="header-inner">
            <div className="title">
              <h1 className="big-name">{p.fullName}</h1>
              <p className="sub">{(p.title || "").toUpperCase()}</p>
            </div>
            <div className="contacts">
              {p.whatsapp && (
                <a
                  href={p.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-icon"
                >
                  <i className="bi bi-whatsapp" />
                </a>
              )}
              {p.linkedin && (
                <a
                  href={p.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-icon"
                >
                  <i className="bi bi-linkedin" />
                </a>
              )}
              {p.email && (
                <a href={`mailto:${p.email}`} className="contact-icon">
                  <i className="bi bi-envelope-fill" />
                </a>
              )}
            </div>
          </div>
        </div>

        <section className="section">
          <h3>Summary</h3>
          <p>{p.summary}</p>
        </section>

        {/* rest unchanged... render education, jobs, projects, certificates as before */}
        <section className="section timeline">
          <h3>Education</h3>
          {(data.educations || []).map((ed, i) => (
            <div className="item" key={i}>
              <strong>{ed.degree}</strong>
              <p className="muted">{ed.institute}</p>
            </div>
          ))}
        </section>

        <section className="section timeline">
          <h3>Experience</h3>
          {(data.jobs || []).length === 0 ? (
            <div className="item">
              <strong>No jobs yet</strong>
            </div>
          ) : (
            data.jobs.map((j, i) => (
              <div className="item" key={i}>
                <strong>{j.title}</strong>
                <p className="muted">{j.description}</p>
              </div>
            ))
          )}
        </section>

        <section className="section timeline">
          <h3>Projects</h3>
          {(data.projects || []).map((pr, i) => (
            <div
              className="item intro"
              key={i}
              style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
            >
              <div style={{ flex: 1 }}>
                <strong>{pr.title}</strong>
                <p className="muted" style={{ marginTop: 4 }}>
                  {pr.desc}
                </p>
              </div>
              {pr.repo && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <a
                    href={pr.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open repo"
                  >
                    <i className="bi bi-github" style={{ fontSize: 20 }} />
                  </a>
                </div>
              )}
            </div>
          ))}
        </section>

        <section className="section">
          <h3>Certificates</h3>
          {(data.certificates || []).map((c, idx) => (
            <div
              className="item"
              key={idx}
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              <div style={{ flex: 1 }}>
                <strong>{c.title}</strong>
                <p className="muted" style={{ margin: 0 }}>
                  {c.issuer}
                </p>
              </div>
              {c.url && (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open certificate"
                >
                  <i className="bi bi-link-45deg" style={{ fontSize: 18 }} />
                </a>
              )}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
