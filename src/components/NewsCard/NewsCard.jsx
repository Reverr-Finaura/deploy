import './NewsCard.css'
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

// export class NewsCard extends Component {
//   render() {

//     let {title, description, img, url, runtime} = this.props;

//     return (
// <div>
//   <div className="card" style={{width: '18rem'}}>
//     <img src={img} className="card-img-top" alt="Not Available" style={{width: '100%', height: '250px'}}/>
//     <div className="card-body">
//       <h5 className="card-title">{title}</h5>
//       <Link to={url} target='blank' className="btn btn-sm btn-primary mx-2">Read More</Link>
//       {/* <Link to={`/book?title=${title}&time=${runtime}`} className="btn btn-sm btn-primary mx-2">Book Tickets</Link>  */}
//         </div>
//   </div>
// </div>
//     )
//   }
// }

// export default NewsCard


const NewsCard = (props) => {
  // let {title, url} = this.props;


    

  return (
    <>
      <div className='news-box' >
        <div className='newsimg'>
          <img src={props.imgUrl} alt="newsImg" style={{height:'auto', width:'auto'}}/>
        </div>
          <div className='news-details'>
            <p className='newsdate'>{props.time}</p>
            <h4 style={{color:'white'}}>{props.title}</h4>
            <div className='newslink'>
            <a href={props.url}>Read More</a>
            </div>
          </div>

      </div>
    </>
  )
}

export default NewsCard