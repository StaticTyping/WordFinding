import WordFinder from '../../WordFinder'
import Pattern from '../../WordPattern/Pattern'
import WordPatternPair from '../../WordPattern/WordPatternPair'


export default class SimpleWordFinder implements WordFinder {

    private wordPatternPairList: WordPatternPair[]

    constructor(wordPatternPairs: WordPatternPair[]) {
        this.wordPatternPairList = wordPatternPairs
    }

    findMatches(lettersPattern: Pattern): string[] {

        return this.wordPatternPairList
            .filter(x => lettersPattern.contains(x.pattern))
            .map(x => x.word)

    }

    size(): number {
        return this.wordPatternPairList.length
    }

    bestSplit(): {
        letter: string,
        with: SimpleWordFinder,
        without: SimpleWordFinder
    } {

        const split = findBestSplit(this.wordPatternPairList)

        return {
            letter: split.letter,
            with: new SimpleWordFinder(split.with),
            without: new SimpleWordFinder(split.without)
        }

    }

}

const letters: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z']

type WordPatternPairSplit = {
    letter: string
    with: WordPatternPair[]
    without: WordPatternPair[]
}

function findBestSplit(
    wordPatternPairs: WordPatternPair[]
): WordPatternPairSplit {

    const bestSplit = letters
        .map(letter => ({
            letter: letter,
            splitSize: splitingSize(letter, wordPatternPairs)
        }))
        .reduce((a, b) => a.splitSize < b.splitSize ? a : b)

    return split(bestSplit.letter, wordPatternPairs)

}

function split(
    letter: string,
    wordPatternPairs: WordPatternPair[]
): WordPatternPairSplit {

    const split: WordPatternPairSplit = {
        letter: letter,
        with: [],
        without: []
    }

    wordPatternPairs
        .forEach(x => {
            if (x.pattern.letterCount(letter) > 0) {
                split.with.push(x)
            } else {
                split.without.push(x)
            }
        })

    return split

}

function splitingSize(
    letter: string,
    wordPatternPairs: WordPatternPair[]
): number {

    const countMap = {
        with: 0,
        without: 0
    }

    wordPatternPairs
        .forEach(wlp => {
            if (wlp.pattern.letterCount(letter) > 0) {
                countMap.with++
            } else {
                countMap.without++
            }
        })

    return Math.max(countMap.with, countMap.without)

}
