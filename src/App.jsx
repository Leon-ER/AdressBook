import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [userInfo, setUserInfo] = useState({
    dept: "",
    name: "",
    email: "",
    phone: "",
    image: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [userType, setUserType] = useState(""); 

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserInfo((prevState) => ({
        ...prevState,
        image: reader.result,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    existingUsers.push(userInfo);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    alert("User info saved!");
    setUserInfo({
      dept: "",
      name: "",
      email: "",
      phone: "",
      image: "",
    });
    handleCloseModal();
    showUsers(); 
  };

  const getUsersFromStorage = () => {
    const items = localStorage.getItem('users');
    if (items) {
      return JSON.parse(items);
    }
    return [];
  };

  const showUsers = () => {
    const storedUsers = getUsersFromStorage();
    const filteredUsers = storedUsers.filter(user => {
      const matchesUserType = userType ? user.dept.toLowerCase() === userType.toLowerCase() : true;
      const matchesSearchQuery = user.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesUserType && matchesSearchQuery;
    });
    setUsers(filteredUsers);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    showUsers(); 
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleUserTypeChange = (e) => {
    const selectedType = e.target.value;
    setUserType(selectedType);
    showUsers(); 
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">Address Book</h2>

      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <select
            className="form-select"
            aria-label="User type select"
            onChange={handleUserTypeChange}
            value={userType}
          >
            <option value="">Select a user type</option>
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
          </select>
        </div>
        <div className="col-md-4 mb-3 d-flex justify-content-center align-items-center">
          <div className="form-check me-3">
            <input
              type="radio"
              id="teacher"
              name="userType"
              value="Teacher"
              className="form-check-input"
              checked={userType === "Teacher"}
              onChange={handleUserTypeChange}
            />
            <label htmlFor="teacher" className="form-check-label">
              Teacher
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="student"
              name="userType"
              value="Student"
              className="form-check-input"
              checked={userType === "Student"}
              onChange={handleUserTypeChange}
            />
            <label htmlFor="student" className="form-check-label">
              Student
            </label>
          </div>
        </div>
        <div className="col-md-4 mb-3 d-flex justify-content-end">
          <button
            className="btn btn-outline-primary me-2"
            onClick={handleShowModal}
          >
            Add New User
          </button>
          <button className="btn btn-outline-primary" onClick={showUsers}>
            Show List
          </button>
        </div>
      </div>

      <div className="mb-4">
        {selectedUser && (
          <div className="card mb-4">
            <div className="card-body text-center">
              {selectedUser.image && (
                <img
                  src={selectedUser.image}
                  alt={selectedUser.name}
                  className="img-fluid mb-3"
                  style={{ maxWidth: '150px', maxHeight: '150px' }}
                />
              )}
              <h5 className="card-title">{selectedUser.name}</h5>
              <p className="card-text"><strong>Email:</strong> {selectedUser.email}</p>
              <p className="card-text"><strong>Department:</strong> {selectedUser.dept}</p>
              <p className="card-text"><strong>Phone:</strong> {selectedUser.phone}</p>
            </div>
          </div>
        )}
        <input
          type="text"
          className="form-control"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No data available
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={index} onClick={() => handleSelectUser(user)}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.dept}</td>
                <td>{user.phone}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formID">
              <Form.Label>Department</Form.Label>
              <Form.Select
                name="dept"
                value={userInfo.dept}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                <option value="Teacher">Teacher</option>
                <option value="Student">Student</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={userInfo.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleImageChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
