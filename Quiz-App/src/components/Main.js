import React, { useState } from 'react';
import animals from "../assets/animals.jpeg"
import books from "../assets/books.jpeg"
import celebrities from  "../assets/celebrities.jpeg"
import computers from "../assets/computers.jpeg"
import film from "../assets/film.jpeg"
import music from "../assets/music.jpeg"
import musical from  "../assets/musical.jpeg"
import nature from "../assets/nature.jpeg"
import sports from "../assets/sports.jpeg"
import television from "../assets/television.jpeg"
import Category from './Category';


 function Main() {
  const [categories, setCategories] = useState([
    { 
      name: 'Books',
      description: 'Discover questions about Books',
      src: books,
      apiLink: 'https://opentdb.com/api.php?amount=10&category=10&type=multiple'
    },{
      name: 'Film',
      description: 'Discover questions about Films',
      src: film,
      apiLink: 'https://opentdb.com/api.php?amount=10&category=11&type=multiple'
    },
    {
      name: 'Music',
      description: 'Discover questions about Music',
      src: music,
      apiLink: 'https://opentdb.com/api.php?amount=10&category=12&type=multiple'
    },
    {
      name: 'Television',
      description: 'Discover questions about Television',
      src: television,
      apiLink:'https://opentdb.com/api.php?amount=10&category=14&type=multiple'
    },
    {
      name: 'Sports',
      description: 'Discover questions about Sports',
      src: sports,
      apiLink:'https://opentdb.com/api.php?amount=10&category=21&type=multiple',
    },
    {
      name: 'Celebrities',
      description: 'Discover questions about Celebrities',
      src: celebrities,
      apiLink:'https://opentdb.com/api.php?amount=10&category=26&type=multiple'
    },
    {
      name: 'Animals',
      description: 'Discover questions about Animals',
      src: animals,
      apiLink:'https://opentdb.com/api.php?amount=10&category=27&type=multiple'
    },
    {
      name: 'Science: Computers',
      description: 'Discover questions about Computers',
      src: computers,
      apiLink:'https://opentdb.com/api.php?amount=10&category=27&type=multiple'
    },
    {
      name: 'Musicals & Theatres',
      description: 'Discover questions about Musicals & Theatres',
      src: musical,
      apiLink:'https://opentdb.com/api.php?amount=10&category=13&type=multiple'
    },
    {
      name: 'Nature',
      description: 'Discover questions about Nature',
      src: nature,
      apiLink:'https://opentdb.com/api.php?amount=10&category=17&type=multiple'
    },
  ]);
 
   return(
   <div>
    <Category categories= {categories}/>
    </div>
   )
}

export default Main;