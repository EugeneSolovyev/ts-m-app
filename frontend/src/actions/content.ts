import { find, propEq, head, path, reduce } from "ramda";
import { Content } from "../constants/content.enum";
import { IContentReducerState } from "../reducers/reducers.d";
import HTTP from "../common/api";
import { toast } from "react-toastify";

type PossibleIDType = number | string;

const FILE_ENDPOINT: string = "/music-service/file";
const DUPLICATE_ERROR_CODE: number = 11000;

const findAndReplaceTrack = (updatedTrack: any, trackId: string) => (audio: any[], track: any) => {
  if (track.track_id === trackId) return [...audio, updatedTrack];

  return [...audio, track];
};

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
  dispatch: any
) => {
  try {
    const updatedTrack: any = await HTTP.put(FILE_ENDPOINT, {
      track_id: trackId,
    });

    dispatch({
      type: Content,
      payload: <IContentReducerState>(state: any): IContentReducerState => ({
        ...state,
        audio: reduce(findAndReplaceTrack(updatedTrack, trackId), [], state.audio),
        current: updatedTrack,
      }),
    });
  } catch (error) {
    toast(error.message);
  }
};
