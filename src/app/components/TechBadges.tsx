import { Badge } from "react-bootstrap";

interface TechBadgesProps {
  tech: string[];
}

const TechBadges = ({ tech }: TechBadgesProps) => {
  const colors = ["primary", "secondary", "success", "danger", "warning", "info", "light"];
  return (
    <>
      {tech.map((t, i) => {
        const color = colors[i % colors.length];
        const textColor = ["light", "warning", "info"].includes(color) ? "dark" : "light";
        return (
          <Badge key={t} bg={color} text={textColor} className="me-1 mb-1">
            {t}
          </Badge>
        );
      })}
    </>
  );
};

export default TechBadges;
