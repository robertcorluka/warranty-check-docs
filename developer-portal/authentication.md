
## Authentication and Authorization

-   API endpoints use  _authorization headers_  and/or  _cookies_  in their requests to utilize security. When still ‘empty’, each endpoint is marked with ‘unlocked lock’ symbol on the right side  ![alt text](https://pages.github.hpe.com/TS-RnD/images/lock-empty.png "Lock symbol - empty"). After filling  _authentication/authorization_  for a certain endpoint it changes to ‘locked lock’  ![alt text](https://pages.github.hpe.com/TS-RnD/images/lock-filled.png "Lock symbol - filled").
    
-   Filling  _authentication/authorization_  can be done for an individual endpoint (‘lock’ symbol) or all at once by clicking the ‘authorize’ button on top-right positioning of  [OpenApi documentation](https://pages.github.hpe.com/TS-RnD/ide-uaa-api.html)  ![alt text](https://pages.github.hpe.com/TS-RnD/images/authorize-button.png "Authorize button"). The window with all possible  _authentications/authorizations_  pops up.
    

## Bearer Authentication

### How to get token

Bellow you can find information how you can get your token from Identity Service ( OpenAPI specification or using cURL/HTTP )

## Identity Service Token OpenAPI Endpoints

# Token Request

**Request Method**

ENV_URL is https://api-gw.support.hpe.com/apigwext/services/oauth/token

**POST:**  { ENV_URL }/services/oauth/token

**Header Parameter**

Parameter

Value

Description

Authorization

Basic [Base64 encoded clientid:secret]

The authorization value the Base64 encoded string of the client id and the secret in the format clientid:secret. Example value: “Basic Y2xpZW50SWQ6c2VjcmV0”

**Body Parameter**  These values can be passed as raw body, form body or as URL parameter

Parameter

Value

Description

grant_type

client_credentials

required - with value client_credentials it specifies to authenticate via client credentials

client_id

the client id

optional – if provided it must match the client id in the authorization header

When testing with Postman and passing the values as body you have to specify the Header Content-Type: application/x-www-form-urlencoded.

## HTTP Example

```
POST /services/oauth/token HTTP/1.1
Host: api-gw.support.hpe.com
Content-Type: application/x-www-form-urlencoded
Authorization: Basic Y2xpZW50SWQ6c2VjcmV0
grant_type=client_credentials&client_id=clientid 

```

The grant type  **_client_credentials_**  allows client applications to request an access token with the client specific credentials. The returned access token is used to make service calls which requires authorization without passing the clients credentials to this service.  
The token is passed via the Authorization header and contains all relevant information about the client especially the permissions. This information is used by the service to make necessary authorization checks.  
To ensure the access token cannot be manipulated it is signed by a certificate.  
The token can be used until it expires. Currently it expires after 1 hour then a new token needs to be requested.

[Applications and Services Use Case]

## cURL Example

```
curl -X POST -s -u ${CLIENT_ID}:${CLIENT_SECRET} https://api-gw.support.hpe.com/apigwext/services/oauth/token \
     -d grant_type=client_credentials \
     -d client_id=${CLIENT_ID}

```

## Response

```
{
    "access_token": "eyJhbGciOiJSUzI1NiIsI....XKdemFdtuGK72X8VNqAdh-uw",
    "token_type": "bearer",
    "expires_in": 3599,
    "scope": "read write",
    "cc_id": "clientid",
    "ga_id": "2c4b2359-d9d1-48ce-8eea-5a7044779e2f",
    "sc_id": "107bef27-48c0-4b0b-812a-ddd902e04d10",
    "eu_id": "eff264ba-efca-4d14-9261-ce53d9fcc022",
    "domain": "SA",
    "zip_authorities": "H4sIAAAAAAAAAI2S...LcPCfSJAy0DAAA=",
    "jti": "d500cfc8-0a36-47bf-bd61-912123c7e479"
} 

```

For further explanation see:  [Identity Service - JSON Web Token (JWT)]

# Using Access Token

The value of the access_token attribute from the previous response contains the access token which needs to be passed as  _**Bearer**_  token via the Authorization header to the service request call.

## HTTP Example

```
GET /rest/service/some/resource/ HTTP/1.1
Host: api-gw.support.hpe.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJSUzI1NiIsI....XKdemFdtuGK72X8VNqAdh-u 

```

## cURL Example

```
curl -R GET 'https:// ${SERVICE_URL} \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsI....XKdemFdtuGK72X8VNqAdh-uw'

```

If the token is expired it results into a 401 Unauthorized error.

```
{
    "error": "invalid_token",
    "error_description": "Access token expired: eyJhbGciOiJSUzI1NiIsI....XKdemFdtuGK72X8VNqAdh-uw"
} 

```

# Special cases handling

## G-blocked contracts handling

**Global Trade Services (GTS)**  are utilizing the S4 Bridge Service to implement a blacklisting policy for services that depend on Entitlement information.

Their strategy is to include a flag ‘G’ in the S4 Bridge response (“Contract Status” field) for specific APIs, and each downstream application has to consume this flag.

If a contract has G flag in the Contract Status it means it is Active but the delivery against it is Blocked. The Entitlement Engine will suppress the G- Block contracts and

will not return any Highest Support Level. 