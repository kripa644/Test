import React, {useState} from 'react';
import {useGlobalContext} from '../components/context';
import icon from './icon_nothing.png';
import './pages.css';
import Modal from '../components/Modal/Modal';
import FavouriteItem from '../components/FavouriteItem/FavouriteItem';

const Favorites = () => {
  const {recentItems, setRecentItems, fetchWeatherData, weather} = useGlobalContext();
  const [show, setShow] = useState(false)

  const closeModal = () => {
    setShow(false);
  }

  const favoriteItems = recentItems.filter((item) => item.isFavorite);
  // setFavorites(favoriteItems);
  // if(favoriteItems) {
  //   setFavorites(favoriteItems);
  // } else {
  //   setFavorites([]);
  // }

  const remove = () => {
    const newFavItems = recentItems.map((item) => {
      return {...item, isFavorite: false};
    });
    setRecentItems(newFavItems);

    // setFavorites([]);
  }

  return (
    <div className='favourite'>
      {favoriteItems.length !== 0 ? 
      <div className='favoriteCities'>
        <div className='favoriteHeader'>
          <div className='favTitle'>
            {favoriteItems.length} <span>{favoriteItems.length > 1 ? 'Cities' : 'City'}</span> added as favorite
          </div>
          <button className='remove' onClick={() => setShow(true)}>Remove All</button>
        </div>
        <div className='favouriteItems'>
          {favoriteItems.map((item, index) => {
            return <FavouriteItem key={index} {...item}/>
          })}
        </div>
        {show && <Modal show={show} closeModal={closeModal} remove={remove}>
          <div className='modalText'>
            Are you sure want to remove all the favourites?
          </div>
        </Modal>}
      </div> : 
      <div className='noFavorite'>
        <img src={icon} alt='No Favorites'/>
        <div className='noFavoriteText'>No Favourites Added</div>
      </div>
      }
    </div>
  );
}

export default Favorites;