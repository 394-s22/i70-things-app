# i70-things

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode, in addition to installing all dependencies needed.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `yarn deploy`

Creates, builds, and deploys the app to Firebase (as long as it is configured).

## Setup for the app (required before it can run)

_Note: it is recommended that these secrets are storied in a .env file, not directly in the code_

### Installing Command line tools

https://firebase.google.com/docs/cli
This downloads the command line interface for firebase. This is necessary in order to deploy and build the app.

### API Keys

#### MapBox

https://docs.mapbox.com/help/glossary/access-token/
This link is how you generate an access token for MapBox. Then on line 10 of `src/routes/MapPage.tsx`, replace the placeholder with the newly generated access token.

#### Airtable

https://support.airtable.com/hc/en-us/articles/219046777-How-do-I-get-my-API-key-
This link is how you generate an API key for Airtable. On line 3 of `src/utils/airtable.ts`, replace the placeholder with the newly generated API key.

https://airtable.com/api
This link is how you get the base key for Airtable. On line 4 of `src/utils/airtable.ts`, replace the placeholder with the newly generated base key.
This link is also a great resource for any api questions.

#### CDOT Feed

https://www.cotrip.org/help/section/for-developers.html
This link is how you get the API Key for the CDOT. On line 9 of `backend/functions/src/index.ts`, replace the placeholder with the newly generated API Key.

#### Firebase

Alejandro is an owner for the i70-things app within firebase. The console can be accessed via console.firebase.com.
The firebase config is in `src/utils/firebase.ts`

We use firebase for the following:

- Hosting
- Storage (for images)
- Functions (see below)

##### Firebase functions

Firebase functions help us access the CDOT API while bypassing CORS restrictions. To deploy, change into the `backend/functions` directory and run `yarn deploy`

## Known Bugs

- Finding current location can be hindered based on browser or internet connection
  - Safari, Brave, or privacy based Chrome
- Anytime you go from feed to map, the map resets to the current location
- Mobile View:
  - Can't see map because directions panel is covering map

## Next steps

- Filtering the markers along route and direction
- Display weather conditions of each road
- Add 'Go' button to add turn-by-turn navigation
