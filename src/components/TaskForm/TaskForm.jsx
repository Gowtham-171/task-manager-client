import React, { useState, useRef } from 'react';
import { validateTaskForm, formattedTodayDate } from '../../utils/validation';
import './TaskForm.css';

const initialValues = {
  username: '',
  name: '',
  email: '',
  date: '',
  time: '',
  priority: '',
  hours: '',
  url: '',
  description: '',
  taskTypes: [],
  status: '',
};

function TaskForm({ tasks, saveTasks, showToast }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      taskTypes: checked
        ? [...prev.taskTypes, value]
        : prev.taskTypes.filter((t) => t !== value),
    }));
    setErrors((prev) => ({ ...prev, taskTypes: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateTaskForm(values, tasks);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const newTask = {
      id: Date.now(),
      ...values,
      progress: '0',
    };
    saveTasks([...tasks, newTask]);
    setValues(initialValues);
    setErrors({});
    showToast('Task Created Successfully');
  };

  const handleReset = () => {
    setValues(initialValues);
    setErrors({});
  };

  const today = formattedTodayDate();

  return (
    <section className="task-panel-section">
      <div className="task-panel-title">
        <h3>&#x1F4DD; Create New Task</h3>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} onReset={handleReset}>
        <div className="input-username">
          <input
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            placeholder="Assignee Name *"
            style={errors.username ? { borderColor: 'red' } : {}}
          />
          {errors.username && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: '#c0392b' }}></i> {errors.username}
            </span>
          )}
        </div>

        <div className="input-name">
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Task Name *"
            style={errors.name ? { borderColor: 'red' } : {}}
          />
          {errors.name && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: '#c0392b' }}></i> {errors.name}
            </span>
          )}
        </div>

        <div className="input-email">
          <input
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Assignee Email *"
            style={errors.email ? { borderColor: 'red' } : {}}
          />
          {errors.email && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: '#c0392b' }}></i> {errors.email}
            </span>
          )}
        </div>

        <div className="input-date">
          <label className="float-label">Due Date *</label>
          <input
            type="date"
            name="date"
            value={values.date}
            onChange={handleChange}
            min={today}
            style={errors.date ? { borderColor: 'red' } : {}}
          />
          {errors.date && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: '#c0392b' }}></i> {errors.date}
            </span>
          )}
        </div>

        <div className="input-time">
          <label className="float-label">Due Time *</label>
          <input
            type="time"
            name="time"
            value={values.time}
            onChange={handleChange}
            style={errors.time ? { borderColor: 'red' } : {}}
          />
          {errors.time && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: '#c0392b' }}></i> {errors.time}
            </span>
          )}
        </div>

        <div className="select-priority">
          <label className="float-label">Priority Level *</label>
          <select
            name="priority"
            value={values.priority}
            onChange={handleChange}
            style={errors.priority ? { borderColor: 'red' } : {}}
          >
            <option value="" disabled>-- Select priority --</option>
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          {errors.priority && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: '#c0392b' }}></i> {errors.priority}
            </span>
          )}
        </div>

        <div className="input-hours">
          <label className="float-label float-Hours">Estimated Hours *</label>
          <input
            type="number"
            name="hours"
            value={values.hours}
            onChange={handleChange}
            placeholder="0"
            min="1"
            onKeyDown={(e) => ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault()}
            style={errors.hours ? { borderColor: 'red' } : {}}
          />
          {errors.hours && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: '#c0392b' }}></i> {errors.hours}
            </span>
          )}
        </div>

        <div className="project-url">
          <input
            type="text"
            name="url"
            value={values.url}
            onChange={handleChange}
            placeholder="Project URL *"
            style={errors.url ? { borderColor: 'red' } : {}}
          />
          {errors.url && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: '#c0392b' }}></i> {errors.url}
            </span>
          )}
        </div>

        <div className="task-description">
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            placeholder="Task-Description *"
            style={errors.description ? { borderColor: 'red' } : {}}
          ></textarea>
          {errors.description && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: '#c0392b' }}></i> {errors.description}
            </span>
          )}
        </div>

        <div className="task-type">
          <label className="checkbox-label">Task Type *</label><br />
          {['Bug', 'Feature', 'Enhancement'].map((type) => (
            <React.Fragment key={type}>
              <input
                type="checkbox"
                name="taskType"
                className="check"
                value={type}
                id={`create-${type}`}
                checked={values.taskTypes.includes(type)}
                onChange={handleCheckbox}
              />
              <label htmlFor={`create-${type}`} className="check-label">
                {type === 'Bug' ? 'Bug Fix' : type}
              </label>
              {type === 'Bug' && <br className="check-radio-br" />}
            </React.Fragment>
          ))}
          <br />
          {errors.taskTypes && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: '#c0392b' }}></i> {errors.taskTypes}
            </span>
          )}
        </div>

        <div className="status">
          <label className="status-label">Status *</label><br />
          {['Pending', 'In Progress'].map((s) => (
            <React.Fragment key={s}>
              <input
                type="radio"
                name="status"
                className="radio"
                value={s}
                id={`create-${s}`}
                checked={values.status === s}
                onChange={handleChange}
              />
              <label htmlFor={`create-${s}`} className="radio-label">{s}</label>
            </React.Fragment>
          ))}
          <br />
          {errors.status && (
            <span className="error">
              <i className="fa-solid fa-triangle-exclamation" style={{ color: '#c0392b' }}></i> {errors.status}
            </span>
          )}
        </div>

        <div className="buttons">
          <button type="submit" className="create-button"><span>✓</span> Create Task</button>
          <button type="reset" className="reset-button"><span>✗</span> Reset</button>
        </div>
      </form>
    </section>
  );
}

export default TaskForm;
