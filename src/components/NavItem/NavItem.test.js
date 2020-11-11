import { render, screen } from '@testing-library/react';

import NavItem from './NavItem';

test('renders nav item - non selected', () => {
    render(<NavItem buttonInfo={'A link'} index={1} selectedIndex={0} />);
    const buttonItem = screen.getByText(/A link/i);
    expect(buttonItem).toBeInTheDocument();
});

test('renders nav item - selected', () => {
    const { container } = render(<NavItem buttonInfo={'A link'} index={1} selectedIndex={1} />);
    const buttonItem = screen.getByText(/A link/i);
    expect(buttonItem).toBeInTheDocument();

    //Since selected index and the index are same, item must get `selected` class
    expect(container.firstChild).toHaveClass(`selected`);
});