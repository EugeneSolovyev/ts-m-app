import styled from 'styled-components'

export const TrackListItem = styled.li`
    list-style: none;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    height: calc(30px + 2rem);
    padding: 1rem 0;
    white-space: nowrap;
    cursor: pointer;

    .track {
        color: #fff;
        font-size: 14px;
        line-height: 1.2;
    }
`

export default styled.ul`
    margin: 0;
    padding: 0;
`