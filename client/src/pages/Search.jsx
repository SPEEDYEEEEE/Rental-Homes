import React, { useEffect, useState } from 'react';
import '../styles/tripList.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setListings } from '../redux/state';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import ListingCard from '../components/ListingCard';
import Footer from '../components/Footer';

const Search = () => {

    const {search} = useParams();
    const [loading, setLoading] = useState(true);
    const listings = useSelector((state) => state.listings);
    const dispatch = useDispatch();
    const getSearchListing = async() => {
        try {
            const response = await fetch(`http://localhost:3001/properties/search/${search}`, {
                method: "GET",
            })
            const data = await response.json();
            dispatch(setListings({listings: data}));
            setLoading(false);
        } catch (error) {
            console.log("Fetch search list failed (frontend)", error.message)
        }
    }

    useEffect(() => {
        getSearchListing()
    }, [search])

    return loading ? <Loader/> : (
        <>
            <Navbar/>
            <h1 className='title-list'>{search}</h1>
            <div className='list'>
                {listings.map(({_id, creator, listingPhotoPaths, city, province, country, category, type, price, booking = false}) => (<ListingCard listingId={_id} creator={creator} listingPhotoPaths={listingPhotoPaths} city={city} province={province} country={country} type={type} category={category} price={price} booking={booking}/>))}
            </div>
            <Footer/>
        </>
    )
}

export default Search