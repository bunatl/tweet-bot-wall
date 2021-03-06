import React from 'react';

const footer = () => {
    return (
        <footer>
            <div>Developed by <a href="https://github.com/bunatl" target="_blank" rel="noopener noreferrer">Lukas Bunat</a> using <a href="https://www.geeksforgeeks.org/mern-stack/" target="_blank" rel="noopener noreferrer"> MERN stack</a> with ❤</div>
            <div>Source code is hosted on <a href="https://github.com/bunatl/CurrencyConverter">GitHub</a>.</div>
            <div>&copy; All Rights Reserved</div>
            <div>2020{ (new Date().getFullYear()) === 2020 ? "" : "-" + (new Date().getFullYear()) }</div>
        </footer>
    );
};

export default footer;