import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Addcontact from "./Addcontact";
import EditModal from "./EditModal";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false); //Delete modal
  const [lgShow, setLgShow] = useState(false); //Add form modal
  const [lgShowEdit, setLgShowEdit] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const [nameEdit, setNameEdit] = useState("");
  const [emailEdit, setEmailEdit] = useState("");
  const [numberEdit, setNumberEdit] = useState("");
  const [id, setId] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //pagination
  const [currentPage, setcurrentPage] = useState(1);
  const limit = 4;
  const firstIndex = (currentPage - 1) * limit;
  const lastIndex = firstIndex + limit;

  const nPages = Math.ceil(data.length / limit);
  const numbers = [...Array(nPages + 1).keys()].slice(1);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for empty fields
    if (!name || !email || !number) {
      return toast.warning("Please fill all fields");
    }

    // Validation for existing email or number
    const addValidate = await axios.get("http://localhost:5000/users");
    const isEmailExists = addValidate.data.some(
      (contact) => contact.email === email
    );
    const isNumberExists = addValidate.data.some(
      (contact) => contact.number === number
    );

    if (isEmailExists) {
      return toast.error("This email is already registered");
    }

    if (isNumberExists) {
      return toast.error("This number is already registered");
    }

    try {
      const response = await axios.post("http://localhost:5000/users", {
        name,
        email,
        number,
      });
      console.log(response.data); // Check the response from the server
      toast.success("Contact added");
      window.location.reload(false);
    } catch (error) {
      console.error(error);
      toast.error("Error adding contact");
    }
  };

  const dispatch = useDispatch();

  const deleteContact = async (id) => {
    const response = await axios.delete(`http://localhost:5000/users/${id}`);
    if (response.status === 200) {
      toast.success("Contact deleted");
      getUsers();
    }
    window.location.reload(false);
  };

  // Function to handle opening the Edit Modal
  const handleEditClick = (data) => {
    setNameEdit(data.name); // Set initial values in the Edit Modal
    setEmailEdit(data.email);
    setNumberEdit(data.number);
    setLgShowEdit(true);
    setId(data.id);
  };
  const handleEdit = async (e) => {
    e.preventDefault();

    // Validation for empty fields
    if (!nameEdit || !emailEdit || !numberEdit) {
      return toast.warning("Please fill all fields");
    }

    // Validation for existing email or number excluding the current user
    const isEmailExists = data.some(
      (contact) => contact.email === emailEdit && contact.id !== id
    );
    const isNumberExists = data.some(
      (contact) => contact.number === numberEdit && contact.id !== id
    );

    if (isEmailExists) {
      return toast.error("This email is already registered");
    }

    if (isNumberExists) {
      return toast.error("This number is already registered");
    }

    try {
      const response = await axios.put(`http://localhost:5000/users/${id}`, {
        name: nameEdit,
        email: emailEdit,
        number: numberEdit,
      });

      console.log(response.data);
      toast.success("Contact updated");
      setLgShowEdit(false);
      getUsers();
    } catch (error) {
      console.error(error);
      toast.error("Error updating contact");
    }
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      setcurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== nPages) {
      setcurrentPage(currentPage + 1);
    }
  };
  const changePage = (id) => {
    setcurrentPage(id);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users`);
      setcurrentPage(1);
      setData(response.data);
    } catch (error) {
      console.error("Error searching data:", error);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [query]);

  return (
    <div className="container">
      <div className="row">
        <div className="counter mt-2"> Total contacts : {data.length}</div>
        <div className="col-md-9 my-5 text-right ">
          <Button
            onClick={() => setLgShow(true)}
            className="btn btn-outline-dark bg-white text-dark"
            style={{ backgroundColor: "transparent" }}
          >
            Add contact
          </Button>
          <Addcontact
            show={lgShow}
            onHide={() => setLgShow(false)}
            onSubmit={handleSubmit}
            name={name}
            email={email}
            number={number}
            setName={setName}
            setEmail={setEmail}
            setNumber={setNumber}
          />
        </div>
        <div className="col-md-3 my-5 align-items-end text-right">
          <input
            type="text"
            placeholder="Search..."
            className="searchBar p-1 w-100"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="col-md-10 mx-auto">
          <table className="table table-hover">
            <thead className="text-white bg-dark text-center">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Number</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter(
                  (data) =>
                    data.name.toLowerCase().includes(query) ||
                    data.email.toLowerCase().includes(query) ||
                    data.number.toLowerCase().includes(query)
                )
                .reverse()
                .slice(firstIndex, lastIndex)
                .map((data, localIndex) => {
                  const globalIndex = firstIndex + localIndex + 1;
                  return (
                    <tr key={globalIndex} className="text-center">
                      <td>{globalIndex}</td>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.number}</td>
                      <td
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          onClick={() => handleEditClick(data)}
                          className="btn btn-small btn-primary mx-2"
                        >
                          Edit
                        </Button>
                        <EditModal
                          show={lgShowEdit}
                          onHide={() => setLgShowEdit(false)}
                          handleEdit={handleEdit}
                          nameEdit={nameEdit}
                          setNameEdit={setNameEdit}
                          emailEdit={emailEdit}
                          setEmailEdit={setEmailEdit}
                          numberEdit={numberEdit}
                          setNumberEdit={setNumberEdit}
                          id={id}
                        />

                        <Button
                          variant="primary"
                          onClick={handleShow}
                          className="btn btn-small btn-danger"
                        >
                          Delete
                        </Button>

                        <Modal
                          show={show}
                          onHide={handleClose}
                          backdrop="static"
                          keyboard={false}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>Confirm deletion</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            Are you sure you want to delete data for employee{" "}
                            {data.name} ?
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                            </Button>
                            <Button
                              variant="primary"
                              onClick={() => deleteContact(data.id)}
                              className="btn btn-small btn-danger"
                            >
                              Delete
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <a href="#" className="page-link" onClick={prevPage}>
                  Prev
                </a>
              </li>
              {numbers.map((n, i) => (
                <li
                  className={`page-item ${currentPage === n ? "active" : ""}`}
                  key={i}
                >
                  <a
                    href="#"
                    className="page-link"
                    onClick={() => changePage(n)}
                  >
                    {n}
                  </a>
                </li>
              ))}
              <li className="page-item">
                <a href="#" className="page-link" onClick={nextPage}>
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Home;
