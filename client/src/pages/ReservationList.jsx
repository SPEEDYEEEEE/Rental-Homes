import React, { useEffect, useState } from 'react';
import "../styles/tripList.scss";
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { setReservationList } from '../redux/state';
import ListingCard from '../components/ListingCard';
import Footer from '../components/Footer';

const ReservationList = () => {

    const [loading, setLoading] = useState(true);
    const userId = useSelector((state) => state.user._id);
    const reservationList = useSelector((state) => state.user.reservationList);
    const dispatch = useDispatch();

    const getReservationList = async() => {
        try {
            const response = await fetch(`http://localhost:3001/users/${userId}/reservations`, {
                method: "GET",
            })

            const data = await response.json();
            dispatch(setReservationList(data));
            setLoading(false);

        } catch (error) {
            console.log("Fetch reservation list failed (frontend)", error.message);
        }
    }

    useEffect(() => {
        getReservationList()
    }, [])

  return loading ? <Loader/> : (
    <>
        <Navbar/>
        <h1 className='title-list'>Your Reservation List</h1>
        <div className='list'>
            {reservationList?.map(({listingId, hostId, startDate, endDate, totalPrice, booking=true}) => (<ListingCard listingId={listingId?._id} creator={hostId._id} listingPhotoPaths={listingId?.listingPhotoPaths} city={listingId?.city} province={listingId?.province} country={listingId?.country} category={listingId?.category} startDate={startDate} endDate={endDate} totalPrice={totalPrice} booking={booking}/>))}
        </div>
        <Footer/>
    </>
  )
}

export default ReservationList
