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
/cloud directory has latest main (as of this morning) PLUS helper and helper test and launch.json to help them test
/cloud-with-query has my code from last night as an example of using useMutation with optimistic responses (it's still a bit jittery)
