import styled from 'styled-components'

export default styled.header`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    background-color: ${({ theme: { mainColor } }) => mainColor};
    color: ${({ theme: { secondaryColor } }) => secondaryColor};
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

    img {
        height: 90%;
        width: auto;
        object-fit: contain;
    }

    .auth-control {
        justify-self: end;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .username {
        text-align: end;
        margin-left: 15px;
    }

    .ant-btn-link {
        color: ${({ theme: { secondaryColor } }) => secondaryColor};
    }
`