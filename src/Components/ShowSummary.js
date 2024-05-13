import './ShowSummary.css'
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const ShowSummary = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [bookingFormVisible, setBookingFormVisible] = useState(false);
  const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem('userDetails')) || {});
    
  
    useEffect(() => {
        fetch(`https://api.tvmaze.com/shows/${id}`)
          .then((response) => response.json())
          .then((data) => setShow(data))
          .catch((error) => {
            console.error('Error fetching show details:', error);
            setShow(null); // Reset show state on error
          });
      }, [id]);

      const handleBookTicket = () => {
        setBookingFormVisible(true);
      };

      const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(setUserDetails)
        // Process form submission (e.g., send data to backend, etc.)
        // Reset form visibility after processing
        setBookingFormVisible(false);
      };
    
      const renderBookingForm = () => {
        if (bookingFormVisible && show) {
          return (
            <div className="booking-form">
              <h2>Book Ticket</h2>
              <form onSubmit={handleFormSubmit}>
                <p>Movie Name: {show.name}</p>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={userDetails.name || ''}
                  onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={userDetails.email || ''}
                  onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                />
                <button type="submit">Confirm Booking</button>
              </form>
            </div>
          );
        }
        return null;
      };

  if (!show) return <div>Loading...</div>;

  const renderPreviousEpisode = () => {
    if (show._links.previousepisode) {
      return (
        <div className="episode-section">
          <h2>Previous Episode</h2>
          <p>Name: {show._links.previousepisode.name}</p>
          <p>Link: <a href={show._links.previousepisode.href} target="_blank" rel="noopener noreferrer">{show._links.previousepisode.href}</a></p>
        </div>
      );
    }
    return null;
  };

  const renderNextEpisode = () => {
    if (show._links.nextepisode) {
      return (
        <div className="episode-section">
          <h2>Next Episode</h2>
          <p>Name: {show._links.nextepisode.name}</p>
          <p>Link: <a href={show._links.nextepisode.href} target="_blank" rel="noopener noreferrer">{show._links.nextepisode.href}</a></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='showsummary'>
      <div className="title">
        <div className="titleinfo">
          <h1>{show.name}</h1>
          <p>Type: {show.type}</p>
        </div>
      </div>
      <div className="main">
        <div className="imagee">
          {show.image && show.image.original && (
            <img src={show.image.original} alt={show.name} />
          )}
        </div>
        <div className="summary">
        <p>Language : {show.language ? show.language : 'N/A'}</p>
          <p>Status : {show.status ? show.status : 'N/A'}</p>
          {show.schedule && (
            <p>Schedule : {show.schedule.days.join(', ')} at {show.schedule.time ? show.schedule.time : 'N/A'}</p>
          )}
          <p>Premiered : {show.premiered ? show.premiered : 'N/A'}</p>
          {show.officialSite && (
            <p>Official Site : <a href={show.officialSite} target="_blank" rel="noopener noreferrer">{show.officialSite}</a></p>
          )}
          <p>Genres : {show.genres.length > 0 ? show.genres.join(', ') : 'N/A'}</p>
          {show.runtime && <p>Runtime : {show.runtime} minutes</p>}
          <p>Rating : {show.rating && show.rating.average ? show.rating.average : 'N/A'}</p>
          <p>Weight : {show.weight ? show.weight : 'N/A'}</p>
          {show.network && (
            <>
              <p>Network : {show.network.name ? show.network.name : 'N/A'}</p>
              <p>Country : {show.network.country.name ? show.network.country.name : 'N/A'}</p>
              <p>Timezone : {show.network.country.timezone ? show.network.country.timezone : 'N/A'}</p>
            </>
          )}
          <br/>
          <p className='summ'>{show.summary ? show.summary : 'N/A'}</p>
          <br/>
          <button onClick={handleBookTicket}>Book Ticket</button>
        </div>
      </div>
      <div className="section">
        {renderPreviousEpisode()}
        {renderNextEpisode()}
       
      </div>
      {renderBookingForm()}
    </div>
  );
};

export default ShowSummary;
