// https://gist.github.com/op1ekun/b645fd91728a954c3cb37eb53c56ba07

export default function (ctx) {
  let calls = []
  let errorHandlers = []
  var ctx = ctx || null

  function addMiddleware(...args) {
    // Optimize for the most common case
    if (args.length === 1 && typeof args[0] === 'function') {
      this.push(args[0])
      
      return
    }
    
    // Handle the general case of many functions passed in
    args
      .filter(fn => { return typeof fn === 'function' })
      .forEach(fn => { this.push(fn) })
  }
  
  function use() {
    addMiddleware.apply(calls, Array.prototype.slice.call(arguments))
  }
  
  function err(...args) {
    addMiddleware.apply(errorHandlers, Array.prototype.slice.call(arguments))
  }

  function run(...args) {
    var done
    let stack = calls.slice()
    var lastExecutedFn
    
    if (typeof args[args.length - 1] === 'function') {
      done = args.pop()
    }

    if (!stack.length) {
      callDone()
      
      return
    }

    args.push(next)

    function exec() {
      try {
        lastExecutedFn = stack.shift()
        lastExecutedFn.apply(ctx, args)
      }
      catch (e) {
        // Call next() function with an error
        next(e)
      }
    }
    
    function callDone(error) {
      if (done) {
          done.call(ctx, error)
      }
    }

    function next(error, end) {
      if (end || (stack && !stack.length)) {
        stack = null
        
        callDone(error)
        
        return
      }
      
      if (error) {
        args.push(error)
        stack = errorHandlers.slice()
      }
      
      exec()
    }
      
    exec()
          
    // Detect missing call to next
    if (stack !== null && typeof lastExecutedFn === 'function') {
      console.warn(`Missing call to next()? Use next(null, true) to stop further processing in middleware: \n${lastExecutedFn.name == '' ? lastExecutedFn.toString() : lastExecutedFn.name}`)
    }
  }

  return {
    use,
    err,
    run
  }
}