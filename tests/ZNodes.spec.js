import ZNodes from "../src/ZNodes.js"

describe("ZNodes", () => {
    it("Checking equality", () => {
        let n = new ZNodes(5)
        let n2 = new ZNodes(6)

        expect(n.equals(n2))
            .toBe(false)
    })

    it("Breaking and Getting next nodes, Setting a new node, ", () => {
        let n = new ZNodes("fes")
        let n2 = new ZNodes(5)
        let n3 = new ZNodes(5.5)

        n.setNext(n2)
        n2.setNext(n3)

        expect(n.getNext().getNext().getValue())
            .toBe(5.5)

        n2.breakNext()

        expect(n.getNext().getNext())
            .toBe(null)
    })
})