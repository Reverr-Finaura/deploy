import React from 'react'
import './ArticleRightSideBar.css'
import ArticleDisplay from './ArticleDisplay'

const ArticleRightSideBar = (props) => {
  return (
    <ArticleDisplay title={props.title}/>
  )
}

export default ArticleRightSideBar