const robot = require("robotjs")
const pathLibrary = require("path")
const fs = require("fs")
const WalkingControl = require("./walk.js")
const data = require("./GetData")
const TurningControl = require("./turn.js")

data.BeginProcess()
var navVariables = fs.readFileSync(pathLibrary.resolve(__dirname, '../../Database/roamVars.json'))
navVariables = JSON.parse(navVariables)
var turnControl = new TurningControl()
var walk = new WalkingControl()

const filePath = "../../Database/route/"
var ROAMVAR
var currentPoint = 1
var resetRoaming = false
var paused = false
var path = []
var pathX = []
var pathY = []
var direction = []
var zone = []
var previousPath = []
let zoneList = ["ORGRIM", "THUNDE", "DARNAS", "UN'GOR", "SILITH", "LOCH M", "HILLSB", "ALTERA", "WETLAN", "DUN MO"]


exports.SelectPath = function(fileName, reverse)
{

  var myPath = JSON.parse(fs.readFileSync(pathLibrary.resolve(__dirname, filePath + fileName + ".json")))
  if(reverse) 
  {
    //console.log(myPath[fileName].reverse)
    exports.AssignPath(myPath[fileName].reverse)
  }
  else 
  {
    //console.log(myPath[fileName])
    exports.AssignPath(myPath[fileName])
  }

}

exports.AssignPath = function(coords, index = 1)
{
  //console.log(coords)

  robot.setKeyboardDelay(0)
  currentPoint = index
  previousPath = path.slice()
  path.length = 0
  path = coords.slice()

  for(i = 0; i < path.length; i++)
  {
    pathX[i] = path[i][0]
    pathY[i] = path[i][1]
    direction[i] = path[i][2]
    zone[i] = path[i][3]

  }
  
}

exports.WalkTo = function(px, py, acc, callback, ROAMSETTINGS) 
{

  if(ROAMSETTINGS)
  {
    ROAMVAR = ROAMSETTINGS
  }

  walk.StartWalk()

  var distanceAcc = (acc === "fine") ? ROAMVAR.POINT_FINE_DISTANCE_ERROR : ROAMVAR.PONT_DISTANCE_ERROR
  let minTurnTime = (acc === "fine") ? ROAMVAR.MINIMUM_TURN_TIME_MS / 3 : ROAMVAR.MINIMUM_TURN_TIME_MS;


}

exports.Buffs = function()
{
  if(100 * data.info.manaCurrent / data.info.manaMax > 80)
  {
    if(data.info.combatStatus == 0 && data.info.classBuffs == 0)
    {
      robot.keyTap("3")
    }
  }

}



exports.WalkPath = function(callback)  {
  


}



//console.log(pathX, pathY, direction, zone)
