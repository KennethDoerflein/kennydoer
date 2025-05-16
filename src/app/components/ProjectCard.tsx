import { Card, Button } from "react-bootstrap";
import TechBadges from "./TechBadges";
import Credentials from "./Credentials";

interface Credential {
  label: string;
  password: string;
  username?: string;
  email?: string;
}

interface Project {
  title: string;
  img: string;
  alt: string;
  tech: string[];
  description: string;
  demo: string;
  creds?: Credential[];
  onImageClick: (src: string) => void;
}

const ProjectCard = ({
  title,
  img,
  alt,
  tech,
  description,
  demo,
  creds,
  onImageClick,
}: Project) => (
  <Card className="fade-in-up" style={{ maxWidth: "700px" }}>
    <Card.Header className="text-center">{title}</Card.Header>
    <Card.Img
      variant="top"
      src={img}
      alt={alt}
      className="clickable-image"
      onClick={() => onImageClick(img)}
      style={{ cursor: "pointer" }}
    />
    <Card.Body>
      <Card.Title>Tech Stack:</Card.Title>
      <div className="mb-3">
        <TechBadges tech={tech} />
      </div>
      <Card.Text style={{ whiteSpace: "pre-line" }}>{description}</Card.Text>
    </Card.Body>
    <Card.Footer className="text-center">
      <Button variant="info" href={demo} target="_blank" rel="noopener noreferrer" className="me-2">
        View Demo Site
      </Button>
      {creds && <Credentials creds={creds} />}
    </Card.Footer>
  </Card>
);

export default ProjectCard;
