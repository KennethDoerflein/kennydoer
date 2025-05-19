import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
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
}: Project) => {
  const [loading, setLoading] = useState(true);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const defaultHeight = "32vh";

  useEffect(() => {
    const tempImg = new window.Image();
    tempImg.src = img;

    tempImg.onload = () => {
      setDimensions({ width: tempImg.naturalWidth, height: tempImg.naturalHeight });
      setLoading(false);
    };
  }, [img]);

  return (
    <Card className="fade-in-up" style={{ maxWidth: "700px" }}>
      <Card.Header className="text-center">{title}</Card.Header>

      <div
        style={{
          position: "relative",
          height: loading ? defaultHeight : "auto",
        }}>
        {loading && (
          <div className="position-absolute top-50 start-50 translate-middle z-1">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
        {dimensions && (
          <Image
            src={img}
            alt={alt}
            width={dimensions.width}
            height={dimensions.height}
            style={{
              width: "100%",
              height: "auto",
              opacity: loading ? 0 : 1,
              transition: "opacity 0.3s ease-in-out",
              cursor: "pointer",
            }}
            priority
            onClick={() => onImageClick(img)}
          />
        )}
      </div>

      <Card.Body>
        <Card.Title>Tech Stack:</Card.Title>
        <div className="mb-3">
          <TechBadges tech={tech} />
        </div>
        <Card.Text style={{ whiteSpace: "pre-line" }}>{description}</Card.Text>
      </Card.Body>

      <Card.Footer className="text-center">
        <Button
          variant="info"
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          className="me-2">
          View Demo Site
        </Button>
        {creds && <Credentials creds={creds} />}
      </Card.Footer>
    </Card>
  );
};

export default ProjectCard;
