import '../index.html';
import '@babel/polyfill';
import './../../momentum-ui.scss';
import '../../../../src/webComponents/footer';
import '../../../../src/webComponents/topBar';
import '../../../../src/webComponents/smart-avatar';
import '../../../../src/webComponents/smart-alert';


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
    receivedEvent() {
      const all = document.createElement('div');
      all.innerHTML = `
        <div className='parent-container'>
            <wbx-tms-top-bar > </wbx-tms-top-bar>
            <wbx-tms-smart-alerts > </wbx-tms-smart-alerts>
            <wbx-tms-footer> </wbx-tms-footer>
        </div>`;
      document.body.appendChild(all);
    }   

    onButtonClick() {
        console.log("[HelloWorld#onButtonClick]");
    }
}
new Mobile();