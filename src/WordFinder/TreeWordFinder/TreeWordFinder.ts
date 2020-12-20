import WordFinder from "../../WordFinder";
import Pattern from "../../WordPattern/Pattern";
import WordPatterPair from "../../WordPattern/WordPatternPair";
import SimpleWordFinder from "../SimpleWordFinder/SimpleWordFinder";
import TreeWordFinderNode from "./TreeWordFinderNode";

export default class TreeWordFinder implements WordFinder {

    private root: TreeWordFinderNode

    constructor(wordPatternPairs: WordPatterPair[]) {

        this.root = new TreeWordFinderNode(new SimpleWordFinder(wordPatternPairs))

    }

    findMatches(lettersPattern: Pattern): string[] {

        const matches: string[] = []

        extendsMatchesFromNode(matches, lettersPattern, this.root)

        return matches

    }

}

function extendsMatchesFromNode(
    matches: string[],
    lettersPattern: Pattern,
    node: TreeWordFinderNode
): void {

    if (node.simpleWordFinder !== null) {

        matches.push(...node.simpleWordFinder.findMatches(lettersPattern))

    } else {

        extendsMatchesFromNode(matches, lettersPattern, node.children!.without!)

        if (lettersPattern.letterCount(node.splittingLetter!) > 0) {
            extendsMatchesFromNode(matches, lettersPattern, node.children!.with!)
        }

    }

}