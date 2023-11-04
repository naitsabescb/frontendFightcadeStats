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
      <h1>Fightcade Rank App</h1>
      <div className='main-section'>
        <PlayersTable />

      </div>

    </>
  )
}
