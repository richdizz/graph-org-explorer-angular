# graph-org-explorer-angular
This repo contains a simple AngularJS single-page application (SPA) to traverse organization structure from Office 365/Azure AD. It uses an implicit flow with Azure AD along with adal.js and adal-angular.js to authenticate a user and query Office 365/Azure AD with the Unified API (https://graph.microsoft.com).

![Org Explorer Angular](http://i.imgur.com/SF3oCeP.png)

## Environment Setup and Prerequisites ##
This solution was originally built in Visual Studio Code, script references imported using bower, and hosted using Superstatic. However, the files can be imported and used from any development environment. Office 365 applications are secured by Azure Active Directory, which comes as part of an Office 365 subscription. If you do not have an Office 365 subscription or have it associated with Azure AD, then you should follow the steps to [Set up your Office 365 development environment](https://msdn.microsoft.com/office/office365/HowTo/setup-development-environment "Set up your Office 365 development environment") from MSDN.

Additionally, the application traverses an organization structure, so it is helpful to have users in your directory with reporting structure. Reporting structure is driven by a manager field on the user object. If you are using this application in a development environment, I recommend provisioning some users and creating a reporting structure (tip: you can provision users in Azure AD without assigning them Office 365 licenses).

## Registering the App ##
Follow the steps outlined below to register the application in Azure Active Directory:

1.	Login to the Azure Management Portal at [https://manage.azurewebsites.net](https://manage.azurewebsites.net "https://manage.azurewebsites.net") using an account that has access to the O365 Organization’s Azure Active Directory 
2.	Click on the **ACTIVE DIRECTORY** option towards the bottom of the left side menu and select the appropriate directory in the directory listing (you may only have one directory
3.	Next, click on the **APPLICATIONS** link in the top tab menu to display a list of applications registered in the directory
4.	Click the **ADD** button in the middle of the footer (don’t confuse this with the +NEW button on the bottom left)
5.	In the **What do you want to do?** dialog, select **Add an application my organization is developing**
6.	Give the application a **NAME** (ex: Org Explorer) and select **WEB APPLICATION AND/OR WEB API** for the Type and then click the next arrow button
7.	For App properties, enter a **SIGN-ON URL** and **APP ID URL**. These values will likely be localhost address during testing/development (ex: http://localhost:8000)
8.	When the application finishes provisioning, click on the **CONFIGURE** link in the top tab menu
9.	Locate the **CLIENT ID** and copy its value somewhere sage
10.	Locate the permissions to other applications section and click on the Add application button to launch the Permissions to other applications dialog
11.	Locate and add **Office 365 unified API (preview)** before clicking the check button to close the dialog
12.	Add Delegated Permissions for **Access directory as signed-in user**
13.	Click the SAVE button in the footer to save the updated application permissions
14.	Click on the MANAGE MANIFEST button in the footer and then select Download Manifest to download the application manifest to a safe location
15.	Open the Application Manifest in Notepad and change the oauth2AllowImplicitFlow to true
16.	Save and close the Application Manifest before uploading it back into Azure by clicking the MANAGE MANIFEST button in the footer and selecting Upload Manifest

## Updating the Scripts ##
Once the application is registered and setup to support the implicit flow with Azure AD, you need to update the app/org.app.js file with your **tenant** and **clientId** for the app:

		adalProvider.init({
			instance: "https://login.microsoftonline.com/",
			tenant: "dxdemos.onmicrosoft.com",
			clientId: "0fe23ba5-f632-4a93-a898-b6b42adbfe2b",
			endpoints: {
				"https://graph.microsoft.com/": "https://graph.microsoft.com"
			}
		}, $httpProvider);