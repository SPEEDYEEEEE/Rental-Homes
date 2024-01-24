import React from 'react';
import "../styles/tripList.scss";
import {useSelector} from 'react-redux';
import ListingCard from '../components/ListingCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const WishList = () => {

    const wishList = useSelector((state) => state.user.wishList);

  return (
    <>
        <Navbar/>
        <h1 className='title-list'>Your Wish List</h1>
        <div className='list'>
            {wishList.map(({_id, creator, listingPhotoPaths, city, province, country, category, type, price, booking = false}) => (<ListingCard listingId={_id} creator={creator} listingPhotoPaths={listingPhotoPaths} city={city} province={province} country={country} type={type} category={category} price={price} booking={booking}/>))}
        </div>
        <Footer/>
    </>
  )
}

export default WishList