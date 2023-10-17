import React from 'react'

const Opacity : React.FC = () => {
  return (
    <>
         <input
      type="range"
      name="opacity"
      min={1}
      max={100}
      step={1} // Set the step to 1
      className="w-[95%]"
    />
    </>
  )
}

export default Opacity
