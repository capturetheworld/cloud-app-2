import { subscribeValue, sendValue, __handleUpdate } from "../index.mjs"

export const runTest = () => {
  subscribeValue("shrewd-juice", (value) => {
    // console.log("shrewd-juice ", value);
  })
}

// subscribeValue("bar", (value) => {
//     console.log("bar ", value);
// })

// __handleUpdate({Circuit: {
//     targetLevel: 255
// }})
// sendValue();
