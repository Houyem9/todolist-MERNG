// Modules
import * as dotenv from "dotenv";

dotenv.config();

// Define Errors name
export const REQUIRED_FIELDS = `Required fields.`
export const WRONG_MESSAGE = `Something Went Wrong`;
export const NOTIFICATION_SENT = "Notification sent successfully."
export const ERROR_SENT =  "Error sending notification"

// Code Error List
export const CREATED = 201;
export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;
export const METHOD_NOT_ALLOWED = 405
export const INTERNAL_SERVER_ERROR = 500;