import styled from 'styled-components';

export default styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;

	img {
		width: 1.5rem;
		height: 1.5rem;
		margin-right: 2rem;
	}

	span {
		padding: 0 1rem;
		color: ${({ theme: { secondaryColor } }) => secondaryColor};
		white-space: nowrap;
	}
`;
