import React, {useRef} from 'react';
import {AdditionalControlView} from './styles';

import {Slider} from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import {makeStyles} from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';

interface IAdditionalControlProps {
    volume: number;
    loop?: boolean;

    onChange(value: any): void;

    onToggleLoop(): void;
}

const useStyles = makeStyles({
    root: {
        height: 150,
        paddingTop: 10,
        paddingBottom: 10,
    },
});

const AdditionalControl = ({volume, onChange, loop = false, onToggleLoop}: IAdditionalControlProps) => {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const handleChangeVolume = (event: any, newValue: any) => {
        onChange(newValue)
    };
    return (
        <AdditionalControlView loop={loop}>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <div className={classes.root}>
                    <Slider
                        value={volume}
                        onChange={handleChangeVolume}
                        orientation="vertical"
                        aria-labelledby="vertical-slider"
                    />
                </div>
            </Popover>
            <IconButton
                children={<VolumeUpIcon/>}
                onClick={handleClick}
                color='inherit'
            />
        </AdditionalControlView>
    );
};

export default AdditionalControl;
