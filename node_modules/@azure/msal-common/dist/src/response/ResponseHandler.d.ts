import { ServerAuthorizationTokenResponse } from "../server/ServerAuthorizationTokenResponse";
import { ICrypto } from "../crypto/ICrypto";
import { ServerAuthorizationCodeResponse } from "../server/ServerAuthorizationCodeResponse";
import { Logger } from "../logger/Logger";
import { IdToken } from "../account/IdToken";
import { AuthenticationResult } from "./AuthenticationResult";
import { Authority } from "../authority/Authority";
import { CacheRecord } from "../cache/entities/CacheRecord";
import { CacheManager } from "../cache/CacheManager";
/**
 * Class that handles response parsing.
 */
export declare class ResponseHandler {
    private clientId;
    private cacheStorage;
    private cryptoObj;
    private logger;
    private clientInfo;
    private homeAccountIdentifier;
    constructor(clientId: string, cacheStorage: CacheManager, cryptoObj: ICrypto, logger: Logger);
    /**
     * Function which validates server authorization code response.
     * @param serverResponseHash
     * @param cachedState
     * @param cryptoObj
     */
    validateServerAuthorizationCodeResponse(serverResponseHash: ServerAuthorizationCodeResponse, cachedState: string, cryptoObj: ICrypto): void;
    /**
     * Function which validates server authorization token response.
     * @param serverResponse
     */
    validateTokenResponse(serverResponse: ServerAuthorizationTokenResponse): void;
    /**
     * Returns a constructed token response based on given string. Also manages the cache updates and cleanups.
     * @param serverTokenResponse
     * @param authority
     */
    handleServerTokenResponse(serverTokenResponse: ServerAuthorizationTokenResponse, authority: Authority, cachedNonce?: string, cachedState?: string): AuthenticationResult;
    /**
     * Generates CacheRecord
     * @param serverTokenResponse
     * @param idTokenObj
     * @param authority
     */
    private generateCacheRecord;
    /**
     * Generate Account
     * @param serverTokenResponse
     * @param idToken
     * @param authority
     */
    private generateAccountEntity;
    /**
     * Creates an @AuthenticationResult from @CacheRecord , @IdToken , and a boolean that states whether or not the result is from cache.
     *
     * Optionally takes a state string that is set as-is in the response.
     *
     * @param cacheRecord
     * @param idTokenObj
     * @param fromTokenCache
     * @param stateString
     */
    static generateAuthenticationResult(cacheRecord: CacheRecord, idTokenObj: IdToken, fromTokenCache: boolean, stateString?: string): AuthenticationResult;
}
