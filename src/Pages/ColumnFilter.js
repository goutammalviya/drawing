import React from 'react'

export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column
  return (
    <span>
    <div className="" style={{}}>
    <input
      style={{border: "0" , borderRadius: "3px" , maxWidth: "7.3rem" , maxHeight: "25px"}}
        value={filterValue || ''}
        placeholder="Search.."
        onChange={e => setFilter(e.target.value)}
      />
    </div>
    </span>
  )
}