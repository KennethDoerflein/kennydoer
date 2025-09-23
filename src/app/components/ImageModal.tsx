import Image from "next/image";
import { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { BsXLg } from "react-icons/bs";
import styles from "./ImageModal.module.css";

const ImageModal = ({ show, onHide, src }: { show: boolean; onHide: () => void; src: string }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (show) setLoading(true);
  }, [show, src]);

  return (
    <Modal show={show} onHide={onHide} fullscreen dialogClassName={styles.modalContent}>
      <Modal.Header className="py-0" closeButton={false}>
        <button type="button" className={styles.closeBtn} onClick={onHide} aria-label="Close">
          <BsXLg />
        </button>
      </Modal.Header>
      <Modal.Body
        className="bg-dark p-0 d-flex justify-content-center align-items-center"
        onClick={onHide}
        style={{ cursor: "pointer" }}>
        <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
          {loading && (
            <div className="position-absolute top-50 start-50 translate-middle">
              <Spinner animation="border" variant="light" />
            </div>
          )}
          <Image
            src={src}
            alt="Expanded view"
            fill
            style={{ objectFit: "contain" }}
            onLoad={() => setLoading(false)}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;
