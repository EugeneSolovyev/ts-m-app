import React from 'react'
import { bindActionCreators } from 'redux';
import { Icon, Button } from 'antd'
import { addToWaitingList } from '../../actions/user'
import { connect } from '../../helpers/connect';
import ListView, { ListItemView } from './styles'
import { actualListSelector } from './selectors'

@(connect(
	(state) => ({ userList: actualListSelector(state), }),
	(dispatch) => bindActionCreators({ addToWaitingList },dispatch)
) as any)
export default class UserList extends React.Component<any> {
    handleAddToWaitingList = (id: string | number) => () => {
        const { addToWaitingList } = this.props;
        addToWaitingList(id);
    };

    render() {
        const { userList } = this.props;

        return (
            <ListView>
                {userList.map(({ id, name, lastName, friendsList }: any) => (
                    <ListItemView key={id}>
                        <span className="user-full-name">{name} {lastName}</span>
                        <Button type="link" onClick={this.handleAddToWaitingList(id)}><Icon type="user-add" /></Button>
                    </ListItemView>
                ))}
            </ListView>
        )
    }
}