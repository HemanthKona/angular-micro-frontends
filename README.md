# 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.2.

## Development server
Use below commands:
`npm run start:host`
`npm run start:remote`
`npm run start:remote2`
`npm run db`

## Steps to replicate the same setup:
1. Create new Angula project `ng new . --create-application=false`
2. Create new host application `ng g application host --inline-template --inline-style`

3. Install angular-architects/native-federation `npm i angular-architects/native-federation`

4. Set host app as a host `ng g @angular-architects/native-federation:init --project host --port 4200 --type dynamic-host`

5. create service to handle manifest loading and storing modules array

6. edit main.ts to fetch manifest

7. edit app component to fetch manifest and construct routes and call router.resetConfig with routes

8. run json server to serve module configuration `npx json-server data.json`

9. Add new remote app
    9.1. generate new app `ng g app remote-#`
    9.2. clean up remote-# app component styling and content
    9.3. add new run command to package.json
    9.4. configure default route for remote-#
    9.5. set remote app as a remote `ng g @angular-architects/native-federation:init --project remote-# --port 4201 --type remote`
    9.6. add remote-# to manifest in data.json
    9.7. add route to expose in federation.config.js of the remote # (for example: './Routes': '/apps/remote-#/src/app/app.routes')
Repeat step 9 for each new remote app.