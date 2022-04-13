import axios from "axios";
import React from "react";

const Main = () => {

const getApi = async ()=>{
const rest = await axios("https://api.themoviedb.org/3/movie/550?api_key=5dc933df20d36ea2b570db659cb05285")
  console.log(rest)
}



  return <div>Main</div>;
};

export default Main;
