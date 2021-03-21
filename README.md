<p align="center">
<img src="screenshots/yugioh_screen.png" /><br>
</p>

# Yu-Gi-Oh multiplayer web game & framework - Developing

Author: Ruiqi (Ricky) Peng - (Yes please if your team is hiring entry level front-end/full stack SDEs and you think that this project is cool please feel free to reach me at rickypeng99@gmail.com; I need a job pls thank you mister)

A realization of the popular trading card game - yugioh on web using React + Node. The project includes a completely remade engine to contain the game logic, a multiplayer functionality using websocket, and interfaces to create custom cards using Javascript. 

That's right, no ygocore and its Lua card scripts but a completely new Yugioh simulator written in Javascript. You can also access its desktop version just by wrapping the source code with some simple tweaks using Electron (just git checkout the `electron` branch lol)!

## Works done (As of March 21st 2021):
 - Multiplayer: You can play this game against other players online! (Not actually cuz I haven't deployed my node.js code yet and I didn't open source the server side as well)
 - Playmat: You can flip the playmat around x-axis, move it to different directions and change its size.
 - Detail: You can view a particular card's detail concisely in the left panel
 - Summoning monsters: Now supports normal, set and tribute summons!
 - Phase changing: Complete and synchronous phase changing between the two players
 - Health bar: Yea it's functioning during battles
 - Effect: Developing (This is a hardass I will need to spend extensive time working on this one)

 (I am too lazy to prvide a Gif of the actual gameplay. You can access screenshots of early versions in the `screenshots` folder tho)