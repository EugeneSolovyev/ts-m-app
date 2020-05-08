import styled from 'styled-components';

export const SuspenseComponent = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default styled.div`
	display: grid;
	grid-template-rows: 60px 1fr 64px;
	height: 100vh;
	overflow: hidden;

	main {
		display: grid;
		grid-template-columns: 186px 1fr;
		grid-gap: 8px;
		grid-template-rows: 1fr;
		height: 100%;
		overflow-y: hidden;
	}
	.content {
		padding: 0 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		overflow-y: auto;
	}
`;
