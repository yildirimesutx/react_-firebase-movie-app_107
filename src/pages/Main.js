import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const Main = () => {

// 5. çektiğimiz veriyi saymamızda görebilmek için usestate tanımladık

// 6. useState([]) map ederken içerisine boş array tanımlıyoruz

// 7. aşağıda tanımlamış olan console.log u artık silip setMovies i kullanıyoruz

const [movies, setMovies] = useState([])


  //1. apı yı property olarak gönderiyoruz, search apı gelirse onu çağıracak, featured apı çağrıldığında o gelecek 

  //2. ilk açılışta sergilenmesi için useeffect kullandık ve içerisine FEATURED_API yi yerleştiriyoruz
  useEffect(() => {
    getMovies(FEATURED_API)
  }, [])

//3.  aşağıda kullanılan then catch yapısı ile async await yapısı aynı

//4. ilk önce console.log(res) yapıyoruz gelen verinin içinden ilgili kısımların data>results olduğunu görünce res.data.results olarak değiştirdik 

 const getMovies = (API)=>{
   axios
   .get(API)
   .then(res => setMovies(res.data.results))
   .catch((err) => console.log(err))
 }

// 8. map ten döndürdüğümüz veriyi Movie card ın içinde yazdırmak istedik, veriyi card a gönderirken 2 farklı yöntem ile gönderebiliyoruz, movie={movie} ile movie objesini proptan tek tek çekmemiz gerekiyor. {...movie} bu şekilde giderde distrack ve yayılmış olarak gidiyor bu şekilde daha kolay oluyor



  return (
    <>
     <div className="d-flex justify-content-center flex-wrap"></div>
      {movies.map(movie => (
        <MovieCard key={movie.id} {...movie}/>
      ))
        
      }


    </>
  )
}

export default Main