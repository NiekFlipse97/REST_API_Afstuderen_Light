const ApiError = require("./apiError.js");

module.exports = class ApiErrors {
    /**
     * Similar to 403 Forbidden,
     * but specifically for use when authentication is required and has failed or has not yet been provided.
     * The response must include a X-Access-Token header field containing a challenge applicable to the requested resource.
     * @returns {ApiError} Not authorized 401.
     */
    static notAuthorised(){
        return new ApiError("Niet geautoriseerd", 401);
    }

    /**
     * Method that will be used when a user sends an invalid token
     * @returns {ApiError} Invalid Token 498.
     */
    static noValidToken() {
        return new ApiError("Invalid Token", 498);
    }

    /**
     * Indicates that the request could not be processed because of conflict in the request
     * @returns {ApiError} Conflict 409.
     */
    static conflict() {
        return new ApiError("Conflict", 409);
    }

    /**
     * The server cannot or will not process the request due to an apparent client apiErrors
     * e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).
     * @returns {ApiError} Bad Request 400.
     */
    static badRequest() {
        return new ApiError("Bad Request", 400);
    }

    /**
     * The request was valid, but the server is refusing action.
     * The user might not have the necessary permissions for a resource, or may need an account of some sort.
     * @returns {ApiError} Forbidden 403.
     */
    static forbidden() {
        return new ApiError("Forbidden", 403);
    }

    /**
     * Reqest timeout.
     * @returns {ApiError}
     */
    static requestTimeout() {
        return new ApiError("Request Timeout", 408);
    }

    /**
     * A generic apiErrors message,
     * given when an unexpected condition was encountered and no more specific message is suitable.
     * @returns {ApiError}
     */
    static internalServerError() {
        return new ApiError("Internal Server Error", 500);
    }

    /**
     * The requested resource could not be found but may be available in the future.
     * Subsequent requests by the client are permissible.
     * @returns {ApiError} Not Found, 404
     */
    static notFound() {
        return new ApiError("Not Found", 404);
    }

    /**
     * The 520 apiErrors is used as a "catch-all response for when the origin server returns something unexpected",
     * listing connection resets, large headers, and empty or invalid responses as common triggers.
     * @returns {ApiError} Unknown apiErrors, 520
     */
    static unknownError() {
        return new ApiError("Unknown Error", 520);
    }

    /**
     * Unofficial HTTP Response.
     * This response is self reclaimed.
     * @returns {ApiError} User Exists, 420.
     */
    static userExists() {
        return new ApiError("User Exists", 420);
    }

    /**
     * Unofficial HTTP Response.
     * This response is self reclaimed.
     * @returns {ApiError} User does not exist, 421.
     */
    static userDoesNotExist() {
        return new ApiError("Email or password are incorrect", 419);
    }

    static lengthRequired() {
        return new ApiError("The variable must be greater than 0", 411);
    }
}