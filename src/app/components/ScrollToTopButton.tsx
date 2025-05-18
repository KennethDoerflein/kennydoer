import { Button } from "react-bootstrap";

const ScrollToTopButton = () => (
  <div className="text-center mt-4 goToBtnWrapper">
    <Button
      variant="info"
      className="rounded-circle"
      id="goToBtn"
      title="Back to Top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <i className="bi bi-arrow-up"></i>
    </Button>
  </div>
);

export default ScrollToTopButton;
