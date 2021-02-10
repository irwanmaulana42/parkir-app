import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';

import './style.css';

import NavBar from './../../component/NavBar';
import UserService from './../../services/userService';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '700px'
  }
};
Modal.setAppElement('#root');

const ManageUsers = (props) => {
  const [users, setUsers] = useState([]);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  const [modalIsOpen, setIsOpen] = useState(false);

  const [idEdit, setIdEdit] = useState(0);
  const [nameEdit, setNameEdit] = useState('');
  const [usernameEdit, setUsernameEdit] = useState('');
  const [roleEdit, setRoleEdit] = useState('');

  function openModal(data) {
    setIdEdit(data.id);
    setNameEdit(data.name);
    setUsernameEdit(data.username);
    setRoleEdit(data.is_admin);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const getUsers = async () => {
    const getData = await UserService.getUsers();
    if (getData.code === 200) {
      setUsers(getData.message);
    }
  }

  const onChangeNameEdit = (e) => {
    setNameEdit(e.target.value);
  }

  const onChangeUsernameEdit = (e) => {
    setUsernameEdit(e.target.value);
  }

  const onChangeRolesEdit = (e) => {
    setRoleEdit(e.target.value);
  }

  const onChangeName = (e) => {
    setName(e.target.value);
  }

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  }

  const handleSubmitAdd = async () => {
    if (name.trim() === '' || username.trim() === '' || role === '') {
      return;
    }

    const data = await UserService.postUser(name, username, 'internet', role);
    if (data.code === 200) {
      setName('');
      setUsername('');
      getUsers();
    }
  }

  const handleDelete = async (id) => {
    const data = await UserService.deleteUser(id);
    if (data.code === 200) {
      getUsers();
    }
  }

  const onChangeRoles = (e) => {
    setRole(e.target.value);
  }

  const handleEdit = async () => {
    if (nameEdit.trim() === '' || usernameEdit.trim() === '' || roleEdit === '') {
      return;
    }
    const data = await UserService.editUser(nameEdit, usernameEdit, roleEdit, idEdit);
    if (data.code === 200) {
      getUsers();
      setIsOpen(false);
    }
  }

  const confirmUser = async(id) => {
    console.log('id', id);
    const data = await UserService.confirmUser(id);
    console.log('confirmUsers', data);
    if (data.code === 200) {
      getUsers();
    }
  }

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <div>
      <NavBar />
      <div className="uk-container uk-container-xlarge uk-margin-top">
        <div className="uk-margin uk-card uk-card-default uk-card-body">
          <h3>USERS</h3>

          <div className="uk-form-stacked">
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="form-stacked-text">Name</label>
              <div className="uk-form-controls">
                <input className="uk-input" id="form-stacked-text" type="text" placeholder="Name" value={name} onChange={onChangeName.bind(this)} />
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="form-stacked-text">Username</label>
              <div className="uk-form-controls">
                <input className="uk-input" id="form-stacked-text" type="text" placeholder="Username" value={username} onChange={onChangeUsername.bind(this)} />
              </div>
            </div>
            <div className="uk-margin">
              <div className="uk-form-label">Role</div>
              <div className="uk-form-controls">
                <label><input className="uk-radio" type="radio" name="roles" value="0" onChange={onChangeRoles.bind(this)} /> User</label><br />
                <label><input className="uk-radio" type="radio" name="roles" value="1" onChange={onChangeRoles.bind(this)} /> Admin</label>
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="form-stacked-text">Password</label>
              <div className="uk-form-controls">
                <input className="uk-input" id="form-stacked-text" type="text" placeholder="Password" value="internet" disabled />
                <small>Default password is internet</small>
              </div>
            </div>
            <button className="uk-button uk-button-primary" onClick={handleSubmitAdd}>Add</button>
          </div>
          <hr />
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="uk-form-stacked">
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">Name</label>
                <div className="uk-form-controls">
                  <input className="uk-input" id="form-stacked-text" type="text" placeholder="Name" value={nameEdit} onChange={onChangeNameEdit.bind(this)} />
                </div>
              </div>
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">Username</label>
                <div className="uk-form-controls">
                  <input className="uk-input" id="form-stacked-text" type="text" placeholder="Username" value={usernameEdit} onChange={onChangeUsernameEdit.bind(this)} />
                </div>
              </div>
              <div className="uk-margin">
                <div className="uk-form-label">Role</div>
                <div className="uk-form-controls">
                  <label><input className="uk-radio" type="radio" name="roles" defaultChecked={roleEdit === 0} value="0" onChange={onChangeRolesEdit.bind(this)} /> User</label><br />
                  <label><input className="uk-radio" type="radio" name="roles" defaultChecked={roleEdit === 1} value="1" onChange={onChangeRolesEdit.bind(this)} /> Admin</label>
                </div>
              </div>
              <button className="uk-button uk-button-danger" onClick={handleEdit}>Edit</button>
            </div>
          </Modal>
          <table className="uk-table uk-table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Confirmed</th>
                <th>Admin</th>
                <th style={{ width: '15%' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 && users.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.username}</td>
                    <td>{(item.confirmed === 1) ? 'Confirmed' : 'Not Confirmed'}</td>
                    <td>{(item.is_admin === 1) ? 'Admin' : 'User'}</td>
                    <td>
                      {item.confirmed === 0 && (
                        <button className="uk-button uk-button-secondary uk-button-small" uk-icon="unlock" onClick={confirmUser.bind(this, item.id)}></button>
                      )}
                      <button className="uk-button uk-button-danger uk-button-small" uk-icon="more-vertical" onClick={openModal.bind(this, item)}></button>
                      <button className="uk-button uk-button-primary uk-button-small" uk-icon="close" onClick={handleDelete.bind(this, item.id)}></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageUsers;
