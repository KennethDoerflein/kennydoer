// src/app/components/ScrollToTopButton.tsx

import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

const ScrollToTopButton = () => (
  <div className="text-center mt-4 goToBtnWrapper">
    <OverlayTrigger
      placement="left"
      overlay={<Tooltip id="scroll-to-top-tooltip">Back to Top</Tooltip>}>
      <Button
        variant="info"
        className="rounded-circle"
        id="goToBtn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <i className="bi bi-arrow-up"></i>
      </Button>
    </OverlayTrigger>
  </div>
);
export default ScrollToTopButton;
