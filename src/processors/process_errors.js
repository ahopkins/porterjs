// import {one} from '../public'

// export default function (processor) {
//     const type = typeof processor.errors
//     if (type == "object") {
//         for (let [key, value] of processor.errors) {
//             let element = one(`#${key}`)
//             if (element == null) {
//                 element = one(`#id_${key}`)
//             }

//             if (element) {
//                 for (let error of value){
//                     let htmlString = `<div class="error enter-flip">${error}</div>`
//                     element.insertAdjacentHTML('afterend', htmlString);
//                 }
//             } else {
//                 for (let error of value){
//                     new pNotify(`${error} (${key})`)
//                 }
//             }
//         }
//     }
//     // TODO:
//     // - Add support for arrays (publish somewhere generic place, maybe just console.log)
// }