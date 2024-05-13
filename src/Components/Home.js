import './Home.css'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then((response) => response.json())
      .then((data) => setShows(data));
  }, []);

  return (
    <div className='home'>
      <ul className='ulclass'>
        {shows.map((show) => (
          <li key={show.show.id}>
            <div className="image">
            {show.show.image && show.show.image.original && (
                <img src={show.show.image.original} alt={show.show.name} />
              )}
            </div>
            <div className="info">
             <h2>{show.show.name}</h2>
             <p>{show.show.language}</p>
             <p>{show.show.genres[0]}</p>
            <Link to={`/show/${show.show.id}`} className='link'>
              More details
            </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
