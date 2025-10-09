// src/data/defaultData.jsx
export const DEFAULT_DATA = {
  personal: {
    fullName: "Abdelrahman Selim",
    title: "Frontend Developer",
    // أطول مقدّمة تعرض في التمبلِيتات (Profile / Summary)
    summary:
      "Frontend developer with practical experience building responsive web apps using HTML, CSS, JavaScript and React. I write clean code, follow best practices, and I’m passionate about learning new tools and improving UX. Experienced with small e-commerce and portfolio projects; seeking opportunities to grow and collaborate.",
    photoBase64: "", // leave empty or fill with data URL
    whatsapp: "https://wa.me/201027602924",
    linkedin: "https://www.linkedin.com/in/abdelrahman-selim-0401a9355",
    email: "engabdo880@mail.com",
    // optional fields that some templates might use
    location: "Zagazig, Egypt",
    website: "", // optional personal website
  },

  // simple bullet personal skills
  personalSkills: ["Fast learner", "Problem solving", "Time management"],

  // professional skills with percent level (0-100)
  profSkills: [
    { name: "HTML / CSS", level: 90 },
    { name: "JavaScript (ES6+)", level: 85 },
    { name: "React", level: 80 },
    { name: "Git / GitHub", level: 80 },
    { name: "Next.js", level: 75 },
    { name: "TypeScript", level: 70 },
  ],

  // languages used in modern/minimal templates
  languages: [
    { name: "Arabic", level: 100 },
    { name: "English", level: 85 },
  ],

  // education entries (degree + institute; you can add date fields if needed)
  educations: [
    {
      degree: "BSc Computer and Information (2023 - 2027)",
      institute: "Zagazig University",
      // optional fields for templates that show dates/locations
      start: "2023",
      end: "2027",
      location: "Zagazig, Egypt",
    },
  ],

  // jobs / experience (title + description)
  jobs: [
    {
      title: "Freelance Web Developer (2024 - Present)",
      description:
        "Developed responsive websites and small web applications using React, HTML/CSS and Node.js. Built e-commerce demo and portfolio sites; integrated Git-based workflows.",
    },
  ],

  // projects: title, short description and repo/link (no images required)
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

  // certificates: title, issuer, optional url (show issuer under title in templates)
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

  // settings: template selection and schema version for future migrations
  settings: {
    selectedTemplate: "classic",
    schemaVersion: 1,
  },
};
