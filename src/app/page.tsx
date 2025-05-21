// src/app/page.tsx
"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { Alert, Container, Row, Col, Button } from "react-bootstrap";
import ProjectCard from "./components/ProjectCard";
import ImageModal from "./components/ImageModal";
import ScrollToTopButton from "./components/ScrollToTopButton";
import appInfo from "../../package.json";

const projects = [
  {
    title: "Computer Store",
    img: "/assets/computerStoreHome.png",
    alt: "Computer Store site image",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "SQL", "Bootstrap"],
    description: `Newark IT is a computer store with a fully functional customer registration and sign-in system. It includes a shopping cart, mock checkout, order history, and management of saved cards and addresses. Additionally, it features order filtering and analytics based on a selected date range.`,
    demo: "https://computerstore.kennydoer.com",
    creds: [{ label: "Test", email: "test@test.com", password: "password" }],
  },
  {
    title: "Job Posting Site",
    img: "/assets/ngnHome.png",
    alt: "Job Posting Site image",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "SQL", "Bootstrap", "jQuery", "Select2"],
    description: `New Grad Nomad is a job posting site where users can browse and post job listings. This site includes a page for companies to post job listings and a checkout page with stripe integration.`,
    demo: "https://ngn.kennydoer.com",
  },
  {
    title: "Blackjack",
    img: "/assets/blackjackHome.png",
    alt: "Blackjack site image",
    tech: ["React", "HTML", "CSS", "JavaScript", "React-Bootstrap"],
    description: `This is a comprehensive Blackjack simulator built with React, offering a full suite of gameplay features. Players can place wagers and execute actions such as hitting, standing, doubling down, and splitting. The simulator includes configurable modifiers, such as whether the dealer should hit on a soft 17 and whether splits are determined by rank. Additionally, players can perform an unlimited number of splits, provided they have sufficient points to do so.`,
    demo: "https://blackjack.kennydoer.com",
  },
  {
    title: "Banking System",
    img: "/assets/bankingSystemHome.png",
    alt: "Banking System site image",
    tech: ["HTML", "CSS", "PHP", "SQL"],
    description: `MKJJ banking system is the first project I worked on using HTML, CSS, PHP, and SQL. It is a simple banking system that allows users to create an account, log in, and perform simulated banking operations such as creating or deleting accounts, checking their balance, depositing money, withdrawing money, and transferring money. The system also includes a transaction history feature that allows users to view their past transactions. The admin can view account transactions, approve or deny account creation/deletion requests, add transactions to accounts, and search for specific accounts and transactions.`,
    demo: "https://bankingsystem.kennydoer.com",
    creds: [
      { label: "User", username: "test", password: "password" },
      { label: "Admin", username: "admin", password: "password" },
    ],
  },
  {
    title: "Sporting Goods Emporium",
    img: "/assets/sgeHome.png",
    alt: "Sporting Goods Emporium site image",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "SQL", "Bootstrap"],
    description: `Sporting Goods Emporium is a full-featured online sporting goods store. Customers can register, sign in, browse products by category or search, add items to a shopping cart, and complete a mock checkout. After ordering, they can view their order history. Admins have a separate login that lets them manage everything behind the scenes. They can add, edit, or remove products; view and search orders; and create new admin accounts.`,
    demo: "https://sge.kennydoer.com",
    creds: [
      { label: "User", email: "test@test.com", password: "password" },
      { label: "Admin", username: "admin@sge.com", password: "password" },
    ],
  },
  {
    title: "Tic-Tac-Toe",
    img: "/assets/tictactoeHome.png",
    alt: "tic-tac-toe site image",
    tech: ["React", "HTML", "CSS", "TypeScript", "React-Bootstrap"],
    description: `A React-based Tic-Tac-Toe game with three difficulties: hard (minimax algorithm), medium (50% random), and easy (80% random). Features include a reset button, score tracking (wins, losses, ties) per difficulty, and a user-friendly interface.`,
    demo: "https://tictactoe.kennydoer.com",
  },
];

const HomePage: NextPage = () => {
  const [show, setShow] = useState(false);
  const [modalSrc, setModalSrc] = useState("");

  const openModal = (src: string) => {
    if (window.innerWidth > 768) {
      setModalSrc(src);
      setShow(true);
    }
  };

  return (
    <>
      <Alert variant="warning" className="text-center mx-auto compact-alert px-3">
        <strong>Note: </strong>⚠️ All databases automatically reset to a known state every 30
        minutes (e.g., 10:00, 10:30, 11:00...).
      </Alert>

      <Container>
        <Row xs={1} md={1} className="g-4">
          {projects.map((p) => (
            <Col key={p.title} className="d-flex justify-content-center">
              <ProjectCard {...p} onImageClick={openModal} />
            </Col>
          ))}
        </Row>

        <ScrollToTopButton />
      </Container>

      <ImageModal show={show} onHide={() => setShow(false)} src={modalSrc} />

      <footer className="text-center py-4">
        <Button
          variant="dark"
          size="lg"
          href="https://github.com/KennethDoerflein"
          target="_blank"
          rel="noopener noreferrer">
          <i className="bi bi-github"></i>
        </Button>
        <Container className="text-center pb-2 text-body-secondary">
          Site Version: {appInfo.version}
        </Container>
      </footer>
    </>
  );
};

export default HomePage;
