import styled from 'styled-components';

export default styled.div`
	display: grid;
    grid-template-rows: 186px 30px 20px;
    background-color: #34495e;
    grid-gap: 2px;

	img {
		width: 100%;
		height: 186px;
		object-fit: cover;
	}

	span {
		padding: 0 1rem;
        color: ${({ theme: { secondaryColor } }) => secondaryColor};
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.title {
		font-size: 20px;
	}

	.author {
		font-size: 14px;
	}
`;
