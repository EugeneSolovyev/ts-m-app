import styled from 'styled-components'
import { Slider } from 'antd'

export const AdditionalControlView: any = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 30%);
    align-items: center;

    .ant-btn-link {
        color: inherit;
    }

    .anticon-retweet {
        color: ${({ loop }: any) => loop ? '#95a5a6' : 'inherit'};
    }

    .anticon-sound {
        line-height: 1.499;
        padding: 0 15px;
        font-size: 14px;
    }
`

export const VolumeSlider = styled(Slider)`
    height: 150px;
`

export default styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    align-items: center;
    justify-content: center;
    height: 100%;

    .control {
        display: grid;
        grid-template-columns: repeat(3, 30%);
        align-self: center;
        .ant-btn-link {
            color: inherit;
        }
    }

    .play-control {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 15px 2fr;
        .time {
            font-size: 10px;
        }
        .fullTime{
            font-size: 10px;
            justify-self: flex-end;
        }
        .MuiSlider-root {
            grid-column-end: span 2;
            margin-right: 0;
            margin-top: 8px;
        }
    }
`