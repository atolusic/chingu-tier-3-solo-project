import React from 'react'

import styles from './style.module.css'

function MeteoriteLanding ({landingInfo}) {
  const {name, id, fall, mass, nametype, recclass, reclat, reclong, year} = landingInfo
  const formattedYear = new Date(year).getFullYear() || 'N/A'

  return (
    <tr className={styles.tableRow}>
      <td>{name}</td>
      <td>{id}</td>
      <td>{nametype}</td>
      <td>{recclass}</td>
      <td>{mass}</td>
      <td>{fall}</td>
      <td>{formattedYear}</td>
      <td>{reclat}</td>
      <td>{reclong}</td>
    </tr>
  )
}

export default MeteoriteLanding