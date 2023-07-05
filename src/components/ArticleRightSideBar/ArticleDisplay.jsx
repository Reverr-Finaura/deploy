// import React from 'react'
// import './ArticleDisplay.css'

// const ArticleDisplay = (props) => {
//   return (
//     <>
//     <div className='article-box'>
//       <img src={props.imgUrl} alt="Image" style={{height:'75px', width:'135px'}}/>
//         <div className='article-details'>
//           <p>{props.time}</p>
//           <h3 style={{color:'white'}}> {props.title}</h3>
//           <p>{props.source}</p>
//         </div>
//         <div >
//           <a classname='article-link' href="">Read More</a>
//         </div>

//     </div>
//   </>
//   )
// }

// export default ArticleDisplay






// import React from 'react'
// import './ArticleDisplay.css'

// const ArticleDisplay = (props) => {
//   return (
//     <>
//       <div className='article-box'>
//         <img src={props.imgUrl} alt="Image" className='article-image' />
//         <div className='article-details'>
//           <p>{props.time}</p>
//           <h3 className='article-heading' style={{ color: 'white' }}> {props.title}</h3>
//           <p>{props.description}</p>
//         </div>
//         <div>
//           <a className='article-link' href="">Read More</a>
//         </div>
//       </div>
//     </>
//   )
// }

// export default ArticleDisplay








import React from 'react';
import './ArticleDisplay.css';

const ArticleDisplay = (props) => {
  const limitedDescription = props.description.length > 150
    ? props.description.slice(0, 150) + '...'
    : props.description;

  return (
    <>
      <div className='article-box'>
        <img src={props.imgUrl} alt="Image" className='article-image' />
        <div className='article-details'>
          <h3 className='article-heading' style={{ color: 'white' }}> {props.title}</h3>
          <p className='article-desc'>{limitedDescription}</p>
        </div>
        <div>
          <a className='article-link' href="">Read More</a>
        </div>
      </div>
    </>
  );
};

export default ArticleDisplay;
