import { Modal, Image } from "react-bootstrap";

const ImageModal = ({ show, onHide, src }: { show: boolean; onHide: () => void; src: string }) => (
  <Modal show={show} onHide={onHide} fullscreen>
    <Modal.Header closeButton />
    <Modal.Body className="d-flex justify-content-center align-items-center bg-dark">
      <Image src={src} fluid alt="Expanded" />
    </Modal.Body>
  </Modal>
);

export default ImageModal;
