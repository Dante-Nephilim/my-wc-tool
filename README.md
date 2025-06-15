mywc 
=======

A custom implementation of the Unix `wc` command written in TypeScript.


Supports counting lines, words, characters, and bytes from a file.

Installation 
--------------
Clone and link the tool globally:

    git clone https://github.com/your-username/mywc.git
    cd mywc
    npm install
    npm run build
    npm link

Now you can use `mywc` from anywhere in your terminal.

Usage 
--------
    mywc <file-path> [options]

Example:

    mywc src/test.txt

Output:

    FilePath: src/test.txt
    Line Count: 3
    Word Count: 6
    Byte Count: 35
    Char Count: 35

Running Tests 
---------------
    npm test

Development 
--------------
    npm start
    npm run build

Uninstall 
-----------
    npm unlink
