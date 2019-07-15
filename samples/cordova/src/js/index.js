import '../index.html';
import '@babel/polyfill';
import './../../momentum-ui.scss';

import  SmartWebexTeamsAvatar from '../../../../src/webComponents/smart-avatar';

class Mobile {
    constructor() {
        
        this.personID = 'Y2lzY29zcGFyazovL3VzL1BFT1BMRS80N2MzMmQwYi0wNDQ0LTQ2MGQtOGJjZS0yMjY1YjUwMWFhYzU';
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    }

    /**
     * Handle the deviceready event
     * @see http://cordova.apache.org/docs/en/5.4.0/cordova/events/events.deviceready.html
     * @emits {deviceready} a deviceready event
     * @param {Event} the deviceready event object
     */
    onDeviceReady() {
        this.receivedEvent('deviceready');
    }
    
    
    // Update DOM on a Received Event
    receivedEvent(id) {
        const avatar = new SmartWebexTeamsAvatar();
        avatar.setAttribute('personID', this.personID);
        avatar.setAttribute('adapter', 'SDK')
      document.body.appendChild(avatar);  
    }

    onButtonClick() {
        console.log("[HelloWorld#onButtonClick]");
    }
}
new Mobile();