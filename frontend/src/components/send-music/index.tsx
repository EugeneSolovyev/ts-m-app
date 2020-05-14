import React from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import { WrappedForm } from './style';
import { Formik, FormikProps } from 'formik';
import { loadMusic } from "../../actions/user";

interface IFormikValues {
    author: string;
    title: string;
    type: string;
}

const SendMusic = () => {
    const picture = React.useRef(null);
    const music = React.useRef(null);
    const InitialValues: IFormikValues = {
        author: '',
        title: '',
        type: ''
    }

    const handleSubmit = (values: IFormikValues) => {
        
        const data = {
            "author": values.author,
            "track": music.current.files[0],
            "title": values.title,
            "type": values.type,
            "cover": picture.current.files[0]
        }
        loadMusic(data)
    }

    return (
        <Formik
            initialValues={InitialValues} 
            onSubmit={handleSubmit}
        >
            {({ values, handleChange }: FormikProps<IFormikValues>) => (
                <WrappedForm>
                    <Typography variant="h1">Load music</Typography>
                    <TextField value={values.author} fullWidth name="author" label="Author" onChange={handleChange} variant="outlined" placeholder="Enter author"/>
                    <TextField value={values.title} fullWidth name="title" label="Title" onChange={handleChange} variant="outlined" placeholder="Enter title"/>
                    <TextField value={values.type} fullWidth name="type" label="Type" onChange={handleChange} variant="outlined" placeholder="Enter type"/>
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
                        accept="music/*"
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
                    <Button fullWidth type="submit" variant="outlined" color="primary">Send</Button>
                </WrappedForm>
            )}
        </Formik>
      )
};

export default SendMusic