import { Modal, Spinner } from "react-bootstrap";
import Image from "next/image";
import { useState, useEffect } from "react";

const ImageModal = ({ show, onHide, src }: { show: boolean; onHide: () => void; src: string }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (show) setLoading(true);
  }, [show, src]);

  return (
    <Modal show={show} onHide={onHide} fullscreen>
      <Modal.Header closeButton />
      <Modal.Body className="d-flex justify-content-center align-items-center bg-dark position-relative">
        {loading && <Spinner animation="border" variant="light" />}
        <div style={{ position: "relative", width: "100%", height: "80vh" }}>
          <Image
            src={src}
            alt="Expanded"
            fill
            style={{ objectFit: "contain", display: loading ? "none" : "block" }}
            onLoadingComplete={() => setLoading(false)}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;
