import React, { useState } from 'react';
import './unsplash.css';
import axios from 'axios';

const Unsplash = () => {
  const [input, setInput] = useState('');
  const [photoCount, setPhotoCount] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [randomPhotos, setRandomPhotos] = useState(false);
  const [orientation, setOrientation] = useState('landscape');

  const UNSPLASH_ACCESS_KEY = 'U0XL2dYhtLOm8Jw6JSX04EPCzS6ISvt1OEDQzbnnf-M';

  
  const fetchPhotos = async () => {
    let endpoint = randomPhotos
      ? `https://api.unsplash.com/photos/random?count=${photoCount}&orientation=${orientation}&client_id=${UNSPLASH_ACCESS_KEY}`
      : `https://api.unsplash.com/search/photos?query=${input}&per_page=${photoCount}&orientation=${orientation}&client_id=${UNSPLASH_ACCESS_KEY}`;

    try {
      const response = await axios.get(endpoint);
      const fetchedPhotos = randomPhotos ? response.data : response.data.results;
      setPhotos(fetchedPhotos);
      setCurrentIndex(0);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  
  const nextSlide = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  const prevSlide = () => setCurrentIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));

  return (
    <div className="app-container">
      <h1>Unsplash Image Carousel</h1>
      <div className="inputs-container">
        <input
          type="text"
          placeholder="Enter keyword"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={randomPhotos}
          className="input-box"
        />
        <input
          type="number"
          placeholder="Number of photos"
          value={photoCount}
          onChange={(e) => setPhotoCount(e.target.value)}
          min="1"
          disabled={randomPhotos}
          className="input-box"
        />
        <label className="checkbox-label">
          <input type="checkbox" checked={randomPhotos} onChange={(e) => setRandomPhotos(e.target.checked)} />
          Need random images
        </label>
        <label className="orientation-label">
          Orientation:
          <select value={orientation} onChange={(e) => setOrientation(e.target.value)}>
            <option value="landscape">Landscape</option>
            <option value="portrait">Portrait</option>
          </select>
        </label>
      </div>
      <button onClick={fetchPhotos} className="fetch-btn">
        Get Photos
      </button>

      {photos.length > 0 && (
        <div className="carousel-container">
          <button onClick={prevSlide} className="carousel-btn prev">❮</button>
          <div className="carousel-slide">
            <img
              src={photos[currentIndex].urls.regular}
              alt={photos[currentIndex].alt_description || 'Image'}
              className="carousel-image"
            />
            <p className="image-description">{photos[currentIndex].alt_description || 'No description available'}</p>
          </div>
          <button onClick={nextSlide} className="carousel-btn next">❯</button>
        </div>
      )}
    </div>
  );
};

export default Unsplash;
