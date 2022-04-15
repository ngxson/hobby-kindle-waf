# ReactJS Kindle WAF

Building applications for Kindle has never been that easy.

In the past, people used to build Kindle booklets on Java. This is complicated because they need to deal with jar signing problems. Now with ReactJS, you can build simple applications faster and easier.

> WAF presumably standing for Web Application Framework, in this directory you can find quite a few applications -- most notably, the built-in experimental browser can be found there... Some WAFs are composed of a simple config.xml with reference to a source URL.

To get started, see [boilerplate](boilerplate)

Download KUAL extension file for this demo: [Go to release](https://github.com/ngxson/hobby-kindle-waf/releases)

<p float="left">
  <img src="https://raw.githubusercontent.com/ngxson/hobby-kindle-waf/master/assets/1650011518.png" width="40%">
  <img src="https://raw.githubusercontent.com/ngxson/hobby-kindle-waf/master/assets/1650011534.png" width="40%">
</p>

# FAQ

- Why?  
Many system "apps" in newest Kindle firmware are written on javascript. Then why not?  
(Fact: even the Experimental Web Browser itself is written in JS)
- But JS is slow!  
I understand. Although there're more native solutions like C (using cross GCC compiler) or LuaJIT (by that, I really appreciate NiLuJe's works) that allow good performance, they are hard for beginners who want to build simple apps.  
Also, while ReactJS is the most famous web framework, there are many resources/demo apps that can be ported to the Kindle.
- Great! So that means we can use all modern web features?  
Not all of them... Please have a look at the [boilerplate](boilerplate) limitations.
- So, what are posible apps?  
I'm planning on implementing some games like **chess** (because most existing chess apps, both X11 and Booklet version, don't work anymore on new firmware verions), **sudoku** (half of the code has been shown on the [boilerplate](boilerplate)), **card games** like Solitaire or even Poker, **minesweeper** and many more.  
Also some utilities like **scientific calculator**, **todo list** (maybe using Trello API), **calendar app**,... are also possible thanks to the support of XHR (this implies `axios` should work fine)

# Author

This project is made by [ngxson](https://ngxson.com)
