class Card {

  #intervalBetweenColumns
  #rowLength
  #grid

  constructor(args) {
    const { intervalBetweenColumns, rowLength } = args;
    this.#intervalBetweenColumns = intervalBetweenColumns;
    this.#rowLength = rowLength;
    this.setGrid()
  }

  setGrid = () => {
    const card = Array.from('BINGO', () => Array.from(new Array(( this.#rowLength ))))
    const center = { col: ~~(card.length / 2), row: ~~(card[0].length / 2)}

    for(let col=0; col < card.length; col++){
      for(let row=0; row < card[col].length; row++){
        const lowerBound = (this.#intervalBetweenColumns * col) + 1;
        const upperBound = (this.#intervalBetweenColumns * col) + this.#intervalBetweenColumns;

        while(true){
          const option = this.#randBetween(lowerBound, upperBound);
          if(!card[col].includes(option)){
            card[col][row] = option;
            break;
          }
        }

        if(col == center.col && row == center.row){
          card[col][row] = "FREE"
        }
      }
    }
    this.#grid = card
  }

  #randBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  #flattern = () => {
    return this.#grid.flat().filter(option => option !== 'FREE')
  }

  getGrid = () => {
    return this.#grid;
  }

  isWinner = (calls) => {
    const options = this.#flattern()
    return options.every(option => calls.includes(option))
  }

}

module.exports = Card