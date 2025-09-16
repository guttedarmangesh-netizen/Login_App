import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    fetchUsers(token);
  }, [navigate]);

  const fetchUsers = async (token) => {
    try {
      const res = await axios.get('http://localhost:82/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:82/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('User deleted successfully');
      fetchUsers(token);
    } catch (error) {
      console.log('Delete failed:', error);
      alert('Delete failed');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:82/api/users/${editData._id}`, editData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.map(user => user._id === res.data._id ? res.data : user));
      setEditMode(false);
      fetchUsers(token);
      alert('Profile updated successfully');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Update failed');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: '100vh', // full screen height
        width: '100vw',  // full screen width
        minHeight: '100vh',
        background: 'linear-gradient(to right, #6dd5ed, #2193b0)',
        padding: '20px',
      }}
    >
      <div className="container bg-light p-4 rounded shadow" style={{ maxWidth: '900px', width: '100%' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-dark">User Dashboard</h2>
          <h3 className='text-dark'>{token.name}</h3>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {!editMode ? (
          <div className="table-responsive">
            <table className="table table-hover table-bordered text-center">
              <thead className="table-primary">
                <tr>
                  <th>Sr No</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Mobile No</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.mobno}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => {
                          setEditData(user);
                          setEditMode(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <form onSubmit={handleUpdate}>
            <h4 className="mb-3 text-center">Edit User</h4>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">First Name</label>
                <input
                  className="form-control rounded-pill"
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Last Name</label>
                <input
                  className="form-control rounded-pill"
                  name="lastname"
                  value={editData.lastname}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Mobile No</label>
                <input
                  className="form-control rounded-pill"
                  name="mobno"
                  value={editData.mobno}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mt-4 d-flex justify-content-center gap-3">
              <button type="submit" className="btn btn-success px-4 rounded-pill">
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary px-4 rounded-pill"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

