<p align="center">
<img src="screenshots/yugioh_screen.png" /><br>
</p>

# Yu-Gi-Oh multiplayer web game & framework - Developing

Author: Ruiqi (Ricky) Peng

A realization of the popular trading card game - yugioh on web using React + Node. The project includes a completely remade engine to contain the game logic, a multiplayer functionality using websocket, and interfaces to create custom cards using Javascript. 

That's right, no ygocore and its Lua card scripts but a completely new Yugioh simulator written in Javascript. You can also access its desktop version just by wrapping the source code with some simple tweaks using Electron (just git checkout the `electron` branch lol)!

## Installation & How to run
```
git clone https://github.com/rickypeng99/yugioh_web_server.git
cd /yugioh_web_server
node index.js

git clone https://github.com/rickypeng99/yugioh_web.git
```
Open two terminal windows up and run the following in each of them
```
npm start
```
GLHF!

## Works done (As of April 17th 2021):
 - Multiplayer: You can play this game against other players online! (Not actually cuz I haven't deployed my node.js code yet but you can checkout [ygo_web_server](https://github.com/rickypeng99/yugioh_web_server))
 - Playmat: You can flip the playmat around x-axis, move it to different directions and change its size.
 - Detail: You can view a particular card's detail concisely in the left panel
 - Summoning monsters: Now supports normal, set and tribute summons!
 - Phase changing: Complete and synchronous phase changing between the two players
 - Health bar: Yea it's functioning during battles
 - Effect: Partially developed; I have designed and implemented the basic effect activation & chaining logics between two players (Here is the screen capture of me using polymerization!)
 ![](screenshots/yugioh_fusion.gif)
 - Battle: Complete support and animation of all kinds of battles
 ![](screenshots/yugioh5.gif)



 ## Outdated recording of an early version
  (I am too lazy to prvide a Gif of every aspect of the current gameplay. You can access more screenshots of early versions in the `screenshots` folder tho)
  ![](screenshots/yugioh.gif)
