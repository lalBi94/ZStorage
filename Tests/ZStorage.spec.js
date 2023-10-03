import ZNodes from "../src/ZNodes.js"
import ZStorage from "../src/ZStorage.js"

describe("ZStorage functions", () => {
    it("Initializing list & Getting the root of the list", () => {
        expect(new ZStorage().getRoot())
            .toEqual(new ZNodes(-1))
    })

    it("Pushing & Getting value", () => {
        let l = new ZStorage()
        l.push("lalBi94")

        expect(l.getValueAt(0))
            .toBe("lalBi94")
    })

    it("Breaking the list", () => {
        let l = new ZStorage()
        l.push(-1.1)
        l.push("Lua")
        l.push(false)
        l.push([])
        l.push(0)
        l.push({x:1,y:2})
        l.push([true, null, NaN, 5])

        expect(l.length())
            .toBe(7)

        l.breakAt(3)

        expect(l.length())
            .toBe(4)
    })

    it("Removing first element", () => {
        let l = new ZStorage()
        l.push(-1.1)
        l.push("Lua")
        l.push(false)

        expect(l.length())
            .toBe(3)
        
        let shifted = l.shift()

        expect(l.length())
            .toBe(2)
        expect(l.getValueAt(0))
            .toBe("Lua")
        expect(shifted)
            .toBe(-1.1)
    })

    it("Removing last element", () => {
        let l = new ZStorage()
        l.push(-1.1)
        l.push("Lua")
        l.push(false)

        expect(l.length())
            .toBe(3)

        let poped = l.pop()

        expect(l.length())
            .toBe(2)
        expect(l.getValueAt(l.length()-1))
            .toBe("Lua")
        expect(poped)
            .toBe(false)
    })

    it("Clearing list", () => {
        let l = new ZStorage()
        l.push(-1.1)
        l.push("Lua")
        l.push(false)

        expect(l.length())
            .toBe(3)

        l.clear()

        expect(l.length())
            .toBe(0)
    })

    it("Comparing the equality of 2 lists", () => {
        let l = new ZStorage()
        l.push(-1.1)
        l.push("Lua")
        l.push(5)
        l.push("C")

        let l2 = new ZStorage()
        l2.push(-1.1)
        l2.push("Lua")
        l2.push(5)
        l2.push("C")

        expect(l.equalTo(l2))
            .toBe(true)

        l2.push("43(")

        expect(l.equalTo(l2))
            .toBe(false)
    })

    it("Copying lists", () => {
        let l = new ZStorage()
        l.push("one")
        l.push(2)

        let l2 = new ZStorage()
        l.push(1)
        l.push("two")

        expect(l.equalTo(l2))
            .toBe(false)

        l.copy(l2)

        expect(l.equalTo(l2))
            .toBe(true)
    })

    it("Modifying lists", () => {
        let l = new ZStorage()
        l.push("x")
        l.push("z")
        
        expect(l.getValueAt(0))
            .toBe("x")
        
        l.modifyValueAt(0, "not x")

        expect(l.getValueAt(0))
            .toBe("not x")
    })
})