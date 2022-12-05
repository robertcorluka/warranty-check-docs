
## Accessing Warranty Check API

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

