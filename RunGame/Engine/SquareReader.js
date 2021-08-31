module.exports = class Reader 
{

  constructor(pixels) 
  {
    this.pixels = pixels
  }

  GetCellColor(cell) 
  {
    return this.pixels.colorAt(cell.x, cell.y)
  }

  ConvertCellToInt(cell)
  {
    var color = this.GetCellColor(cell)
    return parseInt(color, 16)
  }

  ConvertHexToDecimal(cell) 
  {
		return this.ConvertCellToInt(cell) / 100000
  }

  ConvertHexCellToString(cell) 
  {

		var color = this.ConvertCellToInt(cell)

		if(color !== 0)
		{

			color = color.toString()
			var word = ''

			for(var i = 0; i < 3; i++)
			{

				var char = color.slice(i * 2, (i + 1) * 2)
				word = word + String.fromCharCode(char)

			}

			word = word.replace('\0', '')

			return word

		} else {
			return ''
		}

  }

}