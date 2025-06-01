// src/app/components/ProjectCard.tsx

import Image from "next/image";
import { Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Project } from "../types";
import Credentials from "./Credentials";
import TechBadges from "./TechBadges";

const ProjectCard = ({
  title,
  img,
  alt,
  tech,
  description,
  demo,
  creds,
  onImageClick,
  isFirst = false,
  intrinsicWidth,
  intrinsicHeight,
}: Project) => {
  const aspectRatio = `${intrinsicWidth} / ${intrinsicHeight}`;

  return (
    <Card className="fade-in-up" style={{ maxWidth: "700px" }}>
      <Card.Header className="text-center" style={{ backgroundColor: "#0F172A" }}>
        {title}
      </Card.Header>
      <OverlayTrigger
        placement="right"
        delay={{ show: 700, hide: 200 }}
        overlay={<Tooltip id="expand-tooltip">Click image to enlarge</Tooltip>}>
        <div
          className="position-relative w-100"
          style={{
            aspectRatio: aspectRatio,
            backgroundColor: "#f0f0f0",
          }}
          onClick={() => onImageClick(img)}>
          <Image
            src={img}
            alt={alt}
            width={intrinsicWidth}
            height={intrinsicHeight}
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              objectFit: "cover",
              transition: "opacity 0.3s ease-in-out",
            }}
            priority={isFirst} // Load first card image immediately
          />
        </div>
      </OverlayTrigger>

      <Card.Body>
        <Card.Title>Tech Stack:</Card.Title>
        <div className="mb-3">
          <TechBadges tech={tech} />
        </div>
        <Card.Text style={{ whiteSpace: "pre-line" }}>{description}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-center">
        <Button
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          className={`gradientButton mx-auto`}>
          View Demo Site
        </Button>
        {creds && <Credentials creds={creds} />}
      </Card.Footer>
    </Card>
  );
};

export default ProjectCard;
