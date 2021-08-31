const robot = require("robotjs");
const WalkControl = require("./RunGame/Engine/walk.js")
const data = require("./RunGame/Engine/GetData.js");
const roam = require("./RunGame/Engine/roam");

var walk = new WalkControl()
robot.moveMouse(500, 500)
robot.mouseClick()
var running
var runLoop

exports.Start = function() {
  running = true
  if(running) 
  {
    roam.SelectPath("RazorHillToOrgrimmar")
		roam.Buffs()
    roam.WalkPath(() => {
      console.log("finished walking")    
    })

    runLoop = setTimeout(() => {
      exports.Start()
    }, 500);

  }
  else {
    return
  }
  
}

exports.StopLoop = function()
{
  clearTimeout(runLoop)
  running = false
}

