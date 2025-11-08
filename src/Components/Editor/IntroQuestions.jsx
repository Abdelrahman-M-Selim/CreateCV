// IntroQuestions.jsx
import React from "react";

// Questions list
const QUESTIONS = [
  {
    key: "showJobs",
    label:
      "Do you have previous work experience (jobs or internships) you wish to display?",
    trueText: "Yes, include Experience",
    falseText: "No, hide Experience",
  },
  {
    key: "showProjects",
    label: "Do you have personal or academic projects you wish to display?",
    trueText: "Yes, include Projects",
    falseText: "No, hide Projects",
  },
  {
    key: "showCertificates",
    label: "Do you have relevant training or certificates you wish to display?",
    trueText: "Yes, include Certificates",
    falseText: "No, hide Certificates",
  },
];

export default function IntroQuestions({ visibility, onChangeVisibility }) {
  const handleChange = (key, value) => {
    onChangeVisibility({
      ...visibility,
      [key]: value,
    });
  };

  return (
    <div className="intro-questions-block">
      <h3
        style={{
          borderBottom: "1px solid #ddd",
          paddingBottom: "10px",
          marginBottom: "15px",
        }}
      >
        CV Section Customization
      </h3>

      {QUESTIONS.map((q) => (
        <div key={q.key} className="question-item">
          <p className="question-label">{q.label}</p>
          <div className="answer-buttons">
            {/* YES button */}
            <button
              className={`btn btn-sm ${
                visibility[q.key] ? "btn-primary" : "btn-secondary-light"
              }`}
              onClick={() => handleChange(q.key, true)}
            >
              {q.trueText}
            </button>

            {/* NO button */}
            <button
              className={`btn btn-sm ${
                !visibility[q.key] ? "btn-primary" : "btn-secondary-light"
              }`}
              onClick={() => handleChange(q.key, false)}
              style={{ marginLeft: "10px" }}
            >
              {q.falseText}
            </button>
          </div>
        </div>
      ))}

      <p
        style={{ marginTop: "20px", fontSize: "0.9em", color: "var(--muted)" }}
      >
        * Sections marked 'No' will be hidden from the editor and the final CV
        preview.
      </p>
    </div>
  );
}
