import React from 'react'

import MetoriteLanding from '../MetoriteLanding'

import styles from './style.module.css'

function MetoriteLandings ({meteoriteLandings}) {
  const renderRows = meteoriteLandings.map(m => <MetoriteLanding key={m.id} landingInfo={m} />)

  return ( 
    <table className={styles.metoriteLandings} cellSpacing="0" cellPadding="0">
      <thead>
        <tr className={`${styles.tableRow} ${styles.orangeBg}`}>
          <th>Name</th>
          <th>Id</th>
          <th>Name Type</th>
          <th>Rec Class</th>
          <th>Mass (g)</th>
          <th>Fall</th>
          <th>Year</th>
          <th>Latitude</th>
          <th>Longitude</th>
        </tr>
      </thead>
      <tbody>
        {renderRows}
      </tbody>
    </table>
  )
}

export default MetoriteLandings