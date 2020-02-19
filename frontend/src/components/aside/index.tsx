import React from 'react';
import { Button } from 'antd';
import AsideView from './styles';
import CurrentTrack from '../current-track'

interface IAsideProps {
	content: Function | React.ReactNode;
	title?: string;
}

const Aside = ({ content, title }: IAsideProps) => {
	return (
		<AsideView>
			{!!title && (
				<header>
					<h5>{title}</h5>
					<Button htmlType="button" type="link">
						&times;
					</Button>
				</header>
			)}
			<main>{typeof content === 'function' ? content() : content}</main>
			<CurrentTrack />
		</AsideView>
	);
};

export default Aside;
