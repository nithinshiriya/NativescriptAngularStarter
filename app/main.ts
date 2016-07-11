// this import should be first in order to load some required settings (like globals and reflect-metadata)
import {nativeScriptBootstrap} from "nativescript-angular/application";
import {RouterOutletAppComponent, RouterOutletRouterProviders} from "./app.component";
import {HTTP_PROVIDERS} from "@angular/http";

nativeScriptBootstrap(RouterOutletAppComponent, [HTTP_PROVIDERS, RouterOutletRouterProviders]);