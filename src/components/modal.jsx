import Modal from 'react-bootstrap/Modal';

/* eslint-disable react/prop-types */
function ModalWrapper({ toggle, setToggle, children, title }) {
  const handleClose = () => setToggle(false);
  return (
    <>
      <Modal show={toggle} onHide={handleClose} centered>
        <Modal.Body>
            <h5>{title}</h5>
            {children}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalWrapper;