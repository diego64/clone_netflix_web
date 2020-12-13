import React, { useEffect, useState } from 'react';
import './App.css'
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);

    useEffect(() => {
        const loadAll = async () => {
            //Pegando a lista TOTAL
            let list = await Tmdb.getHomeList();
            setMovieList(list);

            //Pegando o Feature
        }

        loadAll();
    }, []);

    return (
        <div className="page">

        {featuredData && 
            <featuredData item ={featuredData}/>
        }
            
           <section className="list">
               {movieList.map((item, key) => (
                   <div>
                       <MovieRow key={key} title={item.title} items={item.items} />
                   </div>
               ))}
           </section>
        </div>
    );
}