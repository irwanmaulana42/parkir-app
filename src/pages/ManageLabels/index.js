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
    transform: 'translate(-50%, -50%)'
  }
};
Modal.setAppElement('#root');

const ManageLabels = (props) => {
  const [nameLabel, setNameLabel] = useState('');
  const [descLabel, setDescLabel] = useState('');

  const [labels, setLabels] = useState([]);
  
  const [modalIsOpen, setIsOpen] = useState(false);

  const [idEdit, setIdEdit] = useState(0);
  const [nameEdit, setNameEdit] = useState('');
  const [descEdit, setDescEdit] = useState('');

  function openModal(data) {
    setIdEdit(data.id);
    setNameEdit(data.label);
    setDescEdit(data.desc);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const getLabels = async () => {
    const getLabels = await UserService.getLabels();
    if (getLabels.code === 200) {
      setLabels(getLabels.message);
    }
  }

  const onChangeNameEdit = (e) => {
    setNameEdit(e.target.value);
  }

  const onChangeDescEdit = (e) => {
    setDescEdit(e.target.value);
  }

  const handleSubmitAdd = async () => {
    if (nameLabel.trim() === '' && descLabel.trim() === '') {
      return;
    }

    const data = await UserService.postLabel(nameLabel, descLabel)
    if (data.code === 200) {
      setNameLabel('');
      setDescLabel('');
      getLabels();
    }
  }

  const handleDelete = async (id) => {
    const data = await UserService.deleteLabel(id);
    if (data.code === 200) {
      getLabels();
    }
  }

  const onChangeNameLabel = (e) => {
    setNameLabel(e.target.value);
  }

  const onChangeDescLabel = (e) => {
    setDescLabel(e.target.value);
  }

  const handleEdit = async () => {
    if (nameEdit.trim() === '' && descEdit.trim() === '') {
      return;
    }
    const data = await UserService.editLabel(nameEdit, descEdit, idEdit);
    console.log('edit', data)
    if (data.code === 200) {
      getLabels();
      setIsOpen(false);
    }
  }

  useEffect(() => {
    getLabels();
  }, [])

  return (
    <div>
      <NavBar />
      <div className="uk-container uk-container-xlarge uk-margin-top">
        <div className="uk-margin uk-card uk-card-default uk-card-body">
          <h3>LABELS</h3>
          <div className="uk-flex">
            <input className="uk-input" type="text" placeholder="Name" value={nameLabel} onChange={onChangeNameLabel.bind(this)} />
            <input className="uk-input" type="text" placeholder="Description" value={descLabel} onChange={onChangeDescLabel.bind(this)} />
            <button className="uk-button uk-button-primary" onClick={handleSubmitAdd}>Add</button>
          </div>
          <hr />
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="uk-flex">
              <input className="uk-input" type="text" placeholder="Name" value={nameEdit} onChange={onChangeNameEdit.bind(this)} />
              <input className="uk-input" type="text" placeholder="Desc" value={descEdit} onChange={onChangeDescEdit.bind(this)} />
              <button className="uk-button uk-button-danger" onClick={handleEdit}>Edit</button>
            </div>
          </Modal>
          <table className="uk-table uk-table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Label</th>
                <th style={{ width: '15%' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {labels.length > 0 && labels.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.label}</td>
                    <td>{item.desc}</td>
                    <td>
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

export default ManageLabels;
