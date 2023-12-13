import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Add = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const history = useNavigate();

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
      history("/"); // Navigate back to homepage
    } catch (error) {
      console.error(error);
      toast.error("Error adding contact");
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <h1 className="display-3 my-5 text-center ">Add contact</h1>
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
              <div className="form-group py-3">
                <input
                  type="submit"
                  placeholder="Add Contact"
                  className="btn btn-block btn-dark"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
