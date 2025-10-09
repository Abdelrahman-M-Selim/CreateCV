import React from "react";
import TemplateClassic from "../TemplatesList/TemplateClassic";
import TemplateModern from "../TemplatesList/TemplateModern";
export default function TemplateRenderer({ data, selectedTemplate }) {
  switch (selectedTemplate) {
    case "classic":
    default:
      return <TemplateClassic data={data} />;
    case "modern":
      return <TemplateModern data={data} />;
  }
}
