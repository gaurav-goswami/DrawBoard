import React from 'react'

interface IStroke {
    color ?: string
}

const Stroke : React.FC <IStroke> = ({color}) => {
  return (
    <>
        <div className={`w-5 h-5 rounded-sm cursor-pointer`} style={{background : color}} />
    </>
  )
}

export default Stroke
