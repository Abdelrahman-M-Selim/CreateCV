// src/data/defaultData.jsx
export const DEFAULT_DATA = {
  personal: {
    fullName: "Abdelrahman Selim",
    title: "Frontend Developer",
    summary:
      "Frontend developer with practical experience building responsive web apps using HTML, CSS, JavaScript and React. I write clean code, follow best practices, and I’m passionate about learning new tools and improving UX. Experienced with small e-commerce and portfolio projects; seeking opportunities to grow and collaborate.",
    photoBase64: "test.jpg", 
    whatsapp: "https://wa.me/201027602924",
    linkedin: "https://www.linkedin.com/in/abdelrahman-selim-0401a9355",
    email: "engabdo880@mail.com",
    location: "Zagazig, Egypt",
    website: "", // optional personal website
  },

  personalSkills: ["Fast learner", "Problem solving", "Time management"],

  profSkills: [
    { name: "HTML / CSS", level: 90 },
    { name: "JavaScript (ES6+)", level: 85 },
    { name: "React", level: 80 },
    { name: "Git / GitHub", level: 80 },
    { name: "Next.js", level: 75 },
    { name: "TypeScript", level: 70 },
  ],

  languages: [
    { name: "Arabic", level: 100 },
    { name: "English", level: 85 },
  ],

  educations: [
    {
      degree: "BSc Computer and Information (2023 - 2027)",
      institute: "Zagazig University",
      start: "2023",
      end: "2027",
      location: "Zagazig, Egypt",
    },
  ],

  jobs: [
    {
      title: "Freelance Web Developer (2024 - Present)",
      description:
        "Developed responsive websites and small web applications using React, HTML/CSS and Node.js. Built e-commerce demo and portfolio sites; integrated Git-based workflows.",
    },
  ],

  projects: [
    {
      title: "Rochetta – Online Pharmacy Store",
      desc: "Simple e-commerce demo with product listing and cart.",
      repo: "https://github.com/Abdelrahman-M-Selim/Rochetta",
    },
    {
      title: "Personal Portfolio",
      desc: "My portfolio site showcasing projects and contact info.",
      repo: "https://github.com/Abdelrahman-M-Selim/MyPortfolio",
    },
  ],

  certificates: [
    {
      title: "Web Dev Using React JS (145 hrs)",
      issuer: "Information Technology Institute (ITI)",
      url: "",
    },
    {
      title: "Algorithm Analysis",
      issuer: "Udemy",
      url: "",
    },
  ],

  // --- NEW VISIBILITY SETTINGS ---
  visibility: {
    showJobs: true, 
    showProjects: true,
    showCertificates: true,
  },

  settings: {
    selectedTemplate: "classic",
    schemaVersion: 1,
  },
};
