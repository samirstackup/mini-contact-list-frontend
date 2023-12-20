import React from "react";
import Modal from "react-bootstrap/Modal";

const EditModal = ({
  show,
  onHide,
  handleEdit,
  nameEdit,
  setNameEdit,
  emailEdit,
  setEmailEdit,
  numberEdit,
  setNumberEdit,
  id,
}) => {
  return (
    <div>
      <Modal
        size="lg"
        show={show}
        onHide={onHide}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Edit employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Your modal content here */}
          <form onSubmit={handleEdit}>
            <div className="form-group py-3">
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                value={nameEdit}
                onChange={(e) => setNameEdit(e.target.value)}
              />
            </div>
            <div className="form-group py-3">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                value={emailEdit}
                onChange={(e) => setEmailEdit(e.target.value)}
              />
            </div>
            <div className="form-group py-3">
              <input
                type="number"
                placeholder="Phone"
                className="form-control"
                value={numberEdit}
                onChange={(e) => setNumberEdit(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Update Contact"
                className="btn btn-dark mx-2 my-1"
              />
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditModal;
