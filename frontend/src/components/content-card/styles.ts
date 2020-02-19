import styled from 'styled-components'

const DEFAULT_SIDE_LENGTH: string = '250px'

export const ContentCover: any = styled.div`
    width: ${DEFAULT_SIDE_LENGTH};
    height: ${DEFAULT_SIDE_LENGTH};
    background-image: url(${({ image }: any) => image});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 8px;
    transition: box-shadow 0.3s ease-out;

    .hoverable {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: rgba(0,0,0, .5);
        border-radius: inherit;
        opacity: 0;
        transition: opacity 0.3s ease-out;
    }

    &:hover {
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

        .hoverable {
            opacity: 1;
        }
    }

    .anticon {
        background-color: ${({ theme: { secondaryColor } }) => secondaryColor};
        border-radius: 50%;
        padding: 1rem;
    }

    .ant-btn {
        height: auto;
        padding: 0;
        color: inherit;
    }
`

export default styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, ${DEFAULT_SIDE_LENGTH});
    width: 100%;
    grid-gap: 8px;
    padding: 8px 0;
    justify-items: center;
    justify-content: center;

    .ant-card-meta-detail {
        .ant-card-meta-title,
        .ant-card-meta-description {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }
`