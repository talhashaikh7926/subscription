import React from 'react';
import { Helmet } from 'react-helmet';

import '../styles/css/bootstrap.min.css';
import '../assets/vendor/bootstrap-icons/bootstrap-icons.css';
import 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js'
import '../styles/js/bootstrap.bundle.min.js';
import '../styles/css/main.css';



const FontLinks = () => (
    <>
        <Helmet>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
        </Helmet>
    </>
);

export { FontLinks };



