import React from 'react';

type Props = {
  onLogin: () => void,
}

export default ({ onLogin }: Props) => (
  <button onClick={onLogin}>Login</button>
)
