import React, { useState } from 'react'
import CheckSlideCard from '../Check Slide Card/CheckSlideCard'
import CheckpointCard from '../Checkpoint Card/CheckpointCard'
import QuestionCard from '../Question Card/QuestionCard'
import SlideCard from '../Slide Card/SlideCard'

const SubSlide = ({setSubSlidesBegin,data}) => {
    const[idx,setIdx]=useState(1)
    const[limit]=useState(data.length)
    console.log("data",data)
  return (
    <>
        {data.map((slide)=>{
            return <>
            {idx===slide.id?<>
                {slide.type==="slide"&&<SlideCard limit={limit} idx={idx} setSubSlidesBegin={setSubSlidesBegin} setIdx={setIdx} data={slide}/>}
                {slide.type==="question"&&<QuestionCard limit={limit} idx={idx} setSubSlidesBegin={setSubSlidesBegin} setIdx={setIdx} data={slide}/>}
                {slide.type==="Checkpoint"&&<CheckpointCard limit={limit} idx={idx} setSubSlidesBegin={setSubSlidesBegin} setIdx={setIdx} data={slide}/>}
                {slide.type==="checkslide"&&<CheckSlideCard limit={limit} idx={idx} setSubSlidesBegin={setSubSlidesBegin} setIdx={setIdx} data={slide}/>}
            </>:null}
            </>
        })
        }
    </>
  )
}

export default SubSlide