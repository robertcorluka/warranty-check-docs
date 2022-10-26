---
title: Overview
---

# Overview

HPE provides services for an 'entitlement', which is a contract, warranty, or care pack for a group of products in a customer's environment. Entitlements are critical and are needed across all business units to ensure that HPE delivers what the customer has purchased from HPE in a consistent way.

The heart of the entitlement system is the Entitlement Engine, which provides clients with secure, scalable and performant access to consistent and accurate entitlement information.

The HPE Support Center Warranty Check API is used to retrieve the status of your warranty, including service type and level, coverage dates, deliverables, and other details associated with your warranty. (Entitlement information for the product instance Serial Number / Product Number acts as an interface to display entitlement information.)  

**Note:** The Warranty Check API does not retrieve support agreement information or subscription contracts.

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
