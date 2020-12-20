import SimpleWordFinder from "./WordFinder/SimpleWordFinder/SimpleWordFinder";
import {performance} from 'perf_hooks'
import {readFileSync} from 'fs'
import WordPatterPair from "./WordPattern/WordPatternPair";
import Pattern from "./WordPattern/Pattern";
import TreeWordFinder from "./WordFinder/TreeWordFinder/TreeWordFinder";

function readWordPatterPairs(): WordPatterPair[] {

    // const filePath = 'C:\\Users\\User\\Documents\\StaticTypingProjects\\1_WordFinding\\data\\corncob_lowercase.txt'
    const filePath = __dirname + '/../data/words_corrected.txt'

    return readFileSync(filePath)
        .toString()
        .split('\n')
        .map(x => x.trim())
        .map(x => ({
            word: x,
            pattern: new Pattern(x)
        }))

}

const y = readWordPatterPairs()

let wf1 = new SimpleWordFinder(y)

let wf2 = new TreeWordFinder(y)

let wordPatter = new Pattern('humanoid')

let t1 = performance.now()
console.log(wf1.findMatches(wordPatter).sort())
console.log(performance.now() - t1)

t1 = performance.now()
console.log(wf2.findMatches(wordPatter).sort())
console.log(performance.now() - t1)