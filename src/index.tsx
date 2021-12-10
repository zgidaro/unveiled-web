import React from 'react';
import ReactDOM from 'react-dom';
import { Home } from './components/Home/Home';
import { createTheme } from '@fluentui/style-utilities';
import { ThemeProvider } from '@fluentui/react';
import palette from './theme.json';

import './index.scss';

const unveiledTheme = createTheme({ palette });

ReactDOM.render(
    <ThemeProvider theme={unveiledTheme}>
        <Home />
    </ThemeProvider>,
    document.getElementById('root')
);