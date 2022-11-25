---
title: Overview
---

# Overview

The Warranty Check API can use your device’s serial number and optionally product number to retrieve the warranty and contract start date and end date.

**Note:** 
-	The Warranty Check API will not provide support agreement information or Contract ID.
-	Warranties and contracts expired for over 12 months will not be listed.
-	The subscription type of contracts will not be listed.
-	Currently only single product look up is supported with the API.

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
|2XX|API receives response|Successful response.|-|
|401|Unauthorized|Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.|-||404|Not Found|The server can not find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist.|-|
|429|Too Many Requests|The user has sent too many requests in a given period ("rate limiting").|Retry operation later|
|5XX||Response status codes beginning with the digit "5" indicate cases in which the server is either aware that it has encountered an error or is otherwise incapable of performing the request.|Inform support|
