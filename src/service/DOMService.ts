/**
 *  Copyright 2019 The Adaptive Web. All Rights Reserved.
 * 
 *  Licensed under the Mozilla Public License 2.0 (the "License"). 
 *  You may not use this file except in compliance with the License.
 *  A copy of the License is located at
 *  
 *      https://www.mozilla.org/en-US/MPL/2.0/
 *  
 *  or in the "license" file accompanying this file. This file is distributed 
 *  on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either 
 *  express or implied. See the License for the specific language governing 
 *  permissions and limitations under the License.
 */

/**
 * DOMService helps to build AdaptiveWeb styled UIs in Adapters.
 */
export interface DOMService {

    /**
     * Returns a card div
     * @param children the children of this element
     * @param cssProperties the css properties of the card
     */
    card(children: HTMLElement[], cssProperties: { [key: string] : string }): AWCard;

    /**
     * Returns a button
     * @param text the button text
     * @param onClick 
     * @param type 
     * @param cssProperties 
     */
    button(text: string, onClick: Function, type: string, cssProperties: { [key: string] : string }): AWButton;

    /**
     * Returns a text element
     * @param text 
     * @param size 
     * @param cssProperties 
     */
    text(text: string, size: number, cssProperties: { [key: string] : string }): AWText;

}

export interface AWElement {

    element: HTMLElement;

    setCSSProperties(properties: { [key: string]: string }): void;
    setCSSProperty(property: string, value: string): void;
    appendChild(child: HTMLElement): void;

}

export interface AWCard extends AWElement {

    element: HTMLDivElement;

}

export interface AWText extends AWElement {

    element: HTMLDivElement;

    setText(newText: string): void;

}

export interface AWButton extends AWElement {

    element: HTMLButtonElement;

    setText(newText: string): void;
    setType(newType: string): void;

}