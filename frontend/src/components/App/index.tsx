import React, { useEffect } from 'react'
import { pathOr } from 'ramda'
import { Link } from 'react-router-dom'

export default ({ User, signIn, signOut, setAuthenticated }: any) => {
  useEffect(() => {
    console.log(User)
    if (User.name) setAuthenticated(true)
  }, [User])
  
  return (
    <>
      <h5>{pathOr('Not authenticated', ['name'], User)}</h5>
      <button onClick={signIn}>sign in</button>
      <button onClick={signOut}>Log out</button>
      <Link to="protected">To Protected</Link>
    </>
  )
}
