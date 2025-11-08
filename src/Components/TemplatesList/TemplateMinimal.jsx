import React from "react";
import "../../styles/TemplatesCSS/TemplateMinimal.css";

export default function TemplateMinimal({ data }) {
  const p = data.personal || {};
  const prof = data.profSkills || [];
  const certs = data.certificates || [];
  const jobs = data.jobs || [];
  const edus = data.educations || [];
  const projects = data.projects || [];
  const personalSkills = data.personalSkills || [];

  const visibility = data.visibility || {};

  // Consolidated list for Coursework/Skills (remains unchanged)
  const consolidatedSkills = [
    ...(data.relevantCoursework || []),
    ...personalSkills,
    ...prof.map((s) => s.name),
  ]
    .filter(Boolean)
    .reduce((acc, current) => {
      if (!acc.includes(current)) {
        acc.push(current);
      }
      return acc;
    }, [])
    .slice(0, 16);

  // Helper to extract specific technical skills (remains unchanged)
  const getTechList = (regex) => {
    return (
      prof
        .filter((s) => regex.test(s.name))
        .map((s) => s.name)
        .join(", ") || "—"
    );
  };

  // Extract specific skills for the Technical Skills grid (remains unchanged)
  const techLanguages = getTechList(
    /(javascript|python|java|c\+\+|c#|swift|go|ruby|html|css|sql|typescript)/i
  );
  const techFrameworks = getTechList(
    /(react|next|vue|angular|laravel|node|django|spring|bootstrap|tailwind)/i
  );
  const techTools = getTechList(
    /(git|github|gitlab|docker|kubernetes|aws|azure|figma|vs code|jira|jenkins|mongo|mysql|postgre)/i
  );

  return (
    <div className="tm-page">
      <div className="tm-card">
        {/* Header (Always Visible) */}
        <header className="tm-header">
          <div className="tm-name-wrap">
            <h1 className="tm-name">{p.fullName || "FULL NAME"}</h1>
            <div className="tm-title">{p.title || "Job Title"}</div>
          </div>

          {/* Contact Icons (Always Visible) */}
          <div className="tm-contacts" aria-label="contact links">
            {p.whatsapp && (
              <a
                className="tm-contact-btn"
                href={p.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
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
                rel="noopener noreferrer"
                title="LinkedIn"
              >
                <i className="bi bi-linkedin" />
              </a>
            )}
          </div>
        </header>

        {/* Body Content */}
        <main className="tm-body">
          <div className="tm-body-inner">
            {/* 2. Profile Summary (Conditional: only hide if summary is empty AND visibility is false) */}
            {p.summary && (
              <section className="tm-section tm-summary">
                <h3 className="tm-section-title">Profile Summary</h3>
                <p className="tm-muted tm-summary-text">{p.summary}</p>
              </section>
            )}

            {/* Education + Core Skills (Always visible as they are fundamental) */}
            <section className="tm-section tm-two-cols">
              <div className="tm-col tm-edu-col">
                <h3 className="tm-section-title">Education</h3>
                {edus.map((e, i) => (
                  <div className="tm-edu-item" key={i}>
                    <div className="tm-edu-degree">{e.degree}</div>
                    {e.institute && (
                      <div className="tm-muted tm-small">{e.institute}</div>
                    )}
                  </div>
                ))}
              </div>

              <div className="tm-col tm-coursework-col">
                <h3 className="tm-section-title">Core Skills / Coursework</h3>
                <ul className="tm-dot-list">
                  {consolidatedSkills.map((it, idx) => (
                    <li className="tm-chip" key={idx}>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 3. Experience (Conditional) */}
            {visibility.showJobs && (
              <section className="tm-section">
                <h3 className="tm-section-title">Experience</h3>
                {jobs.length === 0 ? (
                  <div className="tm-muted">No experience entries yet</div>
                ) : (
                  jobs.map((j, idx) => (
                    <div className="tm-entry" key={idx}>
                      <strong>{j.title || j.name}</strong>
                      {j.description && (
                        <div className="tm-muted tm-small">{j.description}</div>
                      )}
                    </div>
                  ))
                )}
              </section>
            )}

            {/* 4. Projects (Conditional) */}
            {visibility.showProjects && (
              <section className="tm-section">
                <h3 className="tm-section-title">Projects</h3>
                <div className="tm-projects-row">
                  {projects.length === 0 ? (
                    <div className="tm-muted">No projects added yet</div>
                  ) : (
                    projects.map((pr, i) => (
                      <div className="tm-proj-item" key={i}>
                        <div className="tm-proj-title">
                          <strong>{pr.title}</strong>
                          {pr.repo ? (
                            <a
                              href={pr.repo}
                              target="_blank"
                              rel="noopener noreferrer"
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
            )}

            {/* 5. Certifications & Training (Conditional) */}
            {visibility.showCertificates && (
              <section className="tm-section">
                <h3 className="tm-section-title">Training & Certifications</h3>
                <div className="tm-certs-row">
                  {certs.length === 0 ? (
                    <div className="tm-muted">No certificates added yet</div>
                  ) : (
                    certs.map((c, i) => (
                      <div className="tm-cert-item" key={i}>
                        <div className="tm-cert-title">
                          <strong>{c.title}</strong>
                          {c.url ? (
                            <a
                              href={c.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="tm-proj-link"
                              title={`View ${c.title}`}
                              aria-label={`View ${c.title}`}
                            >
                              <i className="bi bi-link-45deg" />
                            </a>
                          ) : null}
                        </div>
                        {c.issuer && (
                          <div className="tm-muted tm-small">{c.issuer}</div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </section>
            )}

            {/* Technical Skills Grid (Bottom - Always visible as it uses static content and profSkills) */}
            <section className="tm-section tm-tech-box">
              <h3 className="tm-section-title">Technical Skills</h3>
              <div className="tm-tech-grid">
                <div>
                  <div className="tm-tech-heading">Languages / Databases</div>
                  <div className="tm-muted tm-small tm-tech-list">
                    {techLanguages || "—"}
                  </div>
                </div>
                <div>
                  <div className="tm-tech-heading">Frameworks / Libraries</div>
                  <div className="tm-muted tm-small tm-tech-list">
                    {techFrameworks || "—"}
                  </div>
                </div>
                <div>
                  <div className="tm-tech-heading">Tools / Platforms</div>
                  <div className="tm-muted tm-small tm-tech-list">
                    {techTools || "—"}
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
