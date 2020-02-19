import styled from 'styled-components'

export default styled.footer`
    background-color: ${({ theme: { mainColor } }) => mainColor};
    color: ${({ theme: { secondaryColor } }) => secondaryColor};
`