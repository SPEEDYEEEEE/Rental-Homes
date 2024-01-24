import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/listingCard.scss";
import {ArrowForwardIos, ArrowBackIosNew, Favorite} from "@mui/icons-material";
import {useDispatch, useSelector} from 'react-redux';
import {setWishList} from '../redux/state';

const ListingCard = ({listingId, creator, listingPhotoPaths, city, province, country, category, type, price, startDate, endDate, totalPrice, booking}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //slider for images
    const [currentIndex, setCurrentIndex] = useState(0);
    const gotoPrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length)
    }
    const gotoNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length)
    }
    const handleListingClick = () => {
        // Navigate to the detailed view of the property
        navigate(`/properties/${listingId}`);
    }

    //add to wishList
    const user = useSelector((state) => state.user);
    const wishList = user?.wishList || [];
    const isLiked = wishList?.find((item) => item?._id === listingId);
    const patchWishList = async() => {
        if (user?._id !== creator._id) {
            const response = await fetch(`http://localhost:3001/users/${user?._id}/${listingId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            })
            const data = await response.json();
            dispatch(setWishList(data.wishList));
        } else {return;}
        
    }

  return (
    <div className='listing-card' onClick={handleListingClick}>
        <div className='slider-container'>
            <div className='slider' style={{transform: `translateX(-${currentIndex * 100}%)`}}>
                {listingPhotoPaths?.map((photo, index) => (
                    <div className='slide' key={index}>
                        <img src={`http://localhost:3001/${photo.replace("public", "")}`} alt={`photo ${index+1}`}/>
                        <div className='prev-button' onClick={(e) => {e.stopPropagation(); gotoPrevSlide(e)}}>
                            <ArrowBackIosNew sx={{fontSize: "15px"}}/>
                        </div>
                        <div className='next-button' onClick={(e) => {e.stopPropagation(); gotoNextSlide(e)}}>
                            <ArrowForwardIos sx={{fontSize: "15px"}}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <h3>{city}, {province}, {country}</h3>
        <p>{category}</p>

        {!booking ? (
            <>
                <p>{type}</p>
                <p><span>${price}</span> per night</p>
            </>
        ) : (
            <>
                <p>{startDate} - {endDate}</p>
                <p><span>${totalPrice}</span> Total</p>
            </>
        )}
        <button className='favorite' onClick={(e) => {e.stopPropagation(); patchWishList()}} disabled={!user}>
            {isLiked ? (<Favorite sx={{color: "red"}}/>) : (<Favorite sx={{color: "white"}}/>)}
        </button>
    </div>
  )
}

export default ListingCard