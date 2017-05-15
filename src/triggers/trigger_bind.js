// import {one, all, stack} from '../public'

// export default function (element) {
//     const value = element.value
//     const name = element.getAttribute('data-bind')

//     if (element.type === 'checkbox') {
//         // const values = all(`[name=${element.name}]`).filter(x => console.log(x))
//         const values = Array.from(all(`[name=${element.name}]`)).filter(x => x.checked).map(x => x.value)
//         stack.set(name, values)
//     } else {
//         stack.set(name, value)
//     }
// }