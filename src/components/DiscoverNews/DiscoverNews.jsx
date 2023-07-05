// import React from 'react'
// import NewsCard from '../../components/NewsCard/NewsCard'


// const DiscoverNews = () => {
//   return (
//     <section className='news-section'> 


//     {/* News */}
//     <div className='news'>
//             <h3 style={{color:'white', marginTop:'10px'}}> Trending <span style={{color:'blue'}}>News</span> </h3>
//         </div>
//         <div className='news-container'>
//             <NewsCard/>
//             <NewsCard/>
//             <NewsCard/>
//             <NewsCard/>
//     </div>

//     </section>
//   )
// }

// export default DiscoverNews




import NewsCard from '../../components/NewsCard/NewsCard'
import React, { useEffect, useState } from 'react'
import axios from "axios";

// export class DiscoverNews extends Component {

//   constructor(){
//     super();
//     console.log("Constructor")
//     this.state = {
//         shows : [],
//         page : 1
//     }
// }


//     async componentDidMount() {
//         let url = "https://api.tvmaze.com/search/shows?q=all";
//         let data = await fetch(url);
//         let parsedData = await data.json();
//         let showsArray = parsedData.map((item) => item.show);
//         this.setState({
//           shows: showsArray,
//         });
//       }


//   render() {
//     return (
//       <section className='news-section'> 


//       {/* News */}
//       <div className='news'>
//               <h3 style={{color:'white', marginTop:'10px'}}> Trending <span style={{color:'blue'}}>News</span> </h3>
//       </div>
  
  

//       <div className='container my-3'>
//   <h1>Shows</h1>
//   <div className="row">
//     {this.state.shows.map((element) => {
//       return (
//         <div className="col-md-4 mb-4" key={element.id}>
//           <div>
//             <NewsCard
//               title={element.name}
//               // description={element.summary}
//               img={element.image ? element.image.original : ""}
//               url={element.url}
//               // runtime={element.averageRuntime}
//               // schedule={element.schedule}
//             />

//           </div>
//         </div>
//       );
//     })}
//   </div>
// </div>


//           {/* <div className='news-container'>
//               <NewsCard/>
//               <NewsCard/>
//               <NewsCard/>
//               <NewsCard/>
//           </div> */}
  
//       </section>
//     )
//   }
// }

// export default DiscoverNews



// const DiscoverNews = () => {
//   const [newsData, setNewsData] = useState();

//   //FETCH LATEST NEWS
//   const options = {
//     method: "GET",
//     url: "https://api.bing.microsoft.com/v7.0/news/search",
//     params: { q: "startup", safeSearch: "Off", textFormat: "Raw" },
//     headers: {
//       "Content-Type": "application/json",
//       "Ocp-Apim-Subscription-Key": "bd03e8f8f29b46479ee4c2004280308f",
//     },
//   };

//   async function getNews() {
//     try {
//       await axios.request(options).then((res) => {
//         setNewsData(res.data.value);
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   useEffect(() => {
//     getNews();
//   }, []);

// console.log(newsData)
  

//   return (
//     <section className='news-section'> 


//     {/* News */}
//     <div className='news'>
//             <h3 style={{color:'white', marginTop:'10px'}}> Trending <span style={{color:'blue'}}>News</span> </h3>
//     </div>

//   { newsData.slice(0, 4).map( (news) => {
//       return(
//           <div className='news-container' key={news.url}>
//             <NewsCard title={news.name} url={news.url} imgUrl={news?.image?.thumbnail?.contentUrl} time={news.datePublished}/>
//           </div> 
//         )
//       }
//     )
//   }




//     </section>
//   )
// }

// export default DiscoverNews











const DiscoverNews = () => {
  const [newsData, setNewsData] = useState();

  //FETCH LATEST NEWS
  const options = {
    method: "GET",
    url: "https://api.bing.microsoft.com/v7.0/news/search",
    params: { q: "startup", safeSearch: "Off", textFormat: "Raw" },
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": "d7e17be6d66f494ea9c6cddf39825060",
    },
  };

  useEffect(() => {
    getNews();
  }, []);

  async function getNews() {
    try {
      await axios.request(options).then((res) => {
        setNewsData(res.data.value);
      });
    } catch (err) {
      console.log(err);
    }
  }

console.log(newsData)

  const getTimeDifferenceInHours = (newsDate) => {
    const now = new Date();
    const news = new Date(newsDate);
    console.log(now)
    console.log(news)
    var differenceInMinutes = Math.abs(now - news) / 60;
    var differenceInHours = Math.floor(differenceInMinutes / 60);

  
    return differenceInHours;
  };




  return (
    <section className='news-section'> 


    {/* News */}
    <div className='news'>
            <h3 style={{color:'white', marginTop:'10px', marginLeft:'12px'}}> Trending <span style={{color:'blue'}}>News</span> </h3>
    </div>


  <div className='row' style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
    
    { newsData && newsData.slice(0, 4).map( (news) => {
        return(
          <div className='allCards' style={{display:'flex', flexDirection:'row'}}>
            <NewsCard title={news.name} url={news.url} imgUrl={news?.image?.thumbnail?.contentUrl} time={news.datePublished.slice(0,10)}/>
          </div>

          )
        
        }
      )
    }

  </div>




    </section>
  )
}

export default DiscoverNews
