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

  // load to get intrinsic size
  useEffect(() => {
    const tmp = new window.Image();
    tmp.src = img;
    tmp.onload = () => {
      setDimensions({ width: tmp.naturalWidth, height: tmp.naturalHeight });
      setLoading(false);
    };
  }, [img]);

  return (
    <Card className="fade-in-up" style={{ maxWidth: "700px" }}>
      <Card.Header className="text-center">{title}</Card.Header>

      <div
        className="position-relative w-100"
        style={{
          aspectRatio: dimensions ? `${dimensions.width} / ${dimensions.height}` : "2.1 / 1",
          backgroundColor: "#f0f0f0",
        }}>
        {" "}
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
            onClick={() => onImageClick(img)}
            onLoad={() => setLoading(false)} // ← use onLoad
            style={{
              width: "100%",
              height: "auto",
              opacity: loading ? 0 : 1,
              transition: "opacity 0.3s ease-in-out",
              cursor: "pointer",
            }}
            priority
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
