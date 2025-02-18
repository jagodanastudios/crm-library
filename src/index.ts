import dotenv from 'dotenv';
export * from "./types";
import API_HELPER from './contollers';

dotenv.config(); // Load environment variables
const JAGODANA_CRM_CONTROLLER = API_HELPER;

export { JAGODANA_CRM_CONTROLLER };
