import styled from 'styled-components';

export default styled.aside`
	border-right: 1px solid;
	overflow: hidden;
	width: 100%;
	background-color: ${({ theme: { wetAsphaltColor } }) => wetAsphaltColor};
    display: grid;
    grid-template-rows: 1fr 252px;

	header {
		padding: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid;
		padding: 0 2rem;

		h5 {
			margin: 0;
		}
	}

	main {
		height: inherit;
		overflow-y: auto;
		display: block;
		padding: 0 1rem;
	}
`;
