import React from 'react'

const TD = ({data, className}) => {
  return (
    <td className={`border-2 min-w-[150px] p-2 ${className}`}>{data}</td>
  )
}

export default TD