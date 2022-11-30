---
title: Overview
---

# Overview

The Warranty Check API can use your device’s serial number and optionally product number to retrieve the warranty and contract start date and end date.


### Warranty Check API
GET: https://api-gw.support.hpe.com/apigwext/support/entitlement/v1/warrantyCheck/sn{/pn}

### Field descriptions


|FIELD NAME|DESCRIPTION|VALUES|AVAILABILITY|
|--- |--- |--- |--- |
|sn|Serial number for the device being evaluated.||Mandatory|
|pn|Product number for the device being evaluated.||Optional|

### Return Codes

|HTTP STATUS CODE|DESCRIPTION|REASON|ACTION|
|--- |--- |--- |--- |
|200|API receives response|Successful response.|-|
|401|Unauthorized|Client is unauthenticated. Client must authenticate itself first to get the requested response. See “Accessing Entitlement API Warranty Check” section.|-|
|404|Not Found|The server cannot find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist, for example the requested SN/PN combination is not available. Example: {"id": "210", "idClass": "DatanotFound", "message": "Product number was not found"}|Inform support if there’s a concern|
|429|Too Many Requests|The user has sent too many requests in a given amount of time. Requests are blocked by rate limiting policy.|Retry operation after some delay|
|500||Server is aware that it has encountered an error or is incapable of fulfilling the request.|Inform support|

**Note:** 
-	The Warranty Check API will not provide support agreement information or Contract ID.
-	Warranties and contracts expired for over 12 months will not be listed.
-	The subscription type of contracts will not be listed.
-	Currently only single product look up is supported with the API.