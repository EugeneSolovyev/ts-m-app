import { find, propEq, head, path } from "ramda";
import { Content } from "../constants/content.enum";
import { IContentReducerState } from "../reducers/reducers.d";
import HTTP from "../common/api";
import { toast } from "react-toastify";

type PossibleIDType = number | string;

const FILE_ENDPOINT: string = "/music-service/file";
const DUPLICATE_ERROR_CODE: number = 11000;

export const getAllMusic = () => async (dispatch: any) => {
  const response = await HTTP.get(FILE_ENDPOINT);

  dispatch({
    type: Content,
    payload: <IContentReducerState>(state: any): IContentReducerState => ({
      ...state,
      audio: response,
      current: head(response as any) || null,
    }),
  });
};

export const uploadMusic = (tracks: any) => async (dispatch: any) => {
  const formData = new FormData();
  Object.keys(tracks).forEach((key: string) => {
    formData.append(key, tracks[key]);
  });

  try {
    const { response, ...uploadedTrack }: any = await HTTP.post(
      FILE_ENDPOINT,
      formData
    );
    const isDuplicate: boolean =
      path(["data", "error", "code"], response) === DUPLICATE_ERROR_CODE;

    if (isDuplicate) throw Error("Duplicate track");

    toast.success("Success");

    dispatch({
      type: Content,
      payload: (state: any): any => ({
        ...state,
        audio: [...state.audio, uploadedTrack],
      }),
    });
  } catch (error) {
    toast.error(error.message);
  }
};

export const setToPlay = (id: PossibleIDType) => ({
  type: Content,
  payload: <IContentReducerState>(state: any): IContentReducerState => ({
    ...state,
    current: find(propEq("track_id", id))(state.audio),
  }),
});

export const setLikeToTrack = (trackId: string): any => async (
  dispatch: any,
  getState: Function
) => {
  try {
    const current: any = await HTTP.put(FILE_ENDPOINT, {
      track_id: trackId,
    });

    dispatch({
      type: Content,
      payload: <IContentReducerState>(state: any): IContentReducerState => ({
        ...state,
        audio: [
          ...state.audio.filter(({ track_id }: any) => track_id !== trackId),
          current,
        ],
        current,
      }),
    });
  } catch (error) {
    toast(error.message);
  }
};
