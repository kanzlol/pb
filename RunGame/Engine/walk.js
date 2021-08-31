const robot = require("robotjs")

module.exports = class WalkingControl 
{

  constructor()
  {
    this.w = false
    this.s = false
  }

  StartWalk()
  {

    if(this.s)
    {
      robot.keyToggle("s", "up")
    }

    if(!this.w)
    {
      robot.keyToggle("w", "down")
    }

    this.w = true
    this.s = false
    
  }

  wWlkBacwkards()
  {

    if(this.w)
    {
      robot.keyToggle("w", "up")
    }

    if(!this.s)
    {
      robot.keyToggle("s", "down")
    }

    this.s = true
    this.w = false

  }

  StopWalking()
  {

    if(this.w || this.s)
    {
      robot.keyToggle("w", "up")
      robot.keyToggle("s", "up")
    }

    this.s = false
    this.w = false

  }

}