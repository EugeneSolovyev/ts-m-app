import { IActionType, IContentReducerState } from './reducers.d';
import { Content } from '../constants/content.enum';

const INITIAL_STATE: IContentReducerState = {
	audio: [
		{
			id: btoa('test_audio_content_v1'),
			title: 'first',
			author: 'untitled',
			image: 'https://source.unsplash.com/random',
			track: require('../components/player/file.mp3'),
		},
		{
			id: btoa('test_audio_content_v2'),
			title: 'second',
			author: 'untitled',
			image: 'https://source.unsplash.com/user/erondu',
			track: require('../components/player/file.mp3'),
		},
		{
			id: btoa('test_audio_content_v3'),
			title: 'third',
			author: 'untitled',
			image: 'https://source.unsplash.com/user/erondu',
			track: require('../components/player/file.mp3'),
		},
		{
			id: btoa('test_audio_content_v4'),
			title: 'fourth',
			author: 'untitlefdsfsdfsdfdsfdsfsdfdsfsdfsdfdsdsd',
			image: 'https://picsum.photos/200',
			track: require('../components/player/file.mp3'),
		},
		{
			id: btoa('test_audio_content_v5'),
			title: '5',
			author: 'untitled',
			image: 'https://picsum.photos/200',
			track: require('../components/player/file.mp3'),
		},
		{
			id: btoa('test_audio_content_v6'),
			title: '6',
			author: 'untitled',
			image: 'https://picsum.photos/200',
			track: require('../components/player/file.mp3'),
		},
		{
			id: btoa('test_audio_content_v7'),
			title: '7',
			author: 'untitled',
			image: 'https://picsum.photos/200',
			track: require('../components/player/file.mp3'),
		},
		{
			id: btoa('test_audio_content_v8'),
			title: '8',
			author: 'untitled',
			image: 'https://picsum.photos/200',
			track: require('../components/player/file.mp3'),
		},
		{
			id: btoa('test_audio_content_v9'),
			title: '9',
			author: 'untitled',
			image: 'https://picsum.photos/200',
			track: require('../components/player/file.mp3'),
		}
	],
	current: {
		id: btoa('test_audio_content_v1'),
		title: 'first',
		author: 'untitled',
		image: 'https://source.unsplash.com/random',
		track: require('../components/player/file.mp3'),
	},
};

export default (state: IContentReducerState = INITIAL_STATE, { type, payload }: IActionType): IContentReducerState => {
	if (typeof payload === 'function' && type === Content) {
		state = payload(state);
	}

	return state;
};
