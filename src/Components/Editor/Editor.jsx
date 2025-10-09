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

  return (
    <aside className="editor">
      <header style={{ marginBottom: 10 }}>
        <h2>CV Editor</h2>
        <p style={{ color: "#666" }}>Fill fields and click "Show preview"</p>
      </header>

      <PersonalInfo personal={data.personal} onChange={updatePersonal} />
      <PhotoUploader
        photoBase64={data.personal.photoBase64}
        onChange={(b64) =>
          updatePersonal({ ...data.personal, photoBase64: b64 })
        }
      />

      <SkillsList
        personalSkills={data.personalSkills}
        profSkills={data.profSkills}
        languages={data.languages || []}
        onChangePersonal={updatePersonalSkills}
        onChangeProf={updateProfSkills}
        onChangeLanguages={updateLanguages}
      />

      <EducationsList
        educations={data.educations}
        onChange={updateEducations}
      />
      <JobsList jobs={data.jobs} onChange={updateJobs} />
      <ProjectsList projects={data.projects} onChange={updateProjects} />
      <CertificatesList
        certificates={data.certificates}
        onChange={updateCertificates}
      />

      <div style={{ marginTop: 12 }}>
        <button className="btn btn-primary" onClick={onGenerate}>
          Show preview
        </button>
        <button
          className="btn"
          style={{ marginLeft: 8 }}
          onClick={() => onExportJson()}
        >
          Export JSON
        </button>
        <label style={{ marginLeft: 8 }}>
          <input
            type="file"
            accept=".json"
            style={{ display: "none" }}
            onChange={onLoadJson}
          />
          <button className="btn">Load JSON</button>
        </label>
      </div>
    </aside>
  );
}
