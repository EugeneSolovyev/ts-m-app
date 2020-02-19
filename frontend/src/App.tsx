import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Theme } from './common/styles/theme';
import GlobalStyles from './common/styles/global';
import Wrapper from './components/wrapper';
import ApplicationStore from './store';
import RouterHandler from './components/application-router';

const App = () => {
	return (
		<React.Fragment>
			<Normalize />
			<GlobalStyles />
			<ToastContainer />
			<BrowserRouter>
				<Provider store={ApplicationStore}>
					<ThemeProvider theme={Theme}>
						<Wrapper>
							<RouterHandler />
						</Wrapper>
					</ThemeProvider>
				</Provider>
			</BrowserRouter>
		</React.Fragment>
	);
};

export default App;
