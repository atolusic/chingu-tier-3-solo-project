import React from 'react'

import styles from './style.module.css'

function Navbar ({title}) {
  return (
    <div className={styles.navbar}>
      <h1>{title}</h1>
    </div>
  )
}

export default Navbar