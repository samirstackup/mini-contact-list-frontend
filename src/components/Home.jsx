import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  console.log(data.filter((data) => data.name.includes("test")));

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

  const dispatch = useDispatch();

  const deleteContact = async (id) => {
    const response = await axios.delete(`http://localhost:5000/users/${id}`);
    if (response.status === 200) {
      toast.success("Contact deleted");
      getUsers();
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9 my-5 text-right ">
          <Link to="/add" className="btn btn-outline-dark">
            Add contact
          </Link>
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
                .map((data, id) => (
                  <tr key={id} className="text-center">
                    <td>{id + 1}</td>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.number}</td>
                    <td>
                      <Link
                        to={`/edit/${data.id}`}
                        className="btn btn-small btn-primary mx-2"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => deleteContact(data.id)}
                        className="btn btn-small btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
