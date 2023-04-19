# cloud-demo

Demo Cloud App

## Linking query module (if necessary)

cd `/query`
`yarn link`
cd `/cloud`
`yarn link @domatic/query`

## Running the Basic Cloud Demo

cd to `/cloud`
`yarn install`
`yarn run start`

## Latest push notes:

https://github.com/jmbldwn/cloud-demo/tree/helper
/cloud directory has the `/api/index.js`

The sliderHelper runs a few calculations every couple of seconds querying the backend for slider information. You can import subscribeValue and sendValue.

subscribeValue(name, callback) //takes in a circuit name and callback (circuit name MUST mach a hub circuit name), callback function that figures out what to do with a RECEIVED value from the backend

sendValue(name, level) //makes a PUT request to our backend with the circuit name and a level.

VERY IMPORTANT NOTE: levels are 0-255 and MUST be sent to our functions as 0-255. We have left this as-is since the slider scale could be 0-100 or 0-10 or some other range, this is up for you to determine.
