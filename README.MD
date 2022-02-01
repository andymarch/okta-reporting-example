# Okta Reporting Example

This example writes a report of the console listing all members of a given group, their administrative roles and the applications assigned.

> Sample output  
> User andy.march@okta.com  
> Has roles:  
>    Super Organization Administrator assigned by USER  
>    Super Organization Administrator assigned by GROUP  
> Has apps:  
>    Token Brand demo Example  
>    React Native Sample  
>    Okta Workflows  


## Setup 

Create a .env file with the following structure 

```
ORG=https://<yourorg>.okta.com
TOKEN=<an api token>
GROUP_ID=<the group to report on>
```

## Running
Ensure your environment file is set and that npm is installed.

```
npm install
npm run start
```

## Rate Limiting
This example uses the default rate limit implementation with the [node library](https://github.com/okta/okta-sdk-nodejs#rate-limiting). A more refined implementation would be to override the request executor to ensure that the report stays within a percentage threshold of the rate limit imposed.