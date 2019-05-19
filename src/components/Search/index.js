import React, {useState} from 'react'

import styles from './style.module.css'

function Search ({handleSearch}) {
  const [value, setValue] = useState('') 
  
  const onSubmit = e => {
    e.preventDefault()
    return handleSearch(value)
  }

  const onChange = e => {
    setValue(e.target.value)
  }

  return ( 
    <form onSubmit={onSubmit} className={styles.searchForm}>
      <input onChange={onChange} className={styles.searchInput} placeholder="Enter search terms" type="text" />
      <button className={styles.searchButton}>Search</button>
    </form>
  )
}

export default Search