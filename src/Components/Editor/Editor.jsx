import React from "react";
import PersonalInfo from "./PersonalInfo";
import PhotoUploader from "./PhotoUploader";
import SkillsList from "./SkillsList";
import ProjectsList from "./ProjectsList";
import EducationsList from "./EducationsList";
import JobsList from "./JobsList";
import CertificatesList from "./CertificatesList";

export default function Editor({
  data,
  onChange,
  onGenerate,
  onExportJson,
  onLoadJson,
}) {
  // split handlers for nested updates
  function updateLanguages(next) {
    onChange({ ...data, languages: next });
  }
  function updatePersonal(next) {
    onChange({ ...data, personal: next });
  }
  function updatePersonalSkills(next) {
    onChange({ ...data, personalSkills: next });
  }
  function updateProfSkills(next) {
    onChange({ ...data, profSkills: next });
  }
  function updateProjects(next) {
    onChange({ ...data, projects: next });
  }
  function updateEducations(next) {
    onChange({ ...data, educations: next });
  }
  function updateJobs(next) {
    onChange({ ...data, jobs: next });
  }
  function updateCertificates(next) {
    onChange({ ...data, certificates: next });
  }

  const Section = ({ title, children }) => (
    <section
      className="editor-section"
      style={{ padding: "16px 0", borderBottom: "1px solid #eee" }}
    >
      <h3
        style={{
          margin: "0 0 10px 0",
          fontSize: "1.2em",
          borderLeft: "4px solid var(--accent)",
          paddingLeft: "8px",
        }}
      >
        {title}
      </h3>
      {children}
    </section>
  );
  return (
    <aside className="editor">
      <header
        style={{
          marginBottom: 20,
          textAlign: "center",
          paddingBottom: 10,
          borderBottom: "1px solid #ddd",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "1.5em", color: "var(--text)" }}>
          📝 CV Editor
        </h2>
        <p
          style={{
            color: "var(--muted)",
            margin: "4px 0 0 0",
            fontSize: "0.9em",
          }}
        >
          Fill fields and click "Show preview"
        </p>
      </header>

      {/* 1. Personal Information */}
      <Section title="Personal Info & Photo">
        <PersonalInfo personal={data.personal} onChange={updatePersonal} />
        <div style={{ marginTop: 15 }}>
          <PhotoUploader
            photoBase64={data.personal.photoBase64}
            onChange={(b64) =>
              updatePersonal({ ...data.personal, photoBase64: b64 })
            }
          />
        </div>
      </Section>

      {/* 2. Skills and Languages */}
      <Section title="Skills & Languages">
        <SkillsList
          personalSkills={data.personalSkills}
          profSkills={data.profSkills}
          languages={data.languages || []}
          onChangePersonal={updatePersonalSkills}
          onChangeProf={updateProfSkills}
          onChangeLanguages={updateLanguages}
        />
      </Section>

      {/* 3. Experience */}
      <Section title="Work Experience">
        <JobsList jobs={data.jobs} onChange={updateJobs} />
      </Section>

      {/* 4. Education and Certificates */}
      <Section title="Education & Certificates">
        <EducationsList
          educations={data.educations}
          onChange={updateEducations}
        />
        <hr style={{ margin: "15px 0", borderColor: "#eee" }} />
        <CertificatesList
          certificates={data.certificates}
          onChange={updateCertificates}
        />
      </Section>

      {/* 5. Projects */}
      <Section title="Projects">
        <ProjectsList projects={data.projects} onChange={updateProjects} />
      </Section>

      {/* 6. Actions (Buttons) */}
      <div
        style={{
          marginTop: 20,
          paddingTop: 15,
          borderTop: "1px solid #ddd",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <button className="btn btn-primary" onClick={onGenerate}>
          Show Preview
        </button>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          <button
            className="btn btn-secondary"
            onClick={() => onExportJson()}
            style={{ flex: 1 }}
          >
            Export JSON 💾
          </button>
          <label
            className="btn btn-secondary"
            style={{
              flex: 1,
              cursor: "pointer",
              textAlign: "center",
              margin: 0,
            }}
          >
            Load JSON 📂
            <input
              type="file"
              accept=".json"
              style={{ display: "none" }}
              onChange={onLoadJson}
            />
          </label>
        </div>
      </div>
    </aside>
  );
}
