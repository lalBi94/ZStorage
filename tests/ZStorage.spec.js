import ZNodes from "../src/ZNodes.js";
import ZStorage from "../src/ZStorage.js";

describe("ZStorage functions", () => {
    it("Initializing list & Getting the root of the list", () => {
        expect(new ZStorage().getRoot()).toEqual(new ZNodes(-1));
    });

    it("Pushing & Getting value", () => {
        let l = new ZStorage();
        l.push("lalBi94");

        expect(l.getValueAt(0)).toBe("lalBi94");
    });

    it("Breaking the list", () => {
        let l = new ZStorage();
        l.push(-1.1);
        l.push("Lua");
        l.push(false);
        l.push([]);
        l.push(0);
        l.push({
            x: 1,
            y: 2
        });
        l.push([true, null, NaN, 5]);

        expect(l.length()).toBe(7);

        l.breakAt(3);

        expect(l.length()).toBe(4);
    });

    it("Removing first element", () => {
        let l = new ZStorage();
        l.push(-1.1);
        l.push("Lua");
        l.push(false);

        expect(l.length()).toBe(3);

        let shifted = l.shift();

        expect(l.length()).toBe(2);
        expect(l.getValueAt(0)).toBe("Lua");
        expect(shifted).toBe(-1.1);
    });

    it("Removing last element", () => {
        let l = new ZStorage();
        l.push(-1.1);
        l.push("Lua");
        l.push(false);

        expect(l.length()).toBe(3);

        let poped = l.pop();

        expect(l.length()).toBe(2);
        expect(l.getValueAt(l.length() - 1)).toBe("Lua");
        expect(poped).toBe(false);
    });

    it("Clearing list", () => {
        let l = new ZStorage();
        l.push(-1.1);
        l.push("Lua");
        l.push(false);

        expect(l.length()).toBe(3);

        l.clear();

        expect(l.length()).toBe(0);
    });

    it("Comparing the equality of 2 lists", () => {
        let l = new ZStorage();
        l.push(-1.1);
        l.push("Lua");
        l.push(5);
        l.push("C");

        let l2 = new ZStorage();
        l2.push(-1.1);
        l2.push("Lua");
        l2.push(5);
        l2.push("C");

        expect(l.equalTo(l2)).toBe(true);

        l2.push("43(");

        expect(l.equalTo(l2)).toBe(false);
    });

    it("Copying lists", () => {
        let l = new ZStorage();
        l.push("one");
        l.push(2);

        let l2 = new ZStorage();
        l.push(1);
        l.push("two");

        expect(l.equalTo(l2)).toBe(false);

        l.copy(l2);

        expect(l.equalTo(l2)).toBe(true);
    });

    it("Modifying lists", () => {
        let l = new ZStorage();
        l.push("x");
        l.push("z");

        expect(l.getValueAt(0)).toBe("x");

        l.modifyValueAt(0, "not x");

        expect(l.getValueAt(0)).toBe("not x");
    });

    it("Connecting 2 lists", () => {
        let l = new ZStorage();
        l.push(5);
        l.push("sayo");

        let l2 = new ZStorage();
        l2.push(8.8);
        l2.push({
            e: 4
        });

        expect(l.length()).toBe(2);

        l.connect(l2);

        expect(l.length()).toBe(4);
    });

    it("Converting chain list to a natural {Array}", () => {
        let l = new ZStorage();
        l.push(85);
        l.push({
            i: 5,
            j: 6
        });
        l.push([true, 5, "c", {
            e: 5
        }]);

        expect(l[0]).toBe(undefined);

        let toArray = l.toArray();

        expect(toArray[1]).toEqual({
            i: 5,
            j: 6
        });
    });

    it("Getting all of the index of value exclude {} and []", () => {
        let l = new ZStorage();
        l.push(40);
        l.push({
            x: l.getValueAt(0)
        });
        l.push([5 + l.getValueAt(1).x]);
        l.push(40);

        expect(l.find(40))
            .toEqual([0, 3]);
        expect(l.find(0))
            .toBe(null)
    });

    it("Calculating the sum of all of the number values", () => {
        let l = new ZStorage();
        l.push(5);
        l.push(20);
        l.push("5");
        l.push(10);
        l.push(50.5);

        expect(l.sum()).toBe(90.5);
    });

    it("Calculating the average of all of the number values", () => {
        let l = new ZStorage();
        l.push(5);
        l.push(20);
        l.push("5");
        l.push(10);
        l.push(50.5);

        expect(l.average()).toBe(18.1);
    });

    it("Calculating the product of all of the number values", () => {
        let l = new ZStorage();
        l.push(5);
        l.push(20);
        l.push("5");
        l.push(10);
        l.push(50.5);

        expect(l.product()).toBe(252500);
    });

    it("Expressing in string the list", () => {
        let l = new ZStorage();
        l.push([{
            e: 5
        }, {
            x: [5, {
                x: 3
            }]
        }]);
        l.push(1);
        l.push("salut");
        l.push(4);
        l.push({
            x: 5.5,
            y: 6,
            t: [5, 5],
            s: "s"
        });
        l.push(true);

        expect(l.toString()).toBe(
            '<[{"e":5},{"x":[5,{"x":3}]}],1,"salut",4,{"x":5.5,"y":6,"t":[5,5],"s":"s"},true>'
        );
    });

    it("Getting node at index", () => {
        let l = new ZStorage();
        l.push([{
            e: 5
        }, {
            x: [5, {
                x: 3
            }]
        }]);
        l.push("abracadabra");

        l.getNodeAt(1);

        expect(l.getNodeAt(1)).toEqual(new ZNodes("abracadabra"));
    });

    it("Permuting nodes value between us", () => {
        let l = new ZStorage();
        l.push([{
            e: 5
        }, {
            x: [5, {
                x: 3
            }]
        }]);
        l.push("abracadabra");

        l.permute(0, 1);

        expect(l.getValueAt(0)).toBe("abracadabra");

        expect(l.getValueAt(1)).toEqual([{
            e: 5
        }, {
            x: [5, {
                x: 3
            }]
        }]);
    });

    it("Removing all explicit value in list", () => {
        let l = new ZStorage();
        l.push(5);
        l.push({
            a: [4.4, {
                b: 5
            }]
        });
        l.push(5);
        l.push(5);
        l.push([{
            c: {
                d: 4,
                g: [false, 5, true]
            }
        }]);
        l.push("yo");

        expect(l.length()).toBe(6);

        let removed = l.removeAll();

        expect(l.length()).toBe(0);

        expect(removed).toEqual([{
            id: 0,
            val: 5
        },
            {
                id: 1,
                val: {
                    a: [4.4, {
                        b: 5
                    }]
                }
            },
            {
                id: 2,
                val: 5
            },
            {
                id: 3,
                val: 5
            },
            {
                id: 4,
                val: [{
                    c: {
                        d: 4,
                        g: [false, 5, true]
                    }
                }]
            },
            {
                id: 5,
                val: "yo"
            },
        ]);
    });

    it("Putting id in each element (didnt affect the list)", () => {
        let l = new ZStorage();
        l.push({
            e: 3
        });
        l.push(3);
        l.push("quoicoubeh");
        const wId = l.withIDs();

        expect(wId.toString()).toBe(
            '<{"id":0,"val":{"e":3}},{"id":1,"val":3},{"id":2,"val":"quoicoubeh"}>'
        );
    });

    it("Making action in list for a specifics value", () => {
        let l = new ZStorage();
        l.push(1);
        l.push(2);
        l.push(3);
        l.push(4);

        l.action(
            (e) => {
                return e + 1;
            }, (e) => {
                return e % 2 === 0;
            }
        );

        l.action(
            (e) => {
                return e * 2;
            }, (e) => {
                return e === 3 || e === 5;
            }
        );

        expect(l.getValueAt(1)).toBe(6);

        expect(l.getValueAt(3)).toBe(10);
    });

    it("Remove all types from list", () => {
        let l = new ZStorage();
        l.push(-5);
        l.push(5 * 5 + l.sum());
        l.push({
            e: 5,
            f: l.average()
        });

        l.push(":(" + l.product());
        l.push(typeof (3 + ""));
        let removed = l.removeTypes(["number", "object"]);

        expect(l.length())
            .toBe(2);

        expect(l.getValueAt(1))
            .toEqual("string");

        expect(removed).toEqual([{
            id: 0,
            type: "number",
            val: -5
        },
            {
                id: 1,
                type: "number",
                val: 20
            },
            {
                id: 2,
                type: "object",
                val: {
                    e: 5,
                    f: 7.5
                }
            },
        ]);
    });

    it("Check if 3 is contain in <1,4,3>", () => {
        let l = new ZStorage();
        l.push(1);
        l.push([5]);
        l.push(3);
        l.push({
            e: "e",
            t: true
        });

        expect(l.includes([6, 6, {
            e: "e",
            t: true
        }])).toBe(true);
    });

    it("Filling a list from x to y", () => {
        let l = new ZStorage();
        l.push(1);
        l.push(4);

        l.fill({
            n1: 1,
            n2: 3
        }, {
            i: 0,
            j: 0
        });

        expect(l.length()).toBe(4);

        expect(l.toString()).toBe('<1,{"i":0,"j":0},{"i":0,"j":0},{"i":0,"j":0}>');
    });

    it("Regexing", () => {
        let l = new ZStorage();
        l.push(5);
        l.push([1, 2, 3]);
        l.push({
            id: 4,
            po: 6
        });
        l.push("power");

        expect(l.zRegex(/po/)).toEqual([{
            id: 2,
            val: {
                id: 4,
                po: 6
            }
        },
            {
                id: 3,
                val: "power"
            },
        ]);
    });

    it("Mixing the list elements (a votre ame et conscience)", () => {
        let l = new ZStorage()
        l.push(432)
        l.push({e:()=>3+3,g:3})
        l.push(true)

        l.mix()

        expect(l.length())
            .toBe(3)
    })
});