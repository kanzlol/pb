const robot = require("robotjs")

module.exports = class TurningControl
{

  constructor()
  {
    this.turnTimeout = null
    this.turnKey = null
  }

  DoWeTurn(time, key)
  {

    this.Stop()

    const start = process.hrtime()

    robot.keyToggle(key, "down")
    this.turnKey = key

    this.turnTimeout = setTimeout(() => {

      while(true)
      {
        var difference = process.hrtime(start)

        if(difference[1] > time * 1000000)
          break
      }

      robot.keyToggle(key, "up")
      this.turnTimeout = null

    }, time - 10);

  }

  Turn(time, key)
  {
    this.doWeTurn(time, key)
  }

  Stop()
  {

    if(this.turnTimeout)
    {
      clearTimeout(this.turnTimeout)
      robot.keyToggle(thi.turnKey, "up")
    }

  }

}

