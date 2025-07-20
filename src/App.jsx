import React from 'react'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <section>
      <Outlet/>
    </section>
  )
}

export default App