# CarbonReader - Multiverse Final Project

## What it is

CarbonReader is a remote file system viewer to allow for easier access to the files you need when you need them
Left a note on your computer and need to read it? Forgot to commit a file before leaving work? Just hop onto whatever domain you host on and access anything you need from the comfort of any computer you need it

## How to use it

1. Clone CarbonReader to the computer you plan on using it from
2. Create a file named .env.local (or copy .env.example as .env.local)
3. Enter a field for PASSWORD (PASSWORD="X")
4. Optionally enter a field for the rootPath where you want the app to start from (rootPath="X")
5. Install dependencies, build, and start using `yarn && yarn build && yarn start`
6. Optionally set up hosting through whatever service you would like
7. You're done! Feel free to use it however you'd like!

## Next Steps

Unfortunately sometimes life gets in the way of your plans, and this was one of those times. Unfortunately I wasn't able to get nearly as much done on this project as I would have liked.

Were I to continue development, I would add the following features:

- I/O
  - File Upload
  - File Download
  - File Delete
- Password Hashing to avoid storing plaintext
- Editing Files
- Syntax highlighting for code
