import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from './TaskForm';

describe('TaskForm Component', () => {
  const onSaveMock = jest.fn();
  const onCloseMock = jest.fn();

  const renderComponent = (currentTask = null) => {
    render(<TaskForm currentTask={currentTask} onSave={onSaveMock} onClose={onCloseMock} />);
  };

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test('renders form fields correctly for new task', () => {
    renderComponent();
    
    expect(screen.getByLabelText(/assigned to/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/due date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByText(/save/i)).toBeInTheDocument();
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
  });

  test('renders form fields correctly for editing a task', () => {
    const currentTask = {
      assignedTo: 'User A',
      status: 'In Progress',
      dueDate: '2023-09-30',
      priority: 'High',
      description: 'Complete the task'
    };
    
    renderComponent(currentTask);

    expect(screen.getByDisplayValue(/user a/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/in progress/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/2023-09-30/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/high/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/complete the task/i)).toBeInTheDocument();
  });

  test('calls onSave with correct data when form is submitted', () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/assigned to/i), { target: { value: 'User A' } });
    fireEvent.change(screen.getByLabelText(/status/i), { target: { value: 'In Progress' } });
    fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: '2023-09-30' } });
    fireEvent.change(screen.getByLabelText(/priority/i), { target: { value: 'High' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Complete the task' } });
    
    fireEvent.click(screen.getByText(/save/i));

    expect(onSaveMock).toHaveBeenCalledWith({
      assignedTo: 'User A',
      status: 'In Progress',
      dueDate: '2023-09-30',
      priority: 'High',
      description: 'Complete the task'
    });
  });

  test('calls onClose when cancel button is clicked', () => {
    renderComponent();

    fireEvent.click(screen.getByText(/cancel/i));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when modal is closed', () => {
    renderComponent();

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
