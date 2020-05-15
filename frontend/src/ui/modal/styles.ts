import styled from 'styled-components'
import { MODAL_SIZE, SizeType } from './constants'

interface IStylesProps {
    size: SizeType;
    show: boolean;
}

export default styled.div<IStylesProps>`
    width: 100%;
    height: 100vh;
    z-index: 100;
    background-color: rgba(0,0,0, .5);
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    display: ${({ show }) => show ? 'block' : 'none'};

    transition: display .5s ease-out;

    .modal-view-wrapper {
        width: ${({ size }) => MODAL_SIZE[size]};
        height: auto;
        position: absolute;
        top: calc(50vh - 606px / 2);
        left: calc(50% - ${({ size }) => MODAL_SIZE[size]} / 2);
        background: white;
        border-radius: 4px;
        white-space: pre-wrap;
        overflow-wrap: break-word;
        hyphens: auto;
    }

    .modal-view-header {
        padding: 0.5rem 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(52, 73, 94, .5);
    }

    .modal-view-title {
        text-transform: capitalize;
        line-height: 1.2;
    }
    
    .modal-view-body {
        padding: 1rem;
    }

    .modal-view-btn {
        background-color: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        margin-left: auto;
    }
`