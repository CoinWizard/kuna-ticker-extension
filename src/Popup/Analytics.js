import UniversalAnalytics from 'universal-analytics';
import uuidv4 from 'uuid/v4';
import localStorage from 'local-storage';
import Extension from 'Core/Extension';

const USER_UUID_KEY = 'USER_UUID';

const GA_IDENTIFY = 'UA-64948076-3';
const VERSION = Extension.getManifest().version;
const APPLICATION_NAME = 'KUNA';
const DISPLAYED_VERSION = `${APPLICATION_NAME} ${VERSION}`;

const AnaliticsOptions = {};

let visitorUUID = localStorage.get(USER_UUID_KEY);

if (!visitorUUID) {
    visitorUUID = uuidv4();
    localStorage.set(USER_UUID_KEY, visitorUUID);
}

const visitor = UniversalAnalytics(GA_IDENTIFY, visitorUUID, {https: true});
visitor.screenview("KUNA / Popup", APPLICATION_NAME, DISPLAYED_VERSION).send();

export default visitor;