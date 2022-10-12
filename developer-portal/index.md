---
title: Warranty Check API Overview
---

# Overview

An ‘Entitlement’ is the responsibility that HPE has to provide Services to a Customer for a group of Product Instances in their environment such as a contract, warranty or care pack. Entitlements are critical and are needed across all business units to ensure that we deliver what the customer has purchased from HPE in a consistent way.

The heart of the complex entitlement system is the Entitlement Engine that aims to provide a secure, scalable and performant access to a consistent, accurate, central cache of Entitlement information to clients.

HPE Support Center Warranty Check API (Warranty Check API) is used to retrieve the status of your warranty, including service type and level, coverage dates, deliverables, and other details associated with your warranty. (entitlement information for the product instance Serial Number / Product Number. It acts as an interface to get the entitlement information. 

Notice that Warranty Check API does not retrieve support agreement information and subscription contracts.

### Warranty Check API
GET: https://api-gw.support.hpe.com/apigwext/support/entitlement/v1/warrantyCheck/sn{/pn}

### Field descriptions


|FIELD NAME|DESCRIPTION|VALUES|AVAILABILITY|
|--- |--- |--- |--- |
|sn|Serial number for the device that being evaluated.||Mandatory|
|pn|Product number for the device being evaluated.||Optional|

### Return Codes

|HTTP STATUS CODE|DESCRIPTION|REASON|ACTION|
|--- |--- |--- |--- |
|2XX|API receives response|Successful response|-|
|401|Unauthorized|Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.|-||404|Not Found|The server can not find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist.|-|
|429|Too Many Requests|The user has sent too many requests in a given amount of time ("rate limiting").|Retry operation after some delay|
|5XX||Response status codes beginning with the digit "5" indicate cases in which the server is aware that it has encountered an error or is otherwise incapable of performing the request.|Inform the support|
