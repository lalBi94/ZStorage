/**
 * @name ZNodes is necessary to create a ZStorage.
 * @version 1.0
 * @author : General Zod (lalBi94)
 * @link https://github.com/lalBi94
 * @license MIT
 * @copyright © 2023 Boudjemline 
 * @contact : bilal@boudjemline.fr
 */
export default class ZNodes {
    /**
     * @param {any} val The value initialized into this node
     */
    constructor(val) {
        this.val = val
        this.next = null
    }

    /**
     * Check if value is equal to val
     * @param {*} val Value to test
     * @return {boolean}
     */
    equals(val) {
        return val === this.val
    }

    /**
     * Break the list in this point
     * @return {void}
     */
    breakNext() {
        this.next = null
    }

    /**
     * Get the next node
     * @return {ZNodes}
     */
    getNext() {
        return this.next
    }

    /**
     * Get the value of this node
     * @return {any}
     */
    getValue() {
        return this.val
    }

    /**
     * Set the next node
     * @param {ZNodes} next
     * @return {void}
     */
    setNext(next) {
        this.next = next
    }

    /**
     * Set the value of this node
     * @param {any} val
     * @return {void}
     */
    setValue(val) {
        this.val = val
    }
}