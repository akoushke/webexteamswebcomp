import '@babel/polyfill';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
import './momentum-ui.scss';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);