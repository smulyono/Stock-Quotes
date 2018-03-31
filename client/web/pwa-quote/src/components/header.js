import React from 'react';
import {
    Navbar,
    NavbarGroup,
    NavbarHeading,
    Alignment,
    NavbarDivider,
    ButtonGroup,
    Button
} from '@blueprintjs/core';

import { IconNames } from '@blueprintjs/icons';


const Header = () => (
    <Navbar className="pt-dark">
        <NavbarGroup align={Alignment.RIGHT}>
            <NavbarHeading title="Stock Quote">
                Stock Quote
            </NavbarHeading>
            <NavbarDivider />
            <ButtonGroup minimal={true}>
                <Button icon={IconNames.REFRESH}></Button>
            </ButtonGroup>
        </NavbarGroup>
    </Navbar>
)


export default Header;
