import React from "react";
import { head } from "ramda";
import {
  TextField,
  Button,
  Typography,
  InputLabel,
  FormControl,
  Select,
} from "@material-ui/core";
import { bindActionCreators } from "redux";
import { WrappedForm } from "./style";
import { Formik, FormikProps } from "formik";
import { connect } from "../../helpers/connect";
import { uploadMusic, getTypes } from "../../actions/content";
import { useAsync } from "react-use";

interface ISendMusicProps {
  uploadMusic: Function;
}

interface IFormikValues {
  author: string;
  title: string;
  type: string;
  album: string;
}

const InitialValues: IFormikValues = {
  author: "",
  title: "",
  type: "",
  album: "",
};

const SendMusic = ({ uploadMusic }: ISendMusicProps) => {
  const picture = React.useRef(null);
  const music = React.useRef(null);
  const [types, setTypes] = React.useState([]);
  const [genres, setGenres] = React.useState([]);
  useAsync(async () => {
    const data: any = await getTypes();
    setTypes(data)
  }, []);

  const handleSubmit = async (values: IFormikValues): Promise<void> => {
    await uploadMusic({
      ...values,
      genres: genres,
      track: head(music.current.files),
      cover: head(picture.current.files),
    });
  };

  const handleOnAddGenge = () => {
    setGenres([...genres, '' ]);
  };

  const handlerDeleteGenre = (index: any) => {
    setGenres([...genres.filter((item, i) => i !== index)]);
  };

  const handleInputChange = (index: number, event: any) => {
    setGenres([...genres.map((item, number) => number === index ? event.target.value : item )]);
  };

  return (
    <Formik initialValues={InitialValues} onSubmit={handleSubmit}>
      {({ values, handleChange }: FormikProps<IFormikValues>) => (
        <WrappedForm>
          <Typography variant="h1">Upload music</Typography>
          <TextField
            value={values.author}
            fullWidth
            name="author"
            label="Author"
            onChange={handleChange}
            variant="outlined"
            placeholder="Enter author"
          />
          <TextField
            value={values.title}
            fullWidth
            name="title"
            label="Title"
            onChange={handleChange}
            variant="outlined"
            placeholder="Enter title"
          />
          <TextField
            value={values.album}
            fullWidth
            name="album"
            label="Album"
            onChange={handleChange}
            variant="outlined"
            placeholder="Enter album"
          />
          <FormControl variant="filled">
            <InputLabel htmlFor="filled-age-native-simple">Type</InputLabel>
            <Select
              native
              value={values.type}
              onChange={handleChange}
              inputProps={{
                name: "type",
                id: "type-music",
              }}
            >
              <option aria-label="None" value="" />
              {types.map((type) => {
                return (
                  <option key={type.id} value={type.id}>
                    {type.title}
                  </option>
                );
              })}
            </Select>
          </FormControl>
          <Button
            className="button"
            onClick={handleOnAddGenge}
            variant="outlined"
            color="secondary"
          >
            Add item
          </Button>
          {genres.map((item, index) => {
            return (
              <div key={index}>
                <TextField
                  name="genre"
                  value={item}
                  label="Genre"
                  onChange={(event) => handleInputChange(index, event)}
                  variant="outlined"
                  placeholder="Enter genre"
                />
                <Button
                  className="button"
                  onClick={() => {
                    handlerDeleteGenre(index);
                  }}
                  variant="outlined"
                  color="primary"
                >
                  Delete genre
                </Button>
              </div>
            );
          })}
          <input
            accept="image/*"
            className="input"
            id="contained-button-file"
            multiple
            type="file"
            ref={picture}
          />
          <label className="picture" htmlFor="contained-button-file">
            <Button
              className="upload"
              variant="contained"
              color="primary"
              component="span"
            >
              Upload Cover
            </Button>
          </label>
          <input
            accept="audio/*"
            className="input"
            id="contained-button-filed"
            multiple
            type="file"
            ref={music}
          />
          <label htmlFor="contained-button-filed">
            <Button
              className="upload"
              variant="contained"
              color="secondary"
              component="span"
            >
              Upload Audio
            </Button>
          </label>
          <Button fullWidth type="submit" variant="outlined" color="primary">
            Send
          </Button>
        </WrappedForm>
      )}
    </Formik>
  );
};
export default connect(null, (dispatch) =>
  bindActionCreators(
    {
      uploadMusic,
    },
    dispatch
  )
)(SendMusic);