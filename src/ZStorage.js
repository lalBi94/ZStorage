import ZNodes from "./ZNodes.js"

/**
 * @name ZStorage List contains a lot of nodes.
 * @version 1.0
 * @requires ZNodes
 * @license MIT
 * @author : General Zod (lalBi94)
 * @link https://github.com/lalBi94
 * @copyright © 2023 Boudjemline 
 * @contact : bilal@boudjemline.fr
 */
export default class ZStorage {
    constructor() {
        /**
         * Source of the list
         * @type {ZNodes} root
         */
        this.root = new ZNodes(-1)
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
        let cpy = this.root
        let counter = 0

        while(counter <= index) {
            cpy = cpy.getNext()
            ++counter
        }
        
        cpy.breakNext()
    }

    /**
     * Modify value at specific index
     * @param {number} index Index of the value to change
     * @param {any} val New value
     */
    modifyValueAt(index, val) {
        let cpy = this.root
        let count = 0

        while(count <= index) {
            ++count
            cpy = cpy.getNext()
        }

        cpy.setValue(val)
    }

    /**
     * Get the size of the list
     * @return {number}
     */
    length() {
        let cpy = this.root
        let counter = 0

        while(cpy.getNext() !== null) {
            ++counter
            cpy = cpy.getNext()
        }

        return counter
    }
    
    /**
     * Push any type value
     * @param {any} val The node value
     * @return {void}
     */
    push(val) {
        if(this.root.getNext() === null) {
            this.root.setNext(new ZNodes(val))
        } else {
            let cpy = this.root

            while(cpy.getNext() !== null) {
                cpy = cpy.getNext()
            }

            cpy.setNext(new ZNodes(val))
        }
    }

    /**
     * Connect 2 lists
     * @param {ZStorage} l2 The second list
     * @return {ZStorage}
     */
    connect(l2) {
        let cpy = this.root

        while(cpy.getNext() !== null) {
            cpy = cpy.getNext()
        }

        cpy.setNext(l2.getRoot().getNext())
    }

    /**
     * Get value at index
     * @param {number} index The index of the nodes 
     * @return {any|null}
     */
    getValueAt(index) {
        if(this.length() >= index) {
            let cpy = this.root
            let counter = 0

            while(counter <= index) {
                cpy = cpy.getNext()
                ++counter
            }
            
            return cpy.getValue()
        } else {
            return null
        }
    }

    /**
     * Clear the list
     * @return {void}
     */
    clear() {
        this.root = new ZNodes(-1)
    }

    /**
     * Get the index of all of value
     * @param {number|double|boolean|string} val
     * @return {array<number>|null}
     */
    getIndexOf(val) {
        let stock = []

        for(let i = 0; i <= this.length()-1; ++i) {
            if(this.getValueAt(i) == val) {
                stock.push(i)
            }
        }

        return stock.length > 0 ? stock : null
    }

    /**
     * Remove and return the first element
     * @return {any|null}
     */
    shift() {
        if(this.root.getNext()) {
            let cpy = this.root.getNext()
            let value = cpy.getValue()
            let nextOfFirst = cpy.getNext()
            this.root.setNext(nextOfFirst)

            return value
        } else {
            return null
        }
    }

    /**
     * Remove and return the last element
     * @return {any|null}
     */
    pop() {
        if(this.root.getNext()) {
            let cpy = this.root
            let last = null

            while(cpy.getNext() !== null) {
                last = cpy
                cpy = cpy.getNext()
            }
            
            last.breakNext()
            return cpy.getValue()
        } else {
            return null
        }
    }

    /**
     * Receive datas from an other ZStorage
     * @param {ZStorage} src 
     * @return {ZNodes}
     */
    copy(src) {
        const last = this.root
        this.root = src.getRoot()
        return last
    }

    /**
     * Get first ZNodes
     * @return {ZNodes}
     */
    getRoot() {
        return this.root
    }

    /**
     * Check if l2 is equals to l1
     * @param {ZStorage} l2 List to compare with this
     * @return {boolean}
     */
    equalTo(l2) {
        if(l2.length() !== this.length()) return false

        for(let i = 0; i <= this.length()-1; ++i) {
            if(this.getValueAt(i) !== l2.getValueAt(i)) return false
        }

        return true
    }

    /**
     * Get the average of numbers values in this list (string value like "4" will be convert)
     *@return {number}
     */
    average() {
        return (this.sum()/this.length())
    }

    /**
     * Get the product of numbers in the list (string value like "4" will be convert)
     * @return {number}
     */
    product() {
        let res = 1

        for(let i = 0; i <= this.length()-1; ++i) {
            switch(typeof(this.getValueAt(i))) {
                case "number": {
                    res *= this.getValueAt(i)
                    break
                }

                case "string": {
                    try {
                        res *= parseInt(this.getValueAt(i), 10)
                    } catch(nothing) {}
                    break
                }
            }
        }

        return res
    }

    /**
     * Additionate all of numbers in the list (string value like "4" will be convert)
     * @return {number}
     */
    sum() {
        let res = 0

        for(let i = 0; i <= this.length()-1; ++i) {
            switch(typeof(this.getValueAt(i))) {
                case "number": {
                    res += this.getValueAt(i)
                    break
                }

                case "string": {
                    try {
                        res += parseInt(this.getValueAt(i), 10)
                    } catch(nothing) {}
                    break
                }
            }
        }

        return res
    }

    /**
     * Convert ZStorage to Array
     * @return {array}
     */
    toArray() {
        let arr = []

        for(let i = 0; i <= this.length()-1; ++i) {
            arr.push(this.getValueAt(i))
        }

        return arr
    }

    /**
     * Get the string value of this list. Syntax: <e1, e2, ...>
     * @return {string} 
     */
    toString() {
        let str = ""
        
        for(let i = 0; i <= this.length()-1; i++) {
            switch(typeof(this.getValueAt(i))) {
                case "string": {
                    str += this.getValueAt(i)
                    break
                }

                case "number": {
                    str += this.getValueAt(i)
                    break
                }

                case "object": {
                    str += JSON.stringify(this.getValueAt(i), null, 0)
                    break
                }

                case "boolean": {
                    str += (this.getValueAt(i) ? "true" : "false")
                    break
                }
            }

            str += ','
        }

        return `<${str.slice(0, -1)}>`
    }

    /**
     * [DEBUG] Print the chain list 
     * @return {void}
     */
    print() {
        let cpy = this.root
        let id = 0

        while(cpy.getNext() !== null) {
            ++id
            cpy = cpy.getNext()

            console.log(`${id}: ${cpy.getValue() instanceof Object ? 
                JSON.stringify(cpy.getValue()) : 
                cpy.getValue()
            }`)
        }
    }
}