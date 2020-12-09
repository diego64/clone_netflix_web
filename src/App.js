import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        const loadAll = async () => {
            //Pegando a lista TOTAL
            let list = await Tmdb.getHomeList();
            setMovieList(list);
        }

        loadAll();
    }, []);

    return (
        <div className="page">
           <section className="list">
               {movieList.map((item, key) => (
                   <div>
                       {item.title}
                   </div>
               ))}
           </section>
        </div>
    );
}