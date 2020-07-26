// 函数聚合
const add = (x, y) => x + y
const square = z => z * z

// 中间件的数目固定的,只能传两个
// // const fn = (x, y) => square(add(x, y))
// // console.log(fn(1, 2))

// 同步函数，挨个遍历执行即可：中间件的数目是不固定的，我们可以用数组来模拟
// const compose = (...[first, ...other]) => {
//   return (...args) => {
//     let ret = first(...args)
//     console.log(ret)
//     other.forEach(fn => {
//       ret = fn(ret)
//     })
//     return ret
//   }
// }
// const fn = compose(add, square)
// console.log(fn(1, 2))

/**
 * 异步中间件：上面的函数都是同步的，挨个遍历执行即可，如果是异步的函数呢，是一个
 * promise，我们要支持async + await的中间件，所以我们要等异步结束后，再执行下一个中间件
 */
// 递归
function compose (middlewares) {
  return function () {
    function dispatch (i) {
      let fn = middlewares[i]
      if (!fn) {
        return Promise.resolve()
      }
      return Promise.resolve(
        fn(function next (){
          return dispatch(i + 1)
        })
      )
    }
    return dispatch(0)
  }
}

// console.log('fn1')
// Promise.resolve(function() {
//   console.log('fn2')
//   console.log('end fn2')
// }).then(() => console.log('end fn1'))

async function fn1(next) {
  console.log('fn1')
  await next()
  console.log('end fn1')
}

async function fn2 (next) {
  console.log('fn2')
  await delay()
  await next ()
  console.log('end fn2')
}

function fn3 (next) {
  console.log('fn3')
}

function delay () {
  return new Promise ((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}

const middlewares = [fn1,fn2,fn3]
const finalFn = compose(middlewares)
finalFn()