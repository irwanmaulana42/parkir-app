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
    width: '700px',
  }
};
Modal.setAppElement('#root');
const Dashboard = (props) => {
  const [todos, setTodos] = useState([]);
  const [labels, setLabels] = useState([]);
  const [add, setAdd] = useState('');
  const [addLabel, setAddLabel] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);

  const [idEdit, setIdEdit] = useState(0);
  const [addEdit, setAddEdit] = useState('');
  const [labelEdit, setLabelEdit] = useState(0);

  function openModal(data) {
    setIdEdit(data.id);
    setAddEdit(data.task);
    setLabelEdit(data.label_id);
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

  const getTodos = async () => {
    const getTodos = await UserService.getTodos();
    if (getTodos.code === 200) {
      setTodos(getTodos.message);
    }
  }

  const onChangeLabel = (e) => {
    setAddLabel(e.target.value);
    setLabelEdit(e.target.value);
  }

  const onChangeAdd = (e) => {
    setAdd(e.target.value);
  }

  const handleSubmitAdd = async () => {
    if (add.trim() === '' && addLabel.trim() === '') {
      return;
    }

    const data = await UserService.postTodos(add, addLabel);
    if (data.code === 200) {
      setAdd('');
      getTodos();
    }
  }

  const handleDelete = async (id) => {
    const data = await UserService.deleteTodos(id);
    if (data.code === 200) {
      getTodos();
    }
  }

  const handleCompleted = async (id, e) => {
    let setCompleted = (e.target.checked) ? 1 : 0;
    const data = await UserService.setCompletedTodos(setCompleted, id);
    if (data.code === 200) {
      getTodos();
    }
  }

  const handleEditTodos = async () => {
    if (addEdit.trim() === '') {
      return;
    }
    const data = await UserService.editTodos(addEdit, labelEdit, idEdit);
    console.log('edit', data);
    if (data.code === 200) {
      setIsOpen(false);
      getTodos();
    }
  }

  useEffect(() => {
    getTodos();
    getLabels();
  }, [])

  return (
    <div>
      <NavBar />
      <div className="uk-container uk-container-xlarge uk-margin-top">
        <div className="uk-margin uk-card uk-card-default uk-card-body">
          <h3>TO DO LIST</h3>
          <div className="uk-flex">
            <input className="uk-input" type="text" placeholder="Add" value={add} onChange={onChangeAdd.bind(this)} />
            <select className="uk-select" name="label" onChange={onChangeLabel}>
              <option value="">-</option>
              {labels.length > 0 && labels.map((item) => {
                return (
                  <option key={item.id} value={item.id}>{item.label}</option>
                )
              })}
            </select>
            <button className="uk-button uk-button-primary" onClick={handleSubmitAdd}>Submit</button>
          </div>
          <hr />
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="uk-flex">
              <input className="uk-input" type="text" placeholder="Add" value={addEdit} onChange={onChangeAdd.bind(this)} />
              <select className="uk-select" defaultValue={labelEdit} onChange={onChangeLabel}>
                {labels.length > 0 && labels.map((item) => {
                  return (
                    <option key={item.id} value={item.id} >{item.label}</option>
                  )
                })}
              </select>
              <button className="uk-button uk-button-danger" onClick={handleEditTodos}>Edit</button>
            </div>
          </Modal>
          <ul className="uk-list uk-list-striped">
            {todos.length > 0 && todos.map((item) => {
              return (
                <li key={item.id}>
                  <div className="uk-flex uk-flex-between">
                    <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid" style={{ marginBottom: 0 }}>
                      <label className={item.completed === 1 ? 'completed' : ''}>
                        <input className="uk-checkbox" onChange={handleCompleted.bind(this, item.id)} type="checkbox" defaultChecked={item.completed === 1 ? true : false} /> {item.task}
                      </label>
                    </div>
                    <div>
                      {item.label_id !== null && (
                        <span className="uk-label">{item.label}</span>
                      )}
                    </div>
                    <div>
                      <button className="uk-button uk-button-danger uk-button-small" uk-icon="more-vertical" onClick={openModal.bind(this, item)}></button>
                      <button className="uk-button uk-button-primary uk-button-small" uk-icon="close" onClick={handleDelete.bind(this, item.id)}></button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
