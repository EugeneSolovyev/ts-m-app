import HTTP from "../../common/api";
import { getTracks } from "../../actions/content"


export const getAllMusic = () => {
    return (dispatch: any) => {
        const GET_ALL_TRACKS = "/music-service/file";
        HTTP.get(GET_ALL_TRACKS).then((res) => {
            dispatch(getTracks(res));
        });
    };
};