
const template = require('templates');

module.exports = page => {
    const res = /*HTML*/
    `
    <!DOCTYPE html>

    <html lang="en">
        <head>

            <script type="text/javascript" src="scripts/jquery.js"></script>
            <script type="text/javascript" src="scripts/scripts.js"></script>
            <script type="text/javascript" src="scripts/jquery.csv.min.js"></script>

            <link rel="stylesheet" href="styles/main_styles.css">
            <link rel="stylesheet" href="styles/buildsheet_cover.css">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik">

            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">

            <title>Work Sheets</title>

        </head>

        <body onload="${template[page].reqScripts}">

            <nav id ="main_nav">

                <div id="logo_container">
                    <img id="logo" src="icons/luxfer.jpg" width="100" height="100">
                </div>

            </nav>

            <div id="body_wrapper">
                
                <header>
                    <h4>Not sure what to put up here</h4>
                </header>

                <div id="top_bar">
                    <p id="email"></p>
                    <p id="username"></p>
                </div>

                <main>
                    <h2>${template[page].contentHeader}</h2>
                    <div id="content_wrapper">
                        <div id="inner_content_wrapper" style="display: block">
                            ${template[page].content}
                        </div>
                    </div>
                </main>
            </div>

        </body>

    </html>
    `
}