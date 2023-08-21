import { CardContent, Typography } from '@mui/material'
import React from 'react'
import CategoryDetail from './CategoryDetail';


function Category (props){
    const {
        categories
    } = props
  return (

    <div style={{display:"flex", flexWrap:"wrap", padding:"80px"}}>
    {categories &&
        categories.map((category, index) => {
          return (
            <div style={{ display: "contents" }} key={index}>
              <CategoryDetail category={category} />
            </div>
          );
        })}
    </div>
        
  )
}

export default Category