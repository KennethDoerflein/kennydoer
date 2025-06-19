// src/app/components/ProjectCard.tsx

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { useTooltip } from "../hooks/useTooltip";
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
  note,
  completionTime,
  github,
}: Project) => {
  const aspectRatio = `${intrinsicWidth} / ${intrinsicHeight}`;
  const [loading, setLoading] = useState(true);

  const { isVisible: isTooltipVisible, triggerProps, tooltipStyle } = useTooltip();

  useEffect(() => {
    setLoading(true);
  }, [img]);

  return (
    <Card className="fade-in-up" style={{ maxWidth: "700px" }}>
      <Card.Header className="text-center" style={{ backgroundColor: "#0F172A" }}>
        <div>{title}</div>
        {completionTime && (
          <small className="text-muted" style={{ fontSize: "0.65em" }}>
            ⏱️ Estimated Completion Time: ~{completionTime}
          </small>
        )}
      </Card.Header>

      <div
        className="bg-dark position-relative w-100"
        style={{ aspectRatio: aspectRatio }}
        onClick={() => onImageClick(img)}
        {...triggerProps}>
        {isTooltipVisible && <div style={tooltipStyle}>Click image to enlarge</div>}

        {loading && (
          <div className="position-absolute top-50 start-50 translate-middle z-1">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
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
            opacity: loading ? 0.5 : 1,
            transition: "opacity 0.3s ease-in-out",
          }}
          priority={isFirst}
          onLoad={() => setLoading(false)}
        />
      </div>

      <Card.Body>
        <Card.Title>Tech Stack:</Card.Title>
        <div className="mb-3">
          <TechBadges tech={tech} />
        </div>
        <Card.Text style={{ whiteSpace: "pre-line" }}>{description}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-center">
        {note && (
          <div className="mb-3 text-muted">
            <strong>Note:</strong> {note}
          </div>
        )}
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-2 mb-2">
          <Button
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className={`gradientButton mx-auto`}>
            View Demo Site
          </Button>
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="github-btn mx-auto"
              style={{ textDecoration: "none" }}>
              <Button
                variant="dark"
                style={{
                  background: "linear-gradient(90deg, #24292e 60%, #6e5494 100%)",
                  color: "#fff",
                  fontWeight: 600,
                  border: "none",
                  borderRadius: "12px",
                  padding: "14px 36px",
                  fontSize: "1.2rem",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5em",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                className="github-gradient-btn">
                <svg
                  height="1.3em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  style={{ marginRight: 8 }}>
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
                View on Github
              </Button>
            </a>
          )}
        </div>
        {creds && <Credentials creds={creds} />}
      </Card.Footer>
    </Card>
  );
};

export default ProjectCard;
