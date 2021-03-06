'use strict';

const NO_GLOBAL_INSTALL_MESSAGE = `
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!! Starting from v2.0.0 publish-please can't be installed globally.          !!
!! Use local installation instead : 'npm install --save-dev publish-please', !!
!! Or use npx if you do not want to install publish-please as a dependency.  !!
!! (learn more: https://github.com/inikulin/publish-please#readme).          !!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
`;

module.exports = function preventGlobalInstall() {
    const getNpmArgs = require('./utils/get-npm-args');
    const npmArgs = getNpmArgs(process.env);
    if (npmArgs.npx) {
        return;
    }
    if (npmArgs['--global']) {
        reportNoGlobalInstall();
        process.exit(1);
    }
};

function reportNoGlobalInstall() {
    try {
        const chalk = require('chalk');
        console.log(chalk.bgRed(NO_GLOBAL_INSTALL_MESSAGE));
    } catch (error) {
        console.log(NO_GLOBAL_INSTALL_MESSAGE);
    }
}
