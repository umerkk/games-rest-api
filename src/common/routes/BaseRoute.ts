import {Application} from 'express';

export abstract class BaseRoute {
    public routeName: string;
    protected app: Application;

    /**
     * Self contained custom express route class
     *
     * @param expressApp Instance of the express App to register the route to.
     * @param name User friendly name of the route.
     */
    constructor(expressApp: Application, name: string) {
        this.app = expressApp;
        this.routeName = name;
        this.registerRoutes();
    }

    public abstract registerRoutes(): void;
}