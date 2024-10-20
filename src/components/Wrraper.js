import React from 'react'

const Wrraper = ({children}) => {
  return (
    <div className='w-[340px] h-[340px] bg-violet-700 mx-auto rounded-md'>{children}</div>
  )
}

export default Wrraper;