import React, { useState, useEffect } from 'react';
import './App.css';
import { taskService } from './Services/taskService.js';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { FaSearch, FaSyncAlt } from 'react-icons/fa';
import TaskList from './Component/TaskList.js';
import Pagination from './Component/Pagination.js';
import TaskForm from './Component/TaskForm.js';
import 'bootstrap/dist/css/bootstrap.min.css';








function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);

  useEffect(() => {
    const loadedTasks = taskService.getTasks();
    if (loadedTasks) {
      setTasks(loadedTasks);
    }
  }, []);

  const handleSaveTask = (task) => {
    taskService.saveTask(task);
    setTasks(taskService.getTasks());
    setShowFormModal(false);
    setCurrentTask(null);
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setShowFormModal(true);
  };

  const handleDeleteTask = (id) => {
    taskService.deleteTask(id);
    setTasks(taskService.getTasks());
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks
    .filter((task) =>
      task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to count tasks
  const getTotalTaskCount = () => {
    return tasks.length; // Count all tasks
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Task</h2>
        <div className="actions">
          <Button variant="primary" onClick={() => setShowFormModal(true)}>
            New Task
          </Button>
          <Button variant="light" className="refresh">
            <FaSyncAlt /> Refresh
          </Button>
          <Button variant="info" className="count-tasks">
            Total Tasks: {getTotalTaskCount()}
          </Button>
        </div>
      </div>

      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search by Assigned To"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Button variant="outline-secondary">
          <FaSearch />
        </Button>
      </InputGroup>

      <TaskList
        tasks={currentTasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />

      <Pagination
        tasksPerPage={tasksPerPage}
        totalTasks={tasks.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      {showFormModal && (
        <TaskForm
          currentTask={currentTask}
          onSave={handleSaveTask}
          onClose={() => setShowFormModal(false)}
        />
      )}
    </div>
  );
}

export default App;