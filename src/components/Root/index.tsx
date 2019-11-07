import React, { useState, ReactNode } from 'react'

type Props = {
  children: (props: { isAuthenticated: boolean, setAuthenticated: (value: boolean) => void }) => ReactNode,
}

const Root = ({ children }: Props) => {
  const [isAuthenticated, setAuthenticated] = useState(false)

  return (
    <main>
      {children({ isAuthenticated, setAuthenticated })}
    </main>
  )
}

export default Root
