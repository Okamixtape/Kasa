import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Collapse from './index';

describe('Collapse Component', () => {
  test('renders the title and toggles content visibility on click', () => {
    const title = 'Fiabilité';
    const text = 'Les annonces postées sur Kasa garantissent une fiabilité totale.';

    render(<Collapse title={title} text={text} />);

    // Check if the title is rendered
    expect(screen.getByText(title)).toBeInTheDocument();

    // Check that the content is initially not visible
    const contentElement = screen.getByText(text);
    expect(contentElement).not.toBeVisible();

    // Simulate a click on the collapse header
    fireEvent.click(screen.getByText(title));

    // Check that the content is now visible
    expect(contentElement).toBeVisible();

    // Simulate another click to close it
    fireEvent.click(screen.getByText(title));

    // Check that the content is hidden again
    expect(contentElement).not.toBeVisible();
  });
});
