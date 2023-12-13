import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const { id } = useParams();

  const history = useNavigate();
  const editUserData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      if (response.status === 200) {
        const userData = response.data;
        setName(userData.name);
        setEmail(userData.email);
        setNumber(userData.number);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      editUserData(id);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for empty fields
    if (!name || !email || !number) {
      return toast.warning("Please fill all fields");
    }

    // Validation for existing email or number
    const editValidate = await axios.get("http://localhost:5000/users");
    const isEmailExists = editValidate.data.some(
      (contact) => contact.email === email && contact.id !== id
    );
    const isNumberExists = editValidate.data.some(
      (contact) => contact.number === number && contact.id !== id
    );

    if (isEmailExists) {
      return toast.error("This email is already registered");
    }

    if (isNumberExists) {
      return toast.error("This number is already registered");
    }
    try {
      const response = await axios.put(`http://localhost:5000/users/${id}`, {
        name,
        email,
        number,
      });
      console.log(response.data); // Check the response from the server
      toast.success("Contact added");
      history("/"); // Navigate back to homepage
    } catch (error) {
      console.error(error);
      toast.error("Error adding contact");
    }
  };

  return (
    <div className="container">
      {id ? (
        <>
          <div className="row">
            <h1 className="display-3 my-5 text-center ">Edit contact {name}</h1>
            <div className="col-md-6 shadow mx-auto p-5">
              <form onSubmit={handleSubmit}>
                <div className="form-group py-3">
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group py-3">
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group py-3">
                  <input
                    type="number"
                    placeholder="Phone"
                    className="form-control"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn btn-dark mx-2 my-1"
                  />
                  <Link to="/" className="btn btn-danger ">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <h1 className="display-3 my-5 text-center">
          Contact with {id} id does not exist
        </h1>
      )}
    </div>
  );
};

export default Edit;
