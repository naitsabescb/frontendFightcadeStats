import React from 'react'
import { AddUsername } from './components/AddUsername'
import { NavBar } from './components/NavBar'
import { PlayersTable } from './components/PlayersTable'


export const FightcadeRankApp = () => {

  const onSearchUser = () => {

  }


  return (
    <>
      <NavBar />
      <div className='main-section'>
        <PlayersTable />

      </div>

    </>
  )
}
