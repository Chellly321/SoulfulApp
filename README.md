
#Installatiehandleiding 
#Soulful webapplicatie


#Inhoudsopgave

# Installatie Handleiding
## Installation manual Soulful Course Application
##Download Webstorm
## Clone the application
### ‘npm install’
# Database integration


# Installatie Handleiding
Als laatste gedeelte van dit project moest de installatie handleiding geschreven worden. Een installatie handleiding wordt geschreven voor de gebruiker van de applicatie, zodat hij/zij duidelijk weet allereerst hoe de applicatie werkt en daarnaast wat ervoor nodig is om de applicatie werkend te krijgen. Voor het schrijven van mijn handleiding heb ik gebruik gemaakt van de markdown functie. Ik heb hiervan gebruik gemaakt, omdat dit duidelijk leesbaar is en makkelijk toe te passen in mijn applicatie. Daarnaast wordt markdown ook aangeraden voor Readme Files voor github. 

Ik heb ervoor gekozen deze handleiding in het engels te schrijven, zodat het in de toekomst gelezen en toegepast kan worden door gebruikers vanuit de hele wereld. 

## Installation manual Soulful Application
This project was build with React, JavaScript, HTML and CSS as languages using the following tools:

Webstorm
React 
Node.js
Figma for the wireframes
MacOS Big Sur Version 11.6.8 (iMac 2017) 

# How to set it up

##Download Webstorm 

You can [download Webstorm] through this website: (https://www.jetbrains.com/webstorm/download/#section=mac)

This is an integrated development environment (IDE). It is used to build, edit or preview the code with: React, HTML, CSS and JavaScript. If you want to run this project, you can open webstorm (after it has finished downloading) and open the full file in your IDE.

## Clone the application 
Option A
There are different ways to clone a Git repository to your IDE (Webstorm in this case). Here you can choose the HTTPS option and click on the clipboard icon to copy the URL.
![Screen Shot 2022-10-03 at 12 50 29 AM](https://user-images.githubusercontent.com/87495212/193504108-f29eea65-c43b-4dd8-addf-a85b001d7bf4.png)

When you’ve done that, go to your IDE > click on ‘Get from VCS’ > paste the URL in the right section > and press “Clone” underneath.
![Screen Shot 2022-10-03 at 12 50 22 AM](https://user-images.githubusercontent.com/87495212/193504203-d2fd1f15-9014-442a-9d50-a130df88207f.png)


Option B
Download ZIP file; Open your IDE; Press open or go from the main menu > select File > New > Project from Existing Sources; Now select the ZIP file you’ve just downloaded and let it load onto your IDE.
![Screen Shot 2022-10-03 at 12 50 10 AM](https://user-images.githubusercontent.com/87495212/193504232-cc5506d2-5548-42aa-aaee-c3ab8da0b0fe.png)

##Getting Started with Create React App 

This project was bootstrapped with [Create React App] (https://github.com/facebook/create-react-app).

##Download Node.js

To download Node.js, you can use this link: (https://nodejs.org/en/download/)

Node.js is used to run scripts locally on your computer as a runtime environment and also as an open-source environment, through which you can install/import packages throughout your project. 

To  use Node.js as a runtime environment, you need to download it globally on your computer with the link given above. After downloading go back to the opened project in webstorm and open the console. 
Then you follow these steps: 
type: node -v
if node is on your computer, you will get a version verification like: v13.9.3. And if not, you will get something like: node: command not found
After that you want to check if NPM is included in the installation. To check this you type: npm -v
If included you should get another version number like: 6.4.1. If not, you would get a notification: npm: command not found. If this happens you have to download Node.js again. 

** Installing node.js is only needed once. After that, you’d never have to follow these steps again. 

Then type: npm install -g nodemon (this will prevent you from having to retype the full (node {project-name}.js) all the time. 

Then you type: nodemon {projectname}.js

To check if it actually worked you open the project, and put somewhere in the code console.log(“Yes, it’s working!”);

If this text appears in your terminal, then it’s all working! 

### ‘npm install’ 

When node.js is installed on your computer, you can download all the libraries into your project by entering “npm install” in your terminal. 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode. Here you can see what the application is looking like.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# Database integration 

To access the database you go to [firebase.com] (https://console.firebase.google.com/)

Inloggegevens voor gmail:
Email: michelle.reclame2@gmail.com
Wachtwoord: W3lkom-1234!

Hier kun je gebruik maken van de database, gebruikers verwijderen/toevoegen en content, verwijderen en aanpassen. 

