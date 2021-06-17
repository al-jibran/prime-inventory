import React from 'react';
import styled from 'styled-components';

const ToolbarStyle = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;


const Toolbar = ({ component }) => {
    return (
        <ToolbarStyle>
            {component()}
        </ToolbarStyle>

    );
};

export default Toolbar;