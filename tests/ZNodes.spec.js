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

    it("Adding child value in specific node", () => {
        let n = new ZNodes({e:5})
        n.initChild()
        n.pushChild(6)
        n.pushChild(8)

        expect(n.getChild().toString())
            .toBe("<6,8>")
    }) 

    it("Removing child object", () => {
        let n = new ZNodes({e:[3, true]})
        n.initChild()
        n.pushChild({e: 234})
        n.pushChild("salut")
        
        expect(n.getChild().length())
            .toBe(2)

        n.freeChild()
        
        expect(n.getChild().length())
            .toBe(0)
    })
})