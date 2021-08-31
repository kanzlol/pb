const robot = require("robotjs")
const path = require("path")
const fs = require("fs")
const reader = require("./SquareReader")

exports.BeginProcess = function() 
{
  
	var file = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../Database/coords/frameCoordinates.json')))

	var mapXMin = Infinity
	var mapYMin = Infinity
	var mapXMax = 0
	var mapYMax = 0

	for(i = 0; i < file.length; i++) 
	{
		
		if(file[i].x > mapXMax)
		mapXMax = file[i].x + 1;
		
		if(file[i].y > mapYMax)
		mapYMax = file[i].y + 1;
		
		if(mapXMin > file[i].x)
		mapXMin = file[i].x - 1;
		
		if(mapYMin > file[i].y)
		mapYMin = file[i].y - 1;  
		
		//console.log(mapXMax, mapYMax, mapXMin, mapYMin)
	}

	var xcoord, ycoord, metaData, zone, direction, targetHealth, targetIsDead, target, targetInCombat, playerInCombat, healthCurrent, healthMax, manaCurrent, 
	manaMax, level, range, gold, needHealth, needMana, classBuffs, combatStatus
	var fullBags, brokenItems
	setInterval(() =>
	{
		
		this.info = {
			xcoord: xcoord,
			ycoord: ycoord,
			metaData: metaData,
			zone: zone,
			direction: direction,
			targetHealth: targetHealth,
			targetIsDead: targetIsDead,
			target: target,
			targetInCombat: targetInCombat,
			playerInCombat: playerInCombat,
			healthCurrent: healthCurrent,
			healthMax: healthMax,
			manaCurrent: manaCurrent,
			manaMax: manaMax,
			level: level,
			range: range,
			gold: gold,
			needHealth: needHealth,
			needMana: needMana,
			fullBags: fullBags,
			brokenItems: brokenItems,
			classBuffs: classBuffs,
			combatStatus: combatStatus
		
		}
		
	})

	setInterval(() =>
	{
		
		var dataBitmap = robot.screen.capture(mapXMin, mapYMin, mapXMax, mapYMax)
		let rd = new reader(dataBitmap)

		xcoord = rd.ConvertHexToDecimal(file[1]) * 10
		ycoord = rd.ConvertHexToDecimal(file[2]) * 10
		direction = rd.ConvertHexToDecimal(file[3])
		zone = rd.ConvertHexCellToString(file[5])
		healthMax = rd.ConvertCellToInt(file[10])
		healthCurrent = rd.ConvertCellToInt(file[11])
		classBuffs = rd.ConvertCellToInt(file[41])
		combatStatus = rd.ConvertCellToInt(file[42])
		manaMax = rd.ConvertCellToInt(file[12])
		manaCurrent = rd.ConvertCellToInt(file[13])


	});

	// setInterval(() =>
	// {
	//   console.log("xcoord:", this.info.xcoord)
	//   console.log("ycoord:", this.info.ycoord)
	//   console.log("direction:", this.info.direction)
	// }, 1000)

    
  

}