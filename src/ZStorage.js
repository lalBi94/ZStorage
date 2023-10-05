import ZNodes from "./ZNodes.js";

/**
 * @name ZStorage List contains a lot of nodes.
 * @version 1.0
 * @requires ZNodes
 * @license MIT
 * @author General Zod (lalBi94)
 * @link https://github.com/lalBi94
 * @copyright © 2023 Boudjemline
 * @contact : bilal@boudjemline.fr
 */
export default class ZStorage {
    constructor() {
        this.root = new ZNodes(-1);
    }

    /**
     * Ex:
     *  1) list = [0]:1 -> [1]:32 -> [2]:4 -> [3]:57
     *  2) list.breakAt(1)
     *  3) list = [0]:1 -> [1]:32
     * @param {number} index Index of the new last node
     * @return {void}
     */
    breakAt(index) {
        let cpy = this.root;
        let counter = 0;

        while (counter <= index) {
            cpy = cpy.getNext();
            ++counter;
        }

        cpy.breakNext();
    }

    /**
     * Modify value at specific index
     * @param {number} index Index of the value to change
     * @param {any} val New value
     */
    modifyValueAt(index, val) {
        let cpy = this.root;
        let count = 0;

        while (count <= index) {
            ++count;
            cpy = cpy.getNext();
        }

        cpy.setValue(val);
    }

    /**
     * Get the size of the list
     * @return {number}
     */
    length() {
        let cpy = this.root;
        let counter = 0;

        while (cpy.getNext() !== null) {
            ++counter;
            cpy = cpy.getNext();
        }

        return counter;
    }

    /**
     * Push any type value
     * @param {any} val The node value
     * @return {void}
     */
    push(val) {
        if (this.root.getNext() === null) {
            this.root.setNext(new ZNodes(val));
        } else {
            let cpy = this.root;

            while (cpy.getNext() !== null) {
                cpy = cpy.getNext();
            }

            cpy.setNext(new ZNodes(val));
        }
    }

    /**
     * Connect 2 lists
     * @param {ZStorage} l2 The second list
     * @return {ZStorage}
     */
    connect(l2) {
        let cpy = this.root;

        while (cpy.getNext() !== null) {
            cpy = cpy.getNext();
        }

        cpy.setNext(l2.getRoot().getNext());

        return this;
    }

    /**
     * Get value at index
     * @param {number} index The index of the nodes
     * @return {any|null}
     */
    getValueAt(index) {
        if (this.length() > index) {
            let cpy = this.root;
            let counter = 0;

            while (counter <= index) {
                cpy = cpy.getNext();
                ++counter;
            }

            return cpy.getValue();
        } else {
            return null;
        }
    }

    /**
     * Remove the all of value and return the supress
     * @param {array<any>|"all"} val The value to supress (only with this type)
     * @return {array<{id:any}>}
     */
    removeAll(val = "all") {
        let l = new ZStorage();
        let rm = [];
        let cpy = this.root;
        let id = 0;

        let valStr = [];
        for (let i = 0; i <= val.length - 1; ++i)
            valStr.push(JSON.stringify(val[i]));

        while (cpy.getNext() !== null) {
            cpy = cpy.getNext();

            if (
                val === "all" ||
                val.includes(cpy.getValue()) ||
                valStr.includes(JSON.stringify(cpy.getValue()))
            ) {
                rm.push({ id: id, val: cpy.getValue() });
            } else {
                l.push(cpy.getValue());
            }

            ++id;
        }

        if (val === "all") {
            this.clear();
        } else {
            this.setRoot(l.getRoot());
        }

        return rm;
    }

    /**
     * Clear the list
     * @return {void}
     */
    clear() {
        this.root = new ZNodes(-1);
    }

    /**
     * Get the index of all of value
     * @param {number|double|boolean|string} val
     * @return {array<number>|null}
     */
    getIndexOf(val) {
        let stock = [];

        for (let i = 0; i <= this.length() - 1; ++i) {
            if (this.getValueAt(i) == val) {
                stock.push(i);
            }
        }

        return stock.length > 0 ? stock : null;
    }

