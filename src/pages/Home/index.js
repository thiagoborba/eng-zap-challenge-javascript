import React, { useEffect, useState } from 'react'
import { getProperties } from '../../api'

export const Home = () => {
  const [{ loading }, setState] = useState({
    loading: false
  })

  useEffect(() => {
    fetchProprieties();
  }, []);

  async function fetchProprieties() {
    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      const proprieties = await getProperties();
      console.log(proprieties)
    } catch (error) {
      console.error(error)
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  }

  return (
    <div>
      Home
    </div>
  )
}

export default Home