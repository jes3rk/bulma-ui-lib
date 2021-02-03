import React from "react";
import { simpleHash } from "./publicUtilities";

type KeyEventOptions = {
    ctrlOrMeta?: boolean;
    shift?: boolean;
}

/**
 * Class to handle HTML Element interactions
 */
export default class Interactable {
    public static ALL_LISTENERS: string[] = ['onClick', 'onKeyDown', 'onKeyUp']
    private _interactionTracker: Map<string, (e: React.SyntheticEvent) => void>;
    private keyEventOptions: KeyEventOptions = {
        ctrlOrMeta: false,
        shift: false
    }
    
    constructor() {
        this._interactionTracker = new Map<string, (e: React.SyntheticEvent) => void>();
    }

    /**
     * Generate a simple hash of an event name for standardization
     * @param t Event type
     * @param key Optional: key value for keyboard events
     * @param metaOrCtrl Optional: Engagement of Control or Meta key for keyboard events
     * @param shft Optional: Engagement of Shift key for keyboard events
     * @returns String of event name
     */
    private _generateEventName(t: string, key = "", metaOrCtrl = false, shft = false): string {
        return simpleHash(`${t} ${key.toLowerCase()} ${metaOrCtrl} ${shft}`);
    }

    /**
     * Listener to listen for events
     * @param e Event
     */
    public listen(e: React.SyntheticEvent): void {
        const params: [string, string?, boolean?, boolean?] = [e.type];
        if (e.type.match('key')) {
            const synthE = e as React.KeyboardEvent<HTMLElement>;
            params.push(synthE.key);
            params.push(synthE.metaKey||synthE.ctrlKey);
            params.push(synthE.shiftKey);
        }
        const name = this._generateEventName(...params);
        if (this._interactionTracker.has(name)) this._interactionTracker.get(name)(e);
    }

    /**
     * Create multiple listeners keyed to specific event triggers
     * @param listeners Array of listener types e.g. ['onClick', 'onKeyUp', 'onInput'] ...etc
     * @returns Destructurable object of listeners
     */
    public multiListener(...listeners: string[]): {[key: string]: (e: React.SyntheticEvent) => void} {
        const ret: {[key: string]: (e: React.SyntheticEvent) => void} = {}
        listeners.forEach((k) => {
            ret[k] = e => this.listen(e);
        })
        return ret;
    }

    /**
     * Register a click listening function
     * @param fn Function to execute on HTML on click events
     */
    public registerClickFunction<T extends HTMLElement>(fn: (e: React.MouseEvent<T>) => void): void {
        const name = this._generateEventName('click');
        this._registerEventListener(name, fn);
    }

    /**
     * Generic function for registering event listeners
     * @param name Name of event -- Use Interactable._generateEventName
     * @param fn Function to call on event
     */
    private _registerEventListener(name: string, fn: (e: React.SyntheticEvent) => void): void {
        if (!this._interactionTracker.has(name)) {
            this._interactionTracker.set(name, fn);
        } else {
            throw new DuplicateEventError("click");
            
        }
    }

    /**
     * Register a key up event specifically for the ENTER key
     * @param fn Function to execute on ENTER event
     * @param options Optional: specific use of ctrl/meta and/or shift key
     */
    public registerEnterKey(fn: (e: React.KeyboardEvent) => void, options: KeyEventOptions = {}): void {
        this.registerKeyUpFunction('enter', fn, options);
    }
    /**
     * Register a key down event
     * @param fn Function to execute on key down events
     * @param options Optional: specific use of ctrl/meta and/or shift key
     */
    public registerKeyDownFunction(keyName: string, fn: (e: React.KeyboardEvent) => void, options: KeyEventOptions = {...this.keyEventOptions}): void {
        const name = this._generateEventName('keydown', keyName, options.ctrlOrMeta, options.shift);
        this._registerEventListener(name, fn);
    }
    /**
     * Register a key up event
     * @param fn Function to execute on key up events
     * @param options Optional: specific use of ctrl/meta and/or shift key
     */
    public registerKeyUpFunction(keyName: string, fn: (e: React.KeyboardEvent) => void, options: KeyEventOptions = {...this.keyEventOptions}): void {
        const name = this._generateEventName('keyup', keyName, options.ctrlOrMeta, options.shift);
        this._registerEventListener(name, fn);
    }
}

class DuplicateEventError extends Error {
    constructor(key: string) {
        /* istanbul ignore next */
        super(`Duplicate Event Error: Event listerner already exists for key: ${key}`)
    }
}