    /**
     * Remove and return the first element
     * @return {any|null}
     */
    shift() {
        if (this.root.getNext()) {
            let cpy = this.root.getNext();
            let value = cpy.getValue();
            let nextOfFirst = cpy.getNext();
            this.root.setNext(nextOfFirst);

            return value;
        } else {
            return null;
        }
    }

    /**
     * Set a new root and return the last root
     * @param {ZNodes} newRoot The new root of the list
     * @return {ZNodes}
     */
    setRoot(newRoot) {
        const cpy = this.root;
        this.root = newRoot;
        return cpy;
    }

    /**
     * Remove and return the last element
     * @return {any|null}
     */
    pop() {
        if (this.root.getNext()) {
            let cpy = this.root;
            let last = null;

            while (cpy.getNext() !== null) {
                last = cpy;
                cpy = cpy.getNext();
            }

            last.breakNext();
            return cpy.getValue();
        } else {
            return null;
        }
    }

    /**
     * Receive datas from an other ZStorage
     * @param {ZStorage} src
     * @return {ZNodes}
     */
    copy(src) {
        const last = this.root;
        this.root = src.getRoot();
        return last;
    }

    /**
     * Get first ZNodes
     * @return {ZNodes}
     */
    getRoot() {
        return this.root;
    }

    /**
     * Get node at index
     * @param {number} index
     * @return {ZNodes}
     */
    getNodeAt(index) {
        let cpy = this.root;
        let id = 0;

        while (id <= index) {
            ++id;
            cpy = cpy.getNext();
        }

        return cpy;
    }

    /**
     * Permute value i1 and i2 and return the last value of i1 & i2
     * @param {number} i1 first index
     * @param {number} i2 second index
     * @return {{val1:any, val2:any}}
     */
    permute(i1, i2) {
        const v1 = this.getValueAt(i1);
        const v2 = this.getValueAt(i2);

        this.modifyValueAt(i1, v2);
        this.modifyValueAt(i2, v1);

        return { val1: v1, val2: v2 };
    }

    /**
     * Check if l2 is equals to l1
     * @param {ZStorage} l2 List to compare with this
     * @return {boolean}
     */
    equalTo(l2) {
        if (l2.length() !== this.length()) return false;

        for (let i = 0; i <= this.length() - 1; ++i) {
            if (this.getValueAt(i) !== l2.getValueAt(i)) return false;
        }

        return true;
    }

    /**
     * Get the average of numbers values in this list (string value like "4" will be convert)
     *@return {number}
     */
    average() {
        return this.sum() / this.length();
    }

    /**
     * Get the product of numbers in the list (string value like "4" will be convert)
     * @return {number}
     */
    product() {
        let res = 1;

        for (let i = 0; i <= this.length() - 1; ++i) {
            switch (typeof this.getValueAt(i)) {
                case "number": {
                    res *= this.getValueAt(i);
                    break;
                }

                case "string": {
                    try {
                        res *= parseInt(this.getValueAt(i), 10);
                    } catch (nothing) { }
                    break;
                }
            }
        }

        return res;
    }

    /**
     * Additionate all of numbers in the list (string value like "4" will be convert)
     * @return {number}
     */
    sum() {
        let res = 0;

        for (let i = 0; i <= this.length() - 1; ++i) {
            switch (typeof this.getValueAt(i)) {
                case "number": {
                    res += this.getValueAt(i);
                    break;
                }

                case "string": {
                    try {
                        res += parseInt(this.getValueAt(i), 10);
                    } catch (nothing) { }
                    break;
                }
            }
        }

        return res;
    }

    /**
        
         */

    /**
     * Convert ZStorage to Array
     * @return {array}
     */
    toArray() {
        let arr = [];

        for (let i = 0; i <= this.length() - 1; ++i) {
            arr.push(this.getValueAt(i));
        }

        return arr;
    }

    /**
     * Get the string value of this list. Syntax: <e1, e2, ...>
     * @return {string}
     */
    toString() {
        let str = "";

        for (let i = 0; i <= this.length() - 1; i++) {
            switch (typeof this.getValueAt(i)) {
                case "string": {
                    str += this.getValueAt(i);
                    break;
                }

                case "number": {
                    str += this.getValueAt(i);
                    break;
                }

                case "object": {
                    str += JSON.stringify(this.getValueAt(i), null, 0);
                    break;
                }

                case "boolean": {
                    str += this.getValueAt(i) ? "true" : "false";
                    break;
                }
            }

            str += ",";
        }

        return `<${str.slice(0, -1)}>`;
    }

    /**
     * Put id for each element ans return the new list (didn't affect this.root)
     * @return {ZStorage}
     */
    withIDs() {
        let l = new ZStorage();

        for (let i = 0; i <= this.length() - 1; ++i) {
            l.push({ id: i, val: this.getValueAt(i) });
        }

        return l;
    }

    /**
     * Make action for specific element
     * @param {function} action
     * @param {function} condition
     * @return {ZNodes}
     */
    action(action, condition) {
        let cpy = this.root;

        while (cpy.getNext() !== null) {
            cpy = cpy.getNext();

            if (condition(cpy.getValue())) {
                cpy.setValue(action(cpy.getValue()));
            }
        }

        return this.root;
    }

    /**
     * Remove all specifics types
     * @param {array<"number"|"boolean"|"object"|"string">} types
     * @return {[{id:number,val:any, type:string}]}
     */
    removeTypes(types) {
        let l = new ZStorage();
        let stock = [];

        for (let i = 0; i <= this.length() - 1; ++i) {
            if (!types.includes(typeof this.getValueAt(i))) {
                l.push(this.getValueAt(i));
            } else {
                stock.push({
                    id: i,
                    val: this.getValueAt(i),
                    type: typeof this.getValueAt(i),
                });
            }
        }

        this.setRoot(l.getRoot());

        return stock;
    }

    /**
     * Check if e is contains in [...]
     * @param {array<any>} values Values to check
     * @return {boolean}
     */
    includes(values) {
        for (let i = 0; i <= this.length() - 1; ++i) {
            switch (typeof this.getValueAt(i)) {
                case "object": {
                    for (let j = 0; j <= values.length - 1; ++j) {
                        if (
                            JSON.stringify(values[j]) === JSON.stringify(this.getValueAt(i))
                        )
                            return true;
                    }
                    break;
                }

                default: {
                    if (values.includes(this.getValueAt(i))) return true;
                    break;
                }
            }
        }

        return false;
    }

    /**
     * Fill the list with any elements
     * @param {{n1:number, n2:number}} range Where you want fill ?
     * @param {any} val The value for the node (default 0)
     * @return {ZNodes}
     */
    fill(range, val = 0) {
        if (range.n2 > range.n1) {
            for (let i = range.n1; i <= range.n2; ++i) {
                if (this.getValueAt(i)) {
                    this.modifyValueAt(i, val);
                } else {
                    this.push(val);
                }
            }

            return this.root;
        } else {
            return null;
        }
    }

    /**
     * Check and return values = to regex expression
     * @param {regex} exp The regex expression
     * @return {array<{id:number,val:any}>}
     */
    zRegex(exp) {
        let stock = [];
        for (let i = 0; i <= this.length() - 1; ++i) {
            switch (typeof this.getValueAt(i)) {
                case "object": {
                    if (exp.test(JSON.stringify(this.getValueAt(i))))
                        stock.push({ id: i, val: this.getValueAt(i) });
                    break;
                }

                default: {
                    if (exp.test(this.getValueAt(i)))
                        stock.push({ id: i, val: this.getValueAt(i) });
                    break;
                }
            }
        }

        return stock;
    }

    /**
     * [DEBUG] Print the chain list
     * @return {void}
     */
    print() {
        let cpy = this.root;
        let id = 0;

        while (cpy.getNext() !== null) {
            ++id;
            cpy = cpy.getNext();

            console.log(
                `${id}: ${cpy.getValue() instanceof Object
                    ? JSON.stringify(cpy.getValue())
                    : cpy.getValue()
                }`
            );
        }
    }
}
