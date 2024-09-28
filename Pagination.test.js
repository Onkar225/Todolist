import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  const paginateMock = jest.fn();

  const props = {
    tasksPerPage: 5,
    totalTasks: 20,
    paginate: paginateMock,
    currentPage: 1,
  };

  beforeEach(() => {
    render(<Pagination {...props} />);
  });

  test('renders correct number of page items', () => {
    const pageItems = screen.getAllByRole('button'); // Get all buttons (page items)
    expect(pageItems.length).toBe(5); // 5 pages for 20 tasks with 5 per page
  });

  test('highlights the active page', () => {
    const activePage = screen.getByText('1');
    expect(activePage).toHaveClass('active');
  });

  test('calls paginate function when a page number is clicked', () => {
    const page2Button = screen.getByText('2');
    fireEvent.click(page2Button);
    expect(paginateMock).toHaveBeenCalledWith(2);
  });

  test('disables Previous button on the first page', () => {
    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeDisabled();
  });

  test('enables Previous button when not on the first page', () => {
    // Update the current page for this test
    const updatedProps = { ...props, currentPage: 2 };
    render(<Pagination {...updatedProps} />);

    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeEnabled();
  });

  test('disables Next button on the last page', () => {
    // Update to last page
    const updatedProps = { ...props, currentPage: 4 };
    render(<Pagination {...updatedProps} />);
    
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  test('calls paginate for the last page', () => {
    const lastButton = screen.getByText('Last');
    fireEvent.click(lastButton);
    expect(paginateMock).toHaveBeenCalledWith(4); // Last page for 20 tasks with 5 per page
  });
});
