import ZStorage from "./ZStorage.js"

/**
 * @name ZNodes is necessary to create a ZStorage.
 * @version 1.0
 * @author General Zod (lalBi94)
 * @link https://github.com/lalBi94
 * @license MIT
 * @copyright © 2023 Boudjemline
 * @contact : bilal@boudjemline.fr
 */
export default class ZNodes {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.child = null
    }

    /**
     * Check if value is equal to val
     * @param {*} val Value to test
     * @return {boolean}
     */
    equals(val) {
        return val === this.val;
    }

    /**
     * Break the list in this point
     * @return {void}
     */
    breakNext() {
        this.next = null;
    }

    /**
     * Get the next node
     * @return {ZNodes}
     */
    getNext() {
        return this.next;
    }

    /**
     * Get the value of this node
     * @return {any}
     */
    getValue() {
        return this.val;
    }

    /**
     * Set the next node
     * @param {ZNodes} next
     * @return {void}
     */
    setNext(next) {
        this.next = next;
    }

    /**
     * Set the value of this node
     * @param {any} val
     * @return {void}
     */
    setValue(val) {
        this.val = val;
    }

    /**
     * Get children values
     * @return {ZStorage}
     */
    getChild() {
        return this.child
    }

    /***
     * Init child list
     * @return {void}
     */
    initChild() {
        this.child = new ZStorage()
    }

    /**
     * Add children to this node
     * @param {any} v Value to push on this.child
     * @return {void} 
     */
    pushChild(v) {
        this.child.push(v)
    }

    /**
     * Reset children
     * @return {void} 
     */
    freeChild() {
        this.child = new ZStorage()
    }
}