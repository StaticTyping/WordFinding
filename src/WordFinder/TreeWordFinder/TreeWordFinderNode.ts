import SimpleWordFinder from "../SimpleWordFinder/SimpleWordFinder";

export interface TreeWordFinderNodeChildren {
    with: TreeWordFinderNode | null
    without: TreeWordFinderNode | null
} 

export default class TreeWordFinderNode {

    simpleWordFinder: SimpleWordFinder | null

    splittingLetter: string | null

    children: TreeWordFinderNodeChildren | null

    constructor(simpleWordFinder: SimpleWordFinder) {

        this.simpleWordFinder = simpleWordFinder

        this.splittingLetter = null

        this.children = null

        this.branch()

    }

    private branch(): void {

        if (this.split()) {
            this.children!.with!.split()
            this.children!.without!.split()
        }

    }

    private split(): boolean {

        const finderSplit = this.simpleWordFinder?.bestSplit()

        if (finderSplit && finderSplit.with.size() >0 && finderSplit.without.size() > 0) {

            this.simpleWordFinder = null

            this.splittingLetter = finderSplit.letter

            this.children = {
                with: new TreeWordFinderNode(finderSplit.with),
                without: new TreeWordFinderNode(finderSplit.without)
            }

            return true

        }

        return false

    }

}