import React from "react";
import "../../styles/TemplatesCSS/TemplateMinimal.css";

export default function TemplateMinimal({ data }) {
  const p = data.personal || {};
  const prof = data.profSkills || [];
  const certs = data.certificates || [];
  const jobs = data.jobs || [];
  const edus = data.educations || [];
  const projects = data.projects || [];

  return (
    <div className="tm-page">
      <div className="tm-card">
        {/* header */}
        <header className="tm-header">
          <div className="tm-name-wrap">
            <h1 className="tm-name">{p.fullName || "Full Name"}</h1>
            <div className="tm-title">{p.title}</div>
          </div>

          {/* icons only (clickable) */}
          <div className="tm-contacts" aria-label="contact links">
            {p.whatsapp && (
              <a
                className="tm-contact-btn"
                href={p.whatsapp}
                target="_blank"
                rel="noreferrer"
                title="WhatsApp"
              >
                <i className="bi bi-telephone-fill" />
              </a>
            )}
            {p.email && (
              <a
                className="tm-contact-btn"
                href={`mailto:${p.email}`}
                title="Email"
              >
                <i className="bi bi-envelope-fill" />
              </a>
            )}
            {p.linkedin && (
              <a
                className="tm-contact-btn"
                href={p.linkedin}
                target="_blank"
                rel="noreferrer"
                title="LinkedIn"
              >
                <i className="bi bi-linkedin" />
              </a>
            )}
          </div>
        </header>

        {/* body content centered */}
        <main className="tm-body">
          <div className="tm-body-inner">
            {/* Education + Relevant Coursework */}
            <section className="tm-section tm-two-cols">
              <div className="tm-col">
                <h3 className="tm-section-title">Education</h3>
                {edus.map((e, i) => (
                  <div className="tm-edu-item" key={i}>
                    <div className="tm-edu-degree">{e.degree}</div>
                    {e.institute && (
                      <div className="tm-muted">{e.institute}</div>
                    )}
                  </div>
                ))}
              </div>

              <div className="tm-col">
                <h3 className="tm-section-title">Relevant Coursework</h3>
                <ul className="tm-dot-list">
                  {[
                    ...(data.relevantCoursework || []),
                    ...prof.map((s) => s.name),
                  ]
                    .filter(Boolean)
                    .slice(0, 12)
                    .map((it, idx) => (
                      <li className="tm-chip" key={idx}>
                        {it}
                      </li>
                    ))}
                </ul>
              </div>
            </section>

            {/* Experience */}
            <section className="tm-section">
              <h3 className="tm-section-title">Experience</h3>
              {jobs.length === 0 ? (
                <div className="tm-muted">No jobs yet</div>
              ) : (
                jobs.map((j, idx) => (
                  <div className="tm-entry" key={idx}>
                    <strong>{j.title || j.name}</strong>
                    {j.description && (
                      <div className="tm-muted">{j.description}</div>
                    )}
                  </div>
                ))
              )}
            </section>

            {/* Projects (no links) */}
            {/* Projects */}
            <section className="tm-section">
              <h3 className="tm-section-title">Projects</h3>
              <div className="tm-projects-row">
                {projects.length === 0 ? (
                  <div className="tm-muted">No projects yet</div>
                ) : (
                  projects.map((pr, i) => (
                    <div className="tm-proj-item" key={i}>
                      <div className="tm-proj-title">
                        <strong>{pr.title}</strong>

                        {/* repo link icon (shown only if repo url exists) */}
                        {pr.repo ? (
                          <a
                            href={pr.repo}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="tm-proj-link"
                            title={`Open ${pr.title} repo`}
                            aria-label={`Open ${pr.title} repo`}
                          >
                            <i className="bi bi-box-arrow-up-right" />
                          </a>
                        ) : null}
                      </div>

                      {pr.desc && (
                        <div className="tm-muted tm-small">{pr.desc}</div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Certifications (issuer under title, no link) */}
            <section className="tm-section">
              <h3 className="tm-section-title">Training & Certifications</h3>
              {certs.length === 0 ? (
                <div className="tm-muted">No certificates</div>
              ) : (
                certs.map((c, i) => (
                  <div className="tm-cert-item" key={i}>
                    <div className="tm-cert-title">
                      <strong>{c.title}</strong>
                    </div>
                    {c.issuer && (
                      <div className="tm-muted tm-small">{c.issuer}</div>
                    )}
                  </div>
                ))
              )}
            </section>

            {/* Technical Skills */}
            <section className="tm-section tm-tech-box">
              <h3 className="tm-section-title">Technical Skills</h3>
              <div className="tm-tech-grid">
                <div>
                  <div className="tm-tech-heading">Languages</div>
                  <div className="tm-muted tm-small">
                    {prof
                      .map((s) => s.name)
                      .slice(0, 6)
                      .join(", ") || "—"}
                  </div>
                </div>
                <div>
                  <div className="tm-tech-heading">Concepts</div>
                  <div className="tm-muted tm-small">
                    OOP, RESTful APIs, Responsive UI
                  </div>
                </div>
                <div>
                  <div className="tm-tech-heading">Tools</div>
                  <div className="tm-muted tm-small">VS Code, Git, GitHub</div>
                </div>
                <div>
                  <div className="tm-tech-heading">Frameworks</div>
                  <div className="tm-muted tm-small">
                    {prof
                      .filter((s) =>
                        /react|next|vue|angular|laravel|bootstrap|typescript/i.test(
                          s.name
                        )
                      )
                      .map((s) => s.name)
                      .join(", ") || "—"}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
