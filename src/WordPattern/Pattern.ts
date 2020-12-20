export default class Pattern {

    private letterCountMap: {[letter: string]: number | undefined}

    constructor(letters: string) {
        
        this.letterCountMap = {}

        for (let letter of letters) {
            this.addLetter(letter)
        }

    }

    letterCount(letter: string): number {
        return letter in this.letterCountMap ? this.letterCountMap[letter]! : 0
    }

    letters(): string[] {
        return Object.keys(this.letterCountMap)
    }

    contains(other: Pattern): boolean {

        for (let letter of other.letters()) {

            if (other.letterCount(letter) > this.letterCount(letter)) {
                return false
            }
            
        }

        return true

    }

    private addLetter(letter: string): void {

        if (letter in this.letterCountMap) {

            this.letterCountMap[letter]! += 1

        } else {
            
            this.letterCountMap[letter] = 1

        }

    }

}