
# Authentication

API endpoints use authorization headers and/or cookies in their requests to utilize security. 
Filling authentication/authorization can be done for an individual endpoint under the security tab on the Open API specification.
    

## Bearer authentication

#### How to get a token

Below you can find out how to get your token from the Identity Service (OpenAPI specification or using cURL/HTTP).

## Identity service token OpenAPI endpoints

#### Token request

**Request method**

**POST:**  https://api-gw.support.hpe.com/apigwext/services/oauth/token

**Header parameter**

|Parameter|Value  |Description |
|--|--|--|
| Authorization |Basic [Base64 encoded clientid:secret]  | The authorization value includes the Base64 encoded string of the client id and the secret in the format, clientid:secret. 
Example value: “Basic XXXXXXXXXXXXXXXXXXx” |

**Body parameter**  
These values can be passed as raw body, form body or as URL parameters.

|Parameter|Value  |Description |
|--|--|--|
| grant_type|client_credentials| Required - With the value ‘client_credentials’, this parameter indicates to authenticate via client credentials.|
| client_id|the client id| Optional – If provided, this parameter must match the client id in the authorization header.|

When testing with Postman and passing the values as body, you have to specify the Header Content-Type: 

application/x-www-form-urlencoded.

#### HTTP example

```
POST /services/oauth/token HTTP/1.1
Host: api-gw.support.hpe.com
Content-Type: application/x-www-form-urlencoded
Authorization: Basic Y2xpZW50SWQ6c2VjcmV0
grant_type=client_credentials&client_id=clientid 

```

The grant type **client_credentials** allows client applications to request an access token with client specific credentials. 
The returned access token is used to make service calls. This requires authorization without passing the client’s credentials to this service. The token is passed via the authorization header and contains all relevant information about the client, especially permissions. 
This information is used by the service to make necessary authorization checks. To ensure the access token cannot be manipulated it is signed by a certificate. The token can be used until it expires. Currently it expires after one hour, and then a new token must be requested.


#### cURL example

```
curl -X POST -s -u ${CLIENT_ID}:${CLIENT_SECRET} https://api-gw.support.hpe.com/apigwext/services/oauth/token \
     -d grant_type=client_credentials \
     -d client_id=${CLIENT_ID}

```

#### Response

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

# Using access tokens

The value of the accesstoken attribute from the previous response contains the access token which needs to be passed as  **Bearer**  token via the Authorization header to the service request call.

#### HTTP example

```
GET /rest/service/some/resource/ HTTP/1.1
Host: api-gw.support.hpe.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJSUzI1NiIsI....XKdemFdtuGK72X8VNqAdh-u 

```

#### cURL example

```
curl -R GET 'https:// ${SERVICE_URL} \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsI....XKdemFdtuGK72X8VNqAdh-uw'

```

If the token is expired it results in a 401 Unauthorized error.

```
{
    "error": "invalid_token",
    "error_description": "Access token expired: eyJhbGciOiJSUzI1NiIsI....XKdemFdtuGK72X8VNqAdh-uw"
} 

```

#### Calling identity service

Since all exposed API endpoints are secured, the client must first obtain a JSON security web token by invoking the Identity Service REST:

       curl -L -X POST '[https://api-gw.support.hpe.com/apigwext/services/oauth/token](https://api-gw.support.hpe.com/apigwext/services/oauth/token)' \
        -H 'Authorization: Basic **base64_encoded_credentials**' \
        -F 'grant_type="client_credentials"'
        
The response from the Identity Service REST holds a JWT to use with the Entitlement API Warranty Check call:

    {
    "access_token": "**access_token_value**",
    "token_type": "**access_token_type**",
    "expires_in": expiration_value,
    "scope": "read write",
    "cc_id": "client_id",
    "ga_id": "group_account_id",
    "sc_id": "security_context_id",
    "domain": "domain_name",
    "zip_authorities": "some_zip_authorities",
    "jti": "jti" 
    }