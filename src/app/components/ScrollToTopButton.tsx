import { Button } from "react-bootstrap";

const ScrollToTopButton = () => (
  <div className="text-center mt-4 scrollToTop">
    <Button
      variant="info"
      className="rounded-circle"
      id="scrollToTop"
      title="Back to Top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <i className="bi bi-arrow-up"></i>
    </Button>
  </div>
);

export default ScrollToTopButton;
