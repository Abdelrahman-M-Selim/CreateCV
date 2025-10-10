import React, { useEffect, useState } from "react";
import "../../styles/TemplatesCSS/TemplateModern.css";

export default function TemplateModern({ data }) {
  const p = data.personal || {};
  const prof = data.profSkills || [];
  const personalSkills = data.personalSkills || [];
  const certs = data.certificates || [];
  const jobs = data.jobs || [];
  const edus = data.educations || [];
  const projects = data.projects || [];
  const langs = data.languages || [];

  // State to trigger animations after mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Helper function to render skill dots
  const renderDots = (lvl = 0, dots = 10) => {
    const filled = Math.round(
      (Math.max(0, Math.min(100, Number(lvl) || 0)) / 100) * dots
    );
    return Array.from({ length: dots }).map((_, di) => (
      <span
        key={di}
        className={"dot " + (di < filled && mounted ? "dot-filled" : "")}
      />
    ));
  };

  return (
    <div className="modern-resume">
      <div className={`modern-card ${mounted ? "mounted" : ""}`}>
        {/* Header Section */}
        <div className="modern-header">
          <div className="header-top">
            <div className="name-block">
              <h1 className="full-name">{p.fullName}</h1>
              <div className="title">{p.title}</div>
            </div>

            <div className="contact-icons">
              {p.email && (
                <a
                  className="contact-link"
                  href={`mailto:${p.email}`}
                  title={p.email}
                  aria-label="Email"
                >
                  <i className="bi bi-envelope-fill" />
                </a>
              )}
              {p.linkedin && (
                <a
                  className="contact-link"
                  href={p.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <i className="bi bi-linkedin" />
                </a>
              )}
              {p.whatsapp && (
                <a
                  className="contact-link"
                  href={p.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="WhatsApp"
                  aria-label="WhatsApp"
                >
                  <i className="bi bi-telephone-fill" />
                </a>
              )}
            </div>
          </div>

          <div className="photo-circle">
            {p.photoBase64 ? (
              <img src={p.photoBase64} alt={p.fullName} />
            ) : (
              <div className="photo-placeholder" />
            )}
          </div>
        </div>

        {/* Body Section (Stacked Rows) */}
        <div className="modern-body">
          {/* 1. PROFILE full width */}
          <div className="row row-profile">
            <div className="profile-block card-block full">
              <h3>Profile</h3>
              <p className="muted">{p.summary}</p>
            </div>
          </div>

          {/* 2. SKILLS (left) + CERTIFICATES (right) */}
          <div className="row row-skill-cert">
            <div className="col-left">
              <div className="card-block">
                <h3>Professional Skills</h3>
                <div className="skill-list">
                  {prof.map((s, i) => {
                    const lvl = Math.max(
                      0,
                      Math.min(100, Number(s.level) || 0)
                    );
                    return (
                      <div key={i} className="skill-row">
                        <div className="skill-meta">
                          <span className="skill-name text-muted">
                            {s.name}
                          </span>
                          <div className="skill-level-indicator">
                            <span className="skill-percent" aria-hidden>
                              {lvl}%
                            </span>
                            <div className="dots" aria-hidden>
                              {renderDots(lvl, 10)}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <h3 style={{ marginTop: "15px" }}>Personal Skills</h3>
                <ul className="simple-list">
                  {personalSkills.map((ps, i) => (
                    <li className="text-muted" key={i}>
                      {ps}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-right">
              <div className="card-block">
                <h3>Certificates</h3>
                <ul className="cert-list">
                  {certs.map((c, i) => (
                    <li key={i} className="cert-item">
                      <div>
                        <strong>{c.title}</strong>
                        <div className="muted small">{c.issuer}</div>
                      </div>
                      {c.url && (
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon"
                          title="Open certificate"
                        >
                          <i className="bi bi-link-45deg" />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 3. EXPERIENCE + EDUCATION side-by-side (equal width) */}
          <div className="row row-exp-edu">
            <div className="col-equal">
              <div className="card-block big">
                <h3>Experience</h3>
                {(jobs || []).length === 0 ? (
                  <div className="muted">No jobs yet</div>
                ) : (
                  jobs.map((j, idx) => (
                    <div key={idx} className="entry">
                      <div className="entry-head">
                        <strong>{j.title}</strong>
                      </div>
                      <div className="muted">{j.description}</div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="col-equal">
              <div className="card-block big">
                <h3>Education</h3>
                {(edus || []).map((ed, i) => (
                  <div className="entry" key={i}>
                    <div className="entry-head">
                      <strong>{ed.degree}</strong>
                    </div>
                    <div className="muted">{ed.institute}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4. PROJECTS (left) + LANGUAGES (right small box) */}
          <div className="row row-projects-langs">
            <div className="projects-col">
              <div className="card-block">
                <h3>Projects</h3>
                <div className="projects-row">
                  {projects && projects.length > 0 ? (
                    projects.map((pr, i) => (
                      <div className="project-card" key={i}>
                        <div className="proj-title">{pr.title}</div>
                        <div className="muted project-desc">{pr.desc}</div>
                        {pr.repo && (
                          <a
                            href={pr.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="repo-link"
                            title="View Repository"
                          >
                            <i className="bi bi-github" />
                          </a>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="muted">No projects yet</div>
                  )}
                </div>
              </div>
            </div>

            <div className="langs-col">
              <div className="card-block">
                <h3>Languages</h3>
                <div className="lang-list">
                  {langs.map((l, i) => {
                    const lvl = Math.max(
                      0,
                      Math.min(100, Number(l.level) || 0)
                    );
                    return (
                      <div key={i} className="lang-item">
                        <span className="lang-name">{l.name}</span>
                        <div className="lang-bar">
                          <div
                            className="lang-fill"
                            // Animation relies on parent mounted class and transition defined in CSS
                            style={{ transform: `scaleX(${lvl / 100})` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
