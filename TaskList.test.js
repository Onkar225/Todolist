import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from './TaskList';

describe('TaskList Component', () => {
  const onEditMock = jest.fn();
  const onDeleteMock = jest.fn();

  const tasks = [
    {
      id: 1,
      assignedTo: 'User A',
      status: 'In Progress',
      dueDate: '2023-09-30',
      priority: 'High',
      description: 'Complete the task',
    },
    {
      id: 2,
      assignedTo: 'User B',
      status: 'Not Started',
      dueDate: '2023-10-01',
      priority: 'Normal',
      description: 'Start the project',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test('renders task list correctly', () => {
    render(<TaskList tasks={tasks} onEdit={onEditMock} onDelete={onDeleteMock} />);

    expect(screen.getByText(/assigned to/i)).toBeInTheDocument();
    expect(screen.getByText(/status/i)).toBeInTheDocument();
    expect(screen.getByText(/due date/i)).toBeInTheDocument();
    expect(screen.getByText(/priority/i)).toBeInTheDocument();
    expect(screen.getByText(/comments/i)).toBeInTheDocument();
    expect(screen.getByText(/actions/i)).toBeInTheDocument();

    expect(screen.getByText(/user a/i)).toBeInTheDocument();
    expect(screen.getByText(/in progress/i)).toBeInTheDocument();
    expect(screen.getByText(/2023-09-30/i)).toBeInTheDocument();
    expect(screen.getByText(/high/i)).toBeInTheDocument();
    expect(screen.getByText(/complete the task/i)).toBeInTheDocument();

    expect(screen.getByText(/user b/i)).toBeInTheDocument();
    expect(screen.getByText(/not started/i)).toBeInTheDocument();
    expect(screen.getByText(/2023-10-01/i)).toBeInTheDocument();
    expect(screen.getByText(/normal/i)).toBeInTheDocument();
    expect(screen.getByText(/start the project/i)).toBeInTheDocument();
  });

  test('calls onEdit when edit button is clicked', () => {
    render(<TaskList tasks={tasks} onEdit={onEditMock} onDelete={onDeleteMock} />);

    fireEvent.click(screen.getAllByText(/edit/i)[0]);

    expect(onEditMock).toHaveBeenCalledWith(tasks[0]);
  });

  test('calls onDelete when delete button is clicked', () => {
    render(<TaskList tasks={tasks} onEdit={onEditMock} onDelete={onDeleteMock} />);

    fireEvent.click(screen.getAllByText(/delete/i)[0]);

    expect(onDeleteMock).toHaveBeenCalledWith(tasks[0].id);
  });
});
