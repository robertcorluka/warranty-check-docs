
## Accessing Warranty Check API

### Calling Identity service

Since all exposed API endpoints are secured, client must first obtain security JSON web token by invoking Identity service REST:

       curl -L -X POST '[https://api-gw.support.hpe.com/apigwext/services/oauth/token](https://api-gw.support.hpe.com/apigwext/services/oauth/token)' \
        -H 'Authorization: Basic **base64_encoded_credentials**' \
        -F 'grant_type="client_credentials"'
        
Response from Identity service REST holds JWT to use with Entitlement API Warranty Check call:

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
### Calling Warranty Check API
##### Call example

    curl -L -X GET '**{ENV}**/support/entitlement/v1/warrantyCheck/**serial_number**/**product_number**?cc=**US**&hsl=true&useCache=false&includeExpired=true' \ -H 'Authorization: **access_token_type** **access_token_value**'
    
##### Response example

    "entitlementBySnPnInstanceHSLList": [  
    {  
    "log_tracking_id": "Yuo5Kn7x5cS1ygGQK-d-EAAAADU", // ID used by support in case of error  
    "serialNumber": "**serial_number**",  
    "productNumber": "**product_number**",  
    "countryCode": "**US**",  
    **_// all support levels_**  
    "supportLevels": [  
    **_// active supportlevel_**  
    {  
    "serviceLevel": "Complete Care",  
    "serviceLevelRank": 1,  
    "contractLevel": "HPE Pointnext Complete Care",  
    "contractLevelRank": 1,  
    "startDate": "2019-11-01",  
    "endDate": "2023-10-31"  
    },  
    **_// expired supportlevel (includeExpired=true)_**  
    {  
    "serviceLevel": "Other Support",  
    "serviceLevelRank": 5,  
    "contractLevel": "Other Support",  
    "contractLevelRank": 1,  
    "startDate": "2019-11-01",  
    "endDate": "2021-10-31"  
    }  
    ],  
    **_// current highest support level (hsl=true)_**  
    "currentHighestSupportLevel": {  
    "serviceLevel": "Complete Care",  
    "contractLevel": "HPE Pointnext Complete Care"  
    }  
    }  
    ]  
    }

#### Response headers with rate limiting information

Rate limiting can be configured on different levels: year, month, day, hour, minute, second.

At least one limit is configured. Multiple limits can be configured.

##### Custom headers
|KEY|DESCRIPTION|EXAMPLE VALUE|
|--- |--- |--- |
|X-RateLimit-Limit-Year|Custom header holding rate limit information if it is configured.|10000|
|X-RateLimit-Remaining-Year|Custom header holding number of available requests if it is configured.|5471|
|X-RateLimit-Limit-Month|Custom header holding rate limit information if it is configured.|600|
|X-RateLimit-Remaining-Month|Custom header holding number of available requests if it is configured.|501|
|X-RateLimit-Limit-Day|Custom header holding rate limit information if it is configured.|200|
|X-RateLimit-Remaining-Day|Custom header holding number of available requests if it is configured.|155|
|X-RateLimit-Limit-Hour|Custom header holding rate limit information if it is configured.|100|
|X-RateLimit-Remaining-Hour|Custom header holding number of available requests if it is configured.|98|
|X-RateLimit-Limit-Minute|Custom header holding rate limit information if it is configured.|10|
|X-RateLimit-Remaining-Minute|Custom header holding number of available requests if it is configured.|7|
|X-RateLimit-Limit-Second|Custom header holding rate limit information if it is configured.|3|
|X-RateLimit-Remaining-Second|Custom header holding number of available requests if it is configured.|1|

###### Following headers are based on the Internet-Draft  RateLimit Header Fields for HTTP

|KEY|DESCRIPTION|EXAMPLE VALUE|
|--- |--- |--- |
|RateLimit-Limit|Allowed limit|100|
|RateLimit-Remaining|Number of available requests|98|
|RateLimit-Reset|The time remaining (in seconds) until the quota is reset|3422|