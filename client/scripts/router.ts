"use strict";

namespace core {

    export class Router {
        private _activeLink:string;
        private _routingTable:string[];
        private _linkData:string;

        constructor() {
            this._activeLink = "";
            this._routingTable = [];
            this._linkData = "";
        }

        public get ActiveLink():string {
            return this._activeLink;
        }
        public set ActiveLink(link:string) {
            this._activeLink = link;
        }

        public get LinkData():string {
            return this._activeLink;
        }
        public set LinkData(link:string) {
            this._linkData = link;
        }

        /**
         * This method adds a new route to the routing table.
         * @param route
         * return {void}
         */
        public Add(route:string):void {
            this._routingTable.push(route);
        }

        /**
         * This method replaces the reference for the routing table with a new one
         * @param routingTable
         * return {void}
         */
        public AddTable(routingTable:string[]):void {
            this._routingTable = routingTable;
        }

        /**
         * This method finds a route within the routing table and returns the index of where it is or -1 if not found
         * @param route
         * @returns {*}
         */
        public Find(route:string):number {
            return this._routingTable.indexOf(route);
        }

        /**
         * This method removes a route from the routing table. It returns true if it is removed or false otherwise
         * @param route
         * @returns {boolean}
         */
        public Remove(route:string):boolean {
            if (this.Find(route) > -1) {
                this._routingTable.splice(this.Find(route), 1);
                return true;
            }
            return false;
        }

        /**
         * This method returns the routing table contents in a comma delimited seperated string
         * @returns {string}
         */
        public toString():string {
            return this._routingTable.toString();
        }
    }
}

//Instantiate a new router
let router:core.Router = new core.Router();

//Add default routes to our routing table.
router.AddTable([
    "/",
    "/home",
    "/about",
    "/services",
    "/products",
    "/contact",
    "/contact-list",
    "/login",
    "/register",
    "/edit"
]);

let route:string = location.pathname;

router.ActiveLink = (router.Find(route) > -1)
                    ? ((route === "/") ? "home" : route.substring(1))
                    : ("404");