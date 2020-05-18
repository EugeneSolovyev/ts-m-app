import React from "react";
import { head } from 'ramda'
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
import { uploadMusic } from "../../actions/content";

interface ISendMusicProps {
    uploadMusic: Function
}

interface IFormikValues {
  author: string;
  title: string;
  type: string;
}

const InitialValues: IFormikValues = {
    author: "",
    title: "",
    type: "",
  };

const SendMusic = ({ uploadMusic }: ISendMusicProps) => {
  const picture = React.useRef(null);
  const music = React.useRef(null);

  const handleSubmit = async (values: IFormikValues): Promise<void> => {
    await uploadMusic({
      ...values,
      track: head(music.current.files),
      cover: head(picture.current.files),
    });
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
              <option value={"music"}>Music</option>
              <option value={"book"}>Book</option>
              <option value={"podcast"}>Podcast</option>
            </Select>
          </FormControl>
          <input
            accept="image/*"
            className="input"
            id="contained-button-file"
            multiple
            type="file"
            ref={picture}
          />
          <label className="picture" htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
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
            <Button variant="contained" color="secondary" component="span">
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
