// src/app/page.tsx
"use client";

import type { NextPage } from "next";
import { useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import appInfo from "../../package.json";
import Footer from "./components/Footer";
import ImageModal from "./components/ImageModal";
import ProjectCard from "./components/ProjectCard";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { projects } from "./data/projects";

const HomePage: NextPage = () => {
  const [show, setShow] = useState(false);
  const [modalSrc, setModalSrc] = useState("");

  const openModal = (src: string) => {
    if (window.innerWidth > 768) {
      setModalSrc(src);
      setShow(true);
    }
  };

  // Show dev site alert if version contains beta, alpha, or rc
  const isDevVersion = /beta|alpha|rc/i.test(appInfo.version);

  return (
    <>
      {isDevVersion && (
        <Alert variant="danger" className="text-center mx-auto compact-alert px-3 my-0">
          <strong>Development Version: </strong>
          You are currently on the development site. Features may be unstable.
        </Alert>
      )}

      <Alert variant="warning" className="text-center mx-auto compact-alert px-3 mb-0">
        <strong>Note: </strong>⚠️ All databases automatically reset to a known state every 30
        minutes (e.g., 10:00, 10:30, 11:00...).
      </Alert>

      <Container>
        <Row xs={1} md={1} className="g-4">
          {projects.map((p, index) => (
            <Col key={p.title} className="d-flex justify-content-center">
              <ProjectCard {...p} onImageClick={openModal} isFirst={index === 0} />
            </Col>
          ))}
        </Row>

        <ScrollToTopButton />
      </Container>

      <ImageModal show={show} onHide={() => setShow(false)} src={modalSrc} />

      <Footer appInfo={appInfo} />
    </>
  );
};

export default HomePage;
