import React from 'react';
import styled from 'styled-components/native';

const ToolbarStyle = styled.View`
    flex-direction: row;
    justify-content: ${props => props.justifyItems || 'space-between'};
`;


const Toolbar = ({ items, justifyItems }) => {
    return (
        <ToolbarStyle justifyItems={justifyItems}>
            {items()}
        </ToolbarStyle>

    );
};

export default Toolbar;