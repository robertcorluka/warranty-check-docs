---
title: Overview
---

# Overview

The Warranty Check API can use your product’s serial number and optionally product number to check if it is supported along with the start and end dates.


### Warranty Check API
**GET:** https://api-gw.support.hpe.com/apigwext/support/entitlement/v1/warrantyCheck/sn{/pn}

### Field descriptions


|FIELD NAME|DESCRIPTION|VALUES|AVAILABILITY|
|--- |--- |--- |--- |
|sn|Serial number for the device being evaluated.||Mandatory|
|pn|Product number for the device being evaluated.||Optional|

### Return codes

|HTTP STATUS CODE|DESCRIPTION|REASON|ACTION|
|--- |--- |--- |--- |
|200|API receives response|Successful response.|-|
|401|Unauthorized|Client is unauthenticated. Client must authenticate itself first to get the requested response. See "Authentication and Authorization" tab.|-|
|404|Not found|The server cannot find the requested resource. This means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist, for example the requested SN/PN combination is not available. Example: {"id": "210", "idClass": "DatanotFound", "message": "Product number was not found"}|Contact [support](https://support.hpe.com/connect/s/sitesupport) |
|429|Too many requests|Client has sent too many requests in a given amount of time. Requests are blocked by rate limiting policy.|Retry later|
|500||Server is aware that it has encountered an error or is incapable of fulfilling the request.|Contact [support](https://support.hpe.com/connect/s/sitesupport)|

**Note:** 
-	Warranties and contracts expired for over 12 months are not listed.
-	The Warranty Check API does not provide support agreement information or Contract IDs.
-	The subscription type of contract is not listed.
-	Currently only single product look up is supported with the API.