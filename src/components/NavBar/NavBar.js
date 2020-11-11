import './NavBar.css';
import {useState} from 'react';
import NavItem from '../NavItem/NavItem';

const NavBar = ({selected, setSelected}) => {
    const buttons = ['Send Message', 'View Message'];
    
    return (
        <nav>
            {buttons.map((buttonInfo, index) => {
                
                return(
                    <NavItem 
                    selected={selected} 
                    setSelected={setSelected} 
                    buttonInfo={buttonInfo} 
                    index={index}
                    key={`${index}`}
                    />
                );
            })}
        </nav>
    );
}

export default NavBar;