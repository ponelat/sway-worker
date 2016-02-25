var expect = require('expect.js')

describe('basics', function(){

  it('should return an error for invalid swagger', function(done){

    var worker = require('worker!../worker.js')

    worker.onmessage = function (msg) {
      try {
        expect(msg.data.errors.length).toEqual(1)
        expect(msg.data.errors[0].message).toMatch(/Unable to identify the Swagger version/)
        done()
      } catch(e) {
        done(e)
      }
    }

    worker.onerror = function (msg) {
      done(new Error(msg.errors))
    }

    worker.postMessage({definition: {}})

  })

  it('should return no errors for valid swagger spec', function(done){

    var worker = require('worker!../worker.js')

    worker.onmessage = function (msg) {
      try {
        expect(msg.data.errors.length).toEqual(0)
        done()
      } catch(e) {
        done(e)
      }
    }

    worker.onerror = done
    worker.postMessage({definition: { 
      swagger: '2.0',
      info: {
        title: 'Title',
        version: '1.0.0',
      },
      paths: {}
    }})

  })
})
