import React, { useEffect, useState } from 'react';
import "../styles/tripList.scss";
import {useDispatch, useSelector} from 'react-redux';
import ListingCard from '../components/ListingCard';
import Navbar from '../components/Navbar';
import { setPropertyList } from '../redux/state';
import Loader from '../components/Loader';
import Footer from '../components/Footer';

const PropertyList = () => {

    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const propertyList = user?.propertyList;
    const getPropertyList = async() => {
        try {
            const response = await fetch(`http://localhost:3001/users/${user._id}/properties`, {
                method: "GET",
            })
            const data = await response.json()
            dispatch(setPropertyList(data));
            setLoading(false);
        } catch (error) {
            console.log("fetch all properties failed (frontend)", error.message)
        }
    }

    useEffect(() => {
        getPropertyList()
    }, [])

  return loading ? (<Loader/>) : (
    <>
        <Navbar/>
        <h1 className='title-list'>Your Property List</h1>
        <div className='list'>
            {propertyList.map(({_id, creator, listingPhotoPaths, city, province, country, category, type, price, booking = false}) => (<ListingCard listingId={_id} creator={creator} listingPhotoPaths={listingPhotoPaths} city={city} province={province} country={country} type={type} category={category} price={price} booking={booking}/>))}
        </div>
        <Footer/>
    </>
  )
}

export default PropertyList