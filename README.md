# graph-org-explorer-angular
This repo contains a simple AngularJS single-page application (SPA) to traverse organization structure from Office 365/Azure AD. It uses an implicit flow with Azure AD along with adal.js and adal-angular.js to authenticate a user and query Office 365/Azure AD with the Unified API (https://graph.microsoft.com).

## Environment Setup and Prerequisites ##
This solution was originally built in Visual Studio Code, script references imported using bower, and hosted using Superstatic. However, the files can be imported and used from any development environment. Office 365 applications are secured by Azure Active Directory, which comes as part of an Office 365 subscription. If you do not have an Office 365 subscription or have it associated with Azure AD, then you should follow the steps to [Set up your Office 365 development environment](https://msdn.microsoft.com/office/office365/HowTo/setup-development-environment "Set up your Office 365 development environment") from MSDN.

Additionally, the application traverses an orgnization structure, so it is helpful to have users in your directory with reporting structure. Reporting structure is driven by a manager field on the user object. If you are using this application in a development environment, I recommend provisioning some users and creating a reporting structure (tip: you can provision users in Azure AD without assigning them Office 365 licenses).

## Registering the App ##
When you register the application in Azure AD

## Updating the Scripts ##
