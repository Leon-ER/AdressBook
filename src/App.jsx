import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">Address Book</h2>

      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <select className="form-select" aria-label="User type select">
            <option value="">Select a user type</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>
        <div className="col-md-4 mb-3 d-flex justify-content-center align-items-center">
          <div className="form-check me-3">
            <input type="radio" id="teacher" name="userType" value="teacher" className="form-check-input" />
            <label htmlFor="teacher" className="form-check-label">Teacher</label>
          </div>
          <div className="form-check">
            <input type="radio" id="student" name="userType" value="student" className="form-check-input" />
            <label htmlFor="student" className="form-check-label">Student</label>
          </div>
        </div>
        <div className="col-md-4 mb-3 d-flex justify-content-end">
          <button className="btn btn-outline-primary me-2" onClick={handleShowModal}>
            Add New User
          </button>
          <button className="btn btn-outline-primary">Show List</button>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <div className="img-placeholder mb-3">IMG</div>
              <h5 className="card-title">Name</h5>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <p className="card-text"><strong>Department:</strong> Example Dept</p>
              <p className="card-text"><strong>Address:</strong> 1234 Main St</p>
              <p className="card-text"><strong>Phone:</strong> (123) 456-7890</p>
            </div>
          </div>
        </div>
      </div>

      <div className="input-group mb-4">
        <input type="text" className="form-control" placeholder="Search" />
        <button className="btn btn-primary" type="button">Search</button>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Department</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="4" className="text-center">No data available</td>
          </tr>
        </tbody>
      </table>

      {/* Modal for Adding New User */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name</label>
      <input type="text" className="form-control" id="name" placeholder="Enter name" />
    </div>
    <div className="mb-3">
      <label htmlFor="address" className="form-label">Address</label>
      <input type="text" className="form-control" id="address" placeholder="Enter address" />
    </div>
    <div className="mb-3">
      <label htmlFor="department" className="form-label">Department</label>
      <input type="text" className="form-control" id="department" placeholder="Enter department" />
    </div>
    <div className="mb-3">
      <label htmlFor="phone" className="form-label">Phone</label>
      <input type="tel" className="form-control" id="phone" placeholder="Enter phone number" />
    </div>
    <div className="mb-3">
      <label htmlFor="picture" className="form-label">Profile Picture</label>
      <input type="file" className="form-control" id="picture" />
    </div>
  </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App
