/*
Author: Cooper MacDonald 
File: main.js
Date: November 24, 2023
Description: Image gallery where you can select any of the five images and have implemented a button to darken them.
*/

const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');


const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const images = ['pic1.jpg', 'pic2.jpg','pic3.jpg','pic4.jpg','pic5.jpg',]

/* Declaring the alternative text for each image file */
const alternativeTexts = {
    'pic1.jpg': 'Close up image of a blue eye.',
    'pic2.jpg': 'Image of a marble slab that looks like waves.',
    'pic3.jpg': 'Image of white and purple flowers.',
    'pic4.jpg': 'Image of hieroglyphics depicting Egyptian Pharaohs.',
    'pic5.jpg': 'Picture of a large moth on some green foliage.',
};
/* Looping through images */
for (const image of images) {
    const newImage = document.createElement('img'); 
    newImage.setAttribute('src', `images/${image}`);
    newImage.setAttribute('alt', alternativeTexts[image]);
    thumbBar.appendChild(newImage);
    newImage.addEventListener('click', e => {
    displayedImage.src = e.target.src;
    displayedImage.alt = e.target.alt;
  });
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', () => {
    const btnClass = btn.getAttribute('class');
    if (btnClass === 'dark') {
        btn.setAttribute('class','light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } else {
        btn.setAttribute('class','dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
});