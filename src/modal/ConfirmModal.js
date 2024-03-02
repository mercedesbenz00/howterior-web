import React from "react";
import Modal from "react-bootstrap/Modal";

function ConfirmModal({
  onConfirm,
  showCancel = false,
  confirmLabel,
  cancelLabel,
  children,
  ...props
}) {
  return (
    <>
      <Modal {...props} contentClassName="confirm-modal">
        {/* <Modal.Header closeButton></Modal.Header> */}
        <Modal.Body>
          <div className="w-100 text-center">
            <div className="confirm-modal-content">{children}</div>
            <div className="d-flex gap-5 mt-5">
              {showCancel && (
                <button
                  className={`flex-1 secondary-btn btn-border`}
                  onClick={props.onHide}
                >
                  {cancelLabel}
                </button>
              )}
              <button
                className={`flex-1 primary-btn btn-border`}
                onClick={onConfirm}
              >
                {confirmLabel}
              </button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModal;
