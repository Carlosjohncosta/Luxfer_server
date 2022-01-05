# CHANGE LOG

## 05/01/2022
- Made a template for worksheet cover page.
- Side bar HTML is now sent from server to avoid needing to update it on multiple pages.
- As was done above, the same will be done for all worksheet related items.
- Fixed some bugs with login and authentication.

## 29/11/2021 12:15
- Added Admin route.
- Added more functionality to get files api.

## 26/11/2021 16:02
- Added a simple file system for each user.
- Did a little more code cleanup.

## 26/11/2021 09:54
- Added some more authentication
- Added routes to seperate file to clean up index.
- Added more secure SQL and secret key.

## 25/11/2021 17:16
- Added api to get pucblic user info, middleware is for private and public info (password, uuid.)
- Slight UI adjustment.

## 25/11/2021 13:42
- Added user_info middleware.
- Added extra authentication

## 25/11/2021 10:08
- Added get_file to api and added table display function (CSV only).

## 24/11/2021 14:03
- Added some basic authentication using express-session.

## 24/11/2021 10:41
- Auth and add new user now working with server (Yayy!)

## 24/11/2021 08:49
- Added supprt for sql server.
- Added config file for database (Will add parameters for connecting to different databases on same server.)

## FIRST ENTRY
- Added new paths for scripts, styles, and API.
- Now using Bcrypt to hash passwords.
- Added change log.
- Added CSV reader to api.
