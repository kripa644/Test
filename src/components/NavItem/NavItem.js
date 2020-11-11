import './NavItem.css';

const NavItem = ({selected, setSelected, index, buttonInfo}) => {
    const classNames = `navItem ${selected === index ? 'selected' : undefined}`;
    return (
        <button className={classNames} onClick={() => setSelected(index)}>{buttonInfo}</button>
    );
}

export default NavItem;