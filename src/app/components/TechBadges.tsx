// src/app/components/TechBadges.tsx

import { Badge } from "react-bootstrap";
import { TechBadgesProps } from "../types";

const TechBadges = ({ tech }: TechBadgesProps) => {
  const colors = ["primary", "secondary", "success", "danger", "warning", "info", "light"];
  return (
    <>
      {tech.map((t, i) => {
        const color = colors[i % colors.length];
        const textColor = ["light", "warning", "info"].includes(color) ? "dark" : "light";
        return (
          <Badge key={t} bg={color} text={textColor} className="me-1 mb-1 tech-badge-hover">
            {t}
          </Badge>
        );
      })}
    </>
  );
};

export default TechBadges;
