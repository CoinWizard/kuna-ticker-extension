import UniversalAnalytics from 'universal-analytics';
import uuidv4 from 'uuid/v4';
import localStorage from 'local-storage';

const USER_UUID_KEY = 'USER_UUID';
const GA_IDENTIFY = 'UA-64948076-3';

let visitorUUID = localStorage.get(USER_UUID_KEY);

if (!visitorUUID) {
    visitorUUID = uuidv4();
    localStorage.set(USER_UUID_KEY, visitorUUID);
}

const visitor = UniversalAnalytics(GA_IDENTIFY, visitorUUID, {https: true});
visitor.pageview("/ext/popup").send();

export default visitor;