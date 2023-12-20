import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Addcontact = ({
  show,
  onHide,
  onSubmit,
  name,
  email,
  number,
  setName,
  setEmail,
  setNumber,
}) => {
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">Add contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit}>
          <div className="form-group py-3">
            <label className="h5 mx-1">Name</label>
            <input
              type="text"
              placeholder="Name"
              className="form-control p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group py-3">
            <label className="h5 mx-1">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="form-control p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group py-3">
            <label className="h5 mx-1">Phone</label>
            <input
              type="number"
              placeholder="Phone"
              className="form-control p-2"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="form-group py-3">
            <input
              type="submit"
              placeholder="Add Contact"
              className="btn btn-block btn-dark"
            />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Addcontact;
