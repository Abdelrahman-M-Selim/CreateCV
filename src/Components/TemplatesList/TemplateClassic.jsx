import React, { useEffect, useState } from "react";

export default function TemplateClassic({ data }) {
  const p = data.personal || {};
  const prof = data.profSkills || [];

  const visibility = data.visibility || {};

  // Animation state for skill bars
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Delay mounting slightly to ensure CSS transitions run on load
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Helper component for Right Column Sections
  const RightSection = ({ title, children, hasSeparator = true }) => (
    <section
      className={`section ${hasSeparator ? "has-sep" : ""}`}
      style={{
        padding: "22px 28px",
        borderBottom: hasSeparator ? "1px solid #f0f0f0" : "none",
      }}
    >
      <h3
        style={{
          fontSize: "16px",
          fontWeight: "700",
          color: "var(--text)",
          marginBottom: "12px",
        }}
      >
        {title}
      </h3>
      {children}
    </section>
  );

  // Helper component for Timeline Items (remains unchanged)
  const TimelineItem = ({
    title,
    subtitle,
    description,
    link,
    linkIconClass,
  }) => (
    <div
      className="timeline-item"
      style={{
        margin: "14px 0",
        borderLeft: "3px solid var(--accent)",
        paddingLeft: "15px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <strong
          style={{ display: "block", fontSize: "16px", color: "var(--text)" }}
        >
          {title}
        </strong>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="item-link"
            title={title}
            style={{
              color: "var(--accent)",
              textDecoration: "none",
              marginLeft: "10px",
            }}
          >
            <i className={linkIconClass} style={{ fontSize: 18 }} />
          </a>
        )}
      </div>
      <p className="muted" style={{ margin: "4px 0 0 0", fontSize: "14px" }}>
        {subtitle}
      </p>
      {description && (
        <p style={{ margin: "8px 0 0 0", fontSize: "14px" }}>{description}</p>
      )}
    </div>
  );

  return (
    <div className="resume-card">
      {/* --------------------- LEFT COLUMN (Skills, Contact) --------------------- */}
      <div className="left-col">
        {/* Photo & Basic Info (Always visible) */}
        <div className="photo-wrap">
          {p.photoBase64 ? (
            <img className="photo" src={p.photoBase64} alt={p.fullName} />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "rgba(255,255,255,0.1)",
              }}
            />
          )}
        </div>
        <h2 className="name">{p.fullName}</h2>
        <p className="role">{p.title}</p>

        {/* Contact Info (Always visible) */}
        <section className="section contact-details">
          <h3>Contact</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: "10px 0 0 0" }}>
            {p.email && (
              <li style={{ margin: "5px 0" }}>
                <i
                  className="bi bi-envelope-fill"
                  style={{ marginRight: "8px", color: "var(--accent)" }}
                />
                {p.email}
              </li>
            )}
            {p.linkedin && (
              <li style={{ margin: "5px 0" }}>
                <i
                  className="bi bi-linkedin"
                  style={{ marginRight: "8px", color: "var(--accent)" }}
                />
                <a
                  href={p.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  LinkedIn Profile
                </a>
              </li>
            )}
            {p.whatsapp && (
              <li style={{ margin: "5px 0" }}>
                <i
                  className="bi bi-whatsapp"
                  style={{ marginRight: "8px", color: "var(--accent)" }}
                />
                <a
                  href={p.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  WhatsApp Link
                </a>
              </li>
            )}
          </ul>
        </section>

        {/* Personal Skills (Always visible) */}
        <section className="section">
          <h3>Soft Skills</h3>
          <ul className="bullets">
            {(data.personalSkills || []).map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>

        {/* Professional Skills (Always visible) */}
        <section className="section">
          <h3>Technical Skills</h3>
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
                    background: "rgba(255,255,255,0.15)",
                    height: 8,
                    borderRadius: 999,
                    overflow: "hidden",
                    marginTop: 4,
                  }}
                >
                  <div
                    className="skill-fill"
                    style={{
                      height: "100%",
                      transform: mounted
                        ? `scaleX(${level / 100})`
                        : "scaleX(0)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </section>

        {/* Languages (Always visible) */}
        <section className="section">
          <h3>Languages</h3>
          {(data.languages || []).map((l, i) => {
            const lvl = Math.max(0, Math.min(100, Number(l.level) || 0));
            return (
              <div
                key={i}
                className="skill"
                data-level={lvl}
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
                  <span className="skill-name">{l.name}</span>
                  <span className="skill-level">{lvl}%</span>
                </div>
                <div
                  className="skill-bar"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    height: 8,
                    borderRadius: 999,
                    overflow: "hidden",
                    marginTop: 4,
                  }}
                >
                  <div
                    className="skill-fill"
                    style={{
                      height: "100%",
                      transform: mounted ? `scaleX(${lvl / 100})` : "scaleX(0)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </section>
      </div>

      {/* --------------------- RIGHT COLUMN (Experience, Edu, Projects, Certs) --------------------- */}
      <div className="right-col">
        {/* Header (Always visible) */}
        <div
          className="header"
          style={{ padding: "25px 28px", height: "auto" }}
        >
          <div className="title">
            <h1 className="big-name" style={{ fontSize: "2em" }}>
              {p.fullName}
            </h1>
            <p className="sub" style={{ fontSize: "1em" }}>
              {(p.title || "").toUpperCase()}
            </p>
          </div>
        </div>

        {/* Summary (Always visible) */}
        <RightSection title="Profile Summary">
          <p style={{ margin: 0, lineHeight: 1.6 }}>{p.summary}</p>
        </RightSection>

        {/* Experience (Conditional) */}
        {visibility.showJobs && (
          <RightSection title="Work Experience">
            <div className="timeline">
              {(data.jobs || []).map((j, i) => (
                <TimelineItem
                  key={i}
                  title={j.title}
                  subtitle={j.company || "Job/Internship"}
                  description={j.description}
                />
              ))}
              {(data.jobs || []).length === 0 && (
                <p className="muted" style={{ margin: "14px 0" }}>
                  No work experience added yet.
                </p>
              )}
            </div>
          </RightSection>
        )}

        {/* Education (Always visible) */}
        <RightSection title="Education">
          <div className="timeline">
            {(data.educations || []).map((ed, i) => (
              <TimelineItem key={i} title={ed.degree} subtitle={ed.institute} />
            ))}
          </div>
        </RightSection>

        {/* Projects (Conditional) */}
        {visibility.showProjects && (
          <RightSection title="Key Projects" hasSeparator={false}>
            <div className="timeline">
              {(data.projects || []).map((pr, i) => (
                <TimelineItem
                  key={i}
                  title={pr.title}
                  subtitle={pr.desc}
                  link={pr.repo}
                  linkIconClass="bi bi-github"
                />
              ))}
            </div>
          </RightSection>
        )}

        {/* Certificates (Conditional) */}
        {visibility.showCertificates && (
          <RightSection title="Certificates" hasSeparator={false}>
            {(data.certificates || []).map((c, idx) => (
              <div
                key={idx}
                className="item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  margin: "10px 0",
                }}
              >
                <div style={{ flex: 1 }}>
                  <strong style={{ display: "block" }}>{c.title}</strong>
                  <p
                    className="muted"
                    style={{ margin: "3px 0 0 0", fontSize: "13px" }}
                  >
                    {c.issuer}
                  </p>
                </div>
                {c.url && (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open certificate"
                    className="item-link"
                    style={{ color: "var(--accent)", textDecoration: "none" }}
                  >
                    <i className="bi bi-link-45deg" style={{ fontSize: 20 }} />
                  </a>
                )}
              </div>
            ))}
          </RightSection>
        )}
      </div>
    </div>
  );
}
