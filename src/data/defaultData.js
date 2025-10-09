// src/data/defaultData.jsx
export const DEFAULT_DATA = {
  personal: {
    fullName: "Abdelrahman Selim",
    title: "Frontend Developer",
    summary:
      "Frontend developer: HTML, CSS, JavaScript. Clean code and continuous learner.",
    photoBase64: "",
    whatsapp: "https://wa.me/201027602924",
    linkedin: "https://www.linkedin.com/in/abdelrahman-selim-0401a9355",
    email: "engabdo880@mail.com",
  },
  personalSkills: ["Fast learner", "Problem solving", "Time management"],
  profSkills: [
    { name: "HTML / CSS", level: 90 },
    { name: "JavaScript (ES6+)", level: 85 },
    { name: "React (Basics)", level: 80 },
  ],
  languages: [
    { name: "Arabic", level: 100 },
    { name: "English", level: 85 },
  ],
  educations: [
    {
      degree: "BSc Computer Science (2023 - 2027)",
      institute: "Zagazig University",
    },
  ],
  jobs: [],
  projects: [
    {
      title: "Rochetta – Online Pharmacy Store",
      desc: "Simple e-commerce demo",
      repo: "https://github.com/Abdelrahman-M-Selim/Rochetta",
    },
    {
      title: "Personal Portfolio",
      desc: "My portfolio site",
      repo: "https://github.com/Abdelrahman-M-Selim/MyPortfolio",
    },
  ],
  certificates: [
    {
      title: "Web Dev Using React JS (145hrs)",
      issuer: "ITI",
      url: "",
    },
    {
      title: "Algorithm Analysis",
      issuer: "Udemy",
      url: "",
    },
  ],
  settings: { selectedTemplate: "classic" },
};
