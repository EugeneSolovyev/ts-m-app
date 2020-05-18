import styled from "styled-components";
import { Slider } from "antd";

export const LikeButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
	align-items: center;
`;

export const AdditionalControlView: any = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 25%);
  align-items: center;
  justify-content: center;
  justify-items: center;

  .ant-btn-link {
    color: inherit;
  }

  .MuiSvgIcon-root {
    padding-bottom: 3px;
  }

  .anticon-sound {
    line-height: 1.499;
    padding: 0 15px;
    font-size: 14px;
  }
`;

export const VolumeSlider = styled(Slider)`
  height: 150px;
`;

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

  .playerWrapper {
    padding-top: 12px;

    .play-control {
      display: grid;
      grid-template-columns: 1fr 2fr 3fr;
      grid-template-rows: 10px 1fr;
      .time {
        font-size: 10px;
      }
      .fullTime {
        font-size: 10px;
        justify-self: flex-end;
      }
      .MuiSlider-root {
        grid-column-end: span 3;
        margin-right: 0;
        margin-top: 8px;
      }
    }
  }
`;
