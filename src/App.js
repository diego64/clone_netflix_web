import React, { useEffect, useState } from 'react';
import './App.css'
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);
    const [blackHeader, setBlackHeader] = useState(false);

    useEffect(() => {
        const loadAll = async () => {
            //Pegando a lista TOTAL
            let list = await Tmdb.getHomeList();
            setMovieList(list);

            //Pegando o Featured
            let originals = list.filter(i => i.slug === 'originals');
            let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
            let chosen = originals[0].items.results[randomChosen];
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')

            setFeaturedData(chosenInfo);
        }

        loadAll();
    }, []);

    //Adicionando o efeito de fundo preto no Header e no icone do usuario
    useEffect(() => {
        const scrollListener = () => {
            if(window.scrollY > 10) {
                setBlackHeader(true);
            } else {
                setBlackHeader(false);
            }
        }

        window.addEventListener('scroll', scrollListener);
        return () => {
            window.removeEventListener('scroll', scrollListener);
        }

    }, []);

    return (
        <div className="page">

            <Header black={blackHeader}/>

        {featuredData && 
            <FeaturedMovie item ={featuredData}/>
        }
            
           <section className="lists">
               {movieList.map((item, key) => (
                   <div>
                       <MovieRow key={key} title={item.title} items={item.items} />
                   </div>
               ))}
           </section>

           <footer>
               Feito por <span role="img" aria-label="caixa">📦</span> por Diego F.<br/>
               Direitos de imagem para Netflix<br/>
               Dados pegos no site Themoviedb.org
           </footer>

           { movieList.length <= 0 &&
                <div className="loading">
                    <img src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="loading"></img>
                 </div>
           }
        </div>
    );
}