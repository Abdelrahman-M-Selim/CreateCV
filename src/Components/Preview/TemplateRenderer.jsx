import React from "react";
import TemplateClassic from "../TemplatesList/TemplateClassic";

export default function TemplateRenderer({ data, selectedTemplate }) {
  switch (selectedTemplate) {
    case "classic":
    default:
      return <TemplateClassic data={data} />;
  }
}
