import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import img1 from '../assets/MiaForPQUIZ.jpg';
import img2 from '../assets/BonnieForPQUIZ.jpg';
import img3 from '../assets/jonnhyFORPQUIZ.jpg';
import './Accueil.css';

const images = [img1, img2, img3];

function Accueil() {
const [currentIndex, setCurrentIndex] = useState(0);

const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
};

const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
};


useEffect(() => {
    const interval = setInterval(() => {
    nextSlide();
    }, 4000); 

    return () => clearInterval(interval); 
}, []);

return (
    <div className="accueil-container">
    <h1 className="carousel-title">Bienvenue sur le quiz de vos stars préférées !</h1>

    <div className="layout-horizontal">
        <Link to="/choix-niveau" className="quiz-card">
        <h3>Quiz Mia</h3>
        <p>Mia KHALIFAA</p>
        </Link>

        <div className="carousel-container">
        <button className="arrow left" onClick={prevSlide}>‹</button>
        <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="carousel-image"
        />
        <button className="arrow right" onClick={nextSlide}>›</button>
        </div>

        <Link to="/quiz2" className="quiz-card">
        <h3>Quiz Johnny</h3>
        <p>GROS CHIIBRE</p>
        </Link>
    </div>
    </div>
);
}

export default Accueil;






