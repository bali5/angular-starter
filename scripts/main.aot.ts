import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from './../aot/aotsource/app/app.module.ngfactory';

enableProdMode();

setTimeout(() => platformBrowser().bootstrapModuleFactory(AppModuleNgFactory));