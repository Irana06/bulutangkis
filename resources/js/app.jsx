import './bootstrap';
import { createInertiaApp } from '@inertiajs/inertia-react';
import React from 'react';
import { render } from 'react-dom';

createInertiaApp({
    resolve: name => import(`./Src/${name}`),
    setup({ el, App, props }) {
        render(<App {...props} />, el);
    }
})
