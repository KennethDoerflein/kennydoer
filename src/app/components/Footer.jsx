// src/app/components/Footer.tsx

import { useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import PrintablesIcon from "./PrintablesIcon";

export default function Footer({ appInfo }) {
  const [showTerms, setShowTerms] = useState(false);

  return (
    <footer className="text-center py-4">
      <Button
        variant="dark"
        size="lg"
        href="https://github.com/KennethDoerflein"
        target="_blank"
        rel="noopener noreferrer">
        <i className="bi bi-github"></i>
      </Button>

      <Button
        variant="dark"
        size="lg"
        href="https://www.printables.com/@ken_590448"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center">
        <PrintablesIcon />
      </Button>

      <Container className="text-center pb-2 text-body-secondary">
        Site Version: {appInfo.version}
      </Container>

      <Container className="text-center pt-2">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setShowTerms(true);
          }}
          className="text-decoration-underline text-body-secondary">
          Terms of Service
        </a>
      </Container>

      <Modal show={showTerms} onHide={() => setShowTerms(false)} centered size="lg">
        <Modal.Header>
          <Modal.Title>Terms of Service</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-start" style={{ maxHeight: "60vh", overflowY: "auto" }}>
          <p>
            <strong>Effective Date:</strong> May 28, 2025
          </p>

          <p>
            By accessing or using this website, including any of its subdomains (e.g.,
            jsg.kennydoer.com, ngn.kennydoer.com, blackjack.kennydoer.com), you agree to be bound by
            these Terms of Service. If you do not agree with these terms, please do not use the
            website or any associated subdomains.
          </p>

          <h5>1. Educational, Demonstration, and Personal Projects</h5>
          <p>
            This website and its subdomains host a variety of non-functional projects created for
            educational purposes, college coursework, personal learning, or hobby development. These
            projects include, but are not limited to, mock e-commerce stores, job listing platforms,
            and game simulations (such as blackjack). All content is provided strictly for
            educational and demonstration purposes. No actual products, services, employment, or
            gambling opportunities are offered.
          </p>

          <h5>2. Use of Third-Party Images and Content</h5>
          <p>
            Some images, logos, and other content displayed on this website or its subdomains may be
            sourced from third-party retailers or platforms. These are used under the fair use
            doctrine (17 U.S.C. § 107) for non-commercial, educational, or illustrative purposes
            only. All trademarks and copyrighted materials remain the property of their respective
            owners. If you are a rights holder and believe your intellectual property is being used
            improperly, please contact us at{" "}
            <a href="mailto:contact@kennydoer.com">contact@kennydoer.com</a>.
          </p>

          <h5>3. Fictitious and Simulated Content</h5>
          <p>
            All content, including products, job postings, user interactions, and game mechanics, is
            entirely fictitious or simulated. No real transactions, services, employment, or
            gambling activities occur on this site or its subdomains.
          </p>

          <h5>4. No Liability</h5>
          <p>
            The website creator assumes no responsibility or liability for any damages, losses, or
            outcomes arising from the use or misuse of this website or its content. All information
            is provided "as is" without warranties of any kind.
          </p>

          <h5>5. User Conduct</h5>
          <p>
            Users agree not to use the website or its subdomains for unlawful purposes or in any way
            that could interfere with its intended educational and demonstration purposes.
          </p>

          <h5>6. Intellectual Property</h5>
          <p>
            All original content, design, and code on this website and its subdomains are the
            property of the site creator and protected by copyright laws. Unauthorized use or
            reproduction is prohibited.
          </p>

          <h5>7. Termination</h5>
          <p>
            Access to the website or its subdomains may be suspended or terminated at any time
            without prior notice for any breach of these terms or misuse.
          </p>

          <h5>8. Changes to Terms</h5>
          <p>
            These Terms of Service may be updated at any time. Continued use after such changes
            constitutes acceptance of the updated terms.
          </p>

          <h5>9. Governing Law</h5>
          <p>
            These terms are governed by the laws of the State of New Jersey, United States, without
            regard to its conflict of law provisions.
          </p>

          <h5>10. Contact Information</h5>
          <p>
            For questions or concerns, please contact:{" "}
            <a href="mailto:contact@kennydoer.com">contact@kennydoer.com</a>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTerms(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </footer>
  );
}
