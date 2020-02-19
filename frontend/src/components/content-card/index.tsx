import React from 'react';
import { Empty } from 'antd';
import { pathOr } from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from '../../helpers/connect';
import { addToFavorite, removeFromFavorite } from '../../actions/user';
import { setToPlay } from '../../actions/content'
import ContentCardView from './styles';
import Card from './card'

const contentSelector = (state: any, type: string) => pathOr([], [ 'content', type ], state);
const currentUserSelector = (state: any) => pathOr(null, ['user', 'current'], state);

@(connect(
	(state, ownProps: any) => ({
		content: contentSelector(state, ownProps.type),
        user: currentUserSelector(state),
	}),
	(dispatch) => bindActionCreators({
		addToFavorite,
		removeFromFavorite,
		setToPlay,
	}, dispatch)
) as any)
export default class ContentCard extends React.Component<any> {
    handleAddToFavorite = (id: string | string): void => {
		const { addToFavorite } = this.props;
		addToFavorite(id);
	}

	handleRemoveFromFavorite = (id: string | number): void => {
		const { removeFromFavorite } = this.props;
		removeFromFavorite(id);
	}

	render() {
		const { content, user, setToPlay } = this.props;

        if (!user || !content.length) return <Empty description={false} />

		return (
			<ContentCardView>
				{content.map(({ id, ...props }: any) => (
					<Card key={id} id={id} onAddToFavorite={this.handleAddToFavorite} onRemoveFromFavorite={this.handleRemoveFromFavorite} onClickPlay={setToPlay} {...props} />
				))}
			</ContentCardView>
		);
	}
}
