import HTTP from "../../common/api";
import { getTracks } from "../../actions/content"
import { toast } from "react-toastify";
import { path } from 'ramda';

const LOADING_MUSIC_ENDPOINT: string = "/music-service/file";
const DUPLICATE_ERROR_CODE = 11000

export const getAllMusic = () => {
    return (dispatch: any) => {
        const GET_ALL_TRACKS = "/music-service/file";
        HTTP.get(GET_ALL_TRACKS).then((res) => {
            dispatch(getTracks(res));
        });
    };
};

export const loadMusic = async (tracks: any): Promise<Error | void> => {
    const formData = new FormData();
    Object.keys(tracks).forEach((key: string) => {
        formData.append(key, tracks[key])
      })
    try {
        const { response }: any = await HTTP.post(LOADING_MUSIC_ENDPOINT, formData);
        const isDuplicate: boolean = path(['data', 'error', 'code'], response) === DUPLICATE_ERROR_CODE
        if(isDuplicate){
            toast.error("Duplicate track")
            return
        } 
        toast.success("Success")
    } catch (error) {
        toast.error(error.message);
    }
};