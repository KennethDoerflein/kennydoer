// src/app/components/ProjectCard.tsx

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { useTooltip } from "../hooks/useTooltip";
import { Project } from "../types";
import Credentials from "./Credentials";
import TechBadges from "./TechBadges";

const techBadgeContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
};

const ProjectCard = ({
  title,
  img,
  alt,
  tech,
  description,
  demo,
  credentials,
  onImageClick,
  isFirst = false,
  intrinsicWidth,
  intrinsicHeight,
  note,
  completionTime,
  github,
  year,
  isHoverEnabled,
}: Project) => {
  // Safely calculate aspect ratio with a fallback.
  const aspectRatio =
    intrinsicWidth && intrinsicHeight ? `${intrinsicWidth} / ${intrinsicHeight}` : "16 / 9";
  const loadedRef = useRef<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(img ? !loadedRef.current[img] : false);

  // Pass the isHoverEnabled state to the useTooltip hook
  const { isVisible: isTooltipVisible, triggerProps, tooltipStyle } = useTooltip(isHoverEnabled);

  useEffect(() => {
    if (!img) {
      setLoading(false);
      return;
    }
    setLoading(!loadedRef.current[img]);
  }, [img]);

  const handleImageLoad = () => {
    if (!img) return;
    loadedRef.current[img] = true;
    setLoading(false);
  };

  // This checks if clicks are allowed before proceeding.
  const handleImageClick = () => {
    if (isHoverEnabled && img) {
      onImageClick(img);
    }
  };

  return (
    <Card className="fade-in-up" style={{ maxWidth: "700px" }}>
      <Card.Header className="text-center" style={{ backgroundColor: "#0F172A" }}>
        <div>{title}</div>
        {year !== undefined && year !== null && (
          <small className="text-muted d-block mt-2" style={{ fontSize: "0.7em" }}>
            📅 {year}
          </small>
        )}
        {completionTime && (
          <small className="text-muted" style={{ fontSize: "0.65em" }}>
            ⏱️ Estimated Completion Time: ~{completionTime}
          </small>
        )}
      </Card.Header>

      {/* This renders the image container ONLY if an image is provided. */}
      {img && intrinsicWidth && intrinsicHeight && (
        <div
          className="bg-dark position-relative w-100"
          style={{
            aspectRatio: aspectRatio,
            // Conditionally set the cursor to indicate clickability.
            cursor: isHoverEnabled ? "pointer" : "default",
          }}
          onClick={handleImageClick}
          {...triggerProps} // Spread the trigger props here
        >
          {loading && (
            <div className="position-absolute top-50 start-50 translate-middle z-1">
              <Spinner animation="border" variant="primary" />
            </div>
          )}

          {/* Apply the tooltip style and control visibility */}
          {isTooltipVisible && <div style={tooltipStyle}>Click image to enlarge</div>}

          <Image
            src={img}
            alt={alt || `${title} project image`}
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
            onLoad={handleImageLoad} // This hides the spinner when done
          />
        </div>
      )}

      <Card.Body>
        <Card.Title>Tech Stack:</Card.Title>
        <motion.div
          className="mb-3"
          variants={techBadgeContainerVariants}
          initial="hidden"
          animate="visible">
          <TechBadges tech={tech} />
        </motion.div>
        <Card.Text style={{ whiteSpace: "pre-line" }}>{description}</Card.Text>
      </Card.Body>
      {(note || github || demo || credentials) && (
        <Card.Footer className="text-center">
          {note && (
            <div className="mb-3 text-muted">
              <strong>Note:</strong> {note}
            </div>
          )}
          <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mb-2">
            {demo && (
              <Button
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className={`gradientButton mx-auto`}>
                View Demo Site
              </Button>
            )}
            {github && (
              <Button
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="github-btn mx-auto">
                <i className="bi bi-github me-2"></i>
                View on Github
              </Button>
            )}
          </div>
          {credentials && <Credentials credentials={credentials} />}
        </Card.Footer>
      )}
    </Card>
  );
};

export default ProjectCard;
