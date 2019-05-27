import React, {useState, useEffect} from 'react'

import Navbar from './components/Navbar'
import MetoriteLandings from './components/MetoriteLandings'
import Spinner from './components/Spinner'
import ErrorMessage from './components/ErrorMessage'
import Search from './components/Search'

import './App.css'

function App () {
  const [state, setState] = useState({meteoriteStrikes: null, offset: 0, loading: false})
  const [cache, setCache] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  
  const url = 'https://data.nasa.gov/resource/gh4g-9sfh.json'
  let renderMeteoriteLandings
  let offset = 0

  const handleScroll = async () => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight
    const body = document.body
    const html = document.documentElement
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
    const windowBottom = windowHeight + window.pageYOffset
    if (windowBottom >= docHeight) {
      offset += 50
      setState(s => ({...s, loading: true}))
      const result = await fetchFromNasa(`$limit=50&$offset=${offset}`)
      return setState(s => ({...s, meteoriteStrikes: s.meteoriteStrikes.concat(result), loading: false}))
    }
  }

  async function fetchFromNasa (params) {
    const result = await fetch(`${url}?${params}`)
    .then(res => res.json())
    return result
  }

  async function handleSearch (term) {
    const query = `query=SELECT * WHERE LOWER(name) = LOWER('${term}')`
    const result = await fetchFromNasa(`$${query}`)
    const errorMsg = 'Oh! Unfortunately, no results were found.'
 
    if (!result.error) {
      let newState
      if (!term && !result.length) {
        newState = cache
      } else {
        if (!result.length) return setErrorMsg(errorMsg)
        newState = result
      }   

      setErrorMsg('')
      return setState(s => ({...s, meteoriteStrikes: newState}))
    }

    return setErrorMsg(errorMsg)
  }

  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    async function init () {
      const result = await fetchFromNasa(`$limit=50`)
      
      if (result.error) return setErrorMsg(result.message)
      setCache(result)
      return setState(s => ({...s, meteoriteStrikes: result}))
    }

    init()
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  if (errorMsg) {
    renderMeteoriteLandings = <ErrorMessage errorMsg={errorMsg} />
  } else if (state.meteoriteStrikes) {
    renderMeteoriteLandings = <MetoriteLandings meteoriteLandings={state.meteoriteStrikes} />
  } else {
    renderMeteoriteLandings = <Spinner />
  }

  return (
    <div className="app">
      <Navbar title='Meteorite Explorer' />
      <Search handleSearch={handleSearch} />
      {renderMeteoriteLandings}
      {state.loading && <Spinner />}
    </div>
  )
}

export default App
