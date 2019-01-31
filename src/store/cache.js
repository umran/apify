const crypto = require('crypto')

module.exports = client => {
  get: async ({modelKey, args, options}) => {
    return await get({ modelKey, args, options })
  },
  
  set: async ({modelKey, args, options}, results) => {
    return await set({modelKey, args, options}, results)
  }
}

const get = req => {
  const key = constructKey(req)
  return new Promise((resolve, reject) => {
    var timeout = setTimeout(() => {
      reject(new Error('cache get timeout'))
      return
    }, 5000)

    client.hget(`gql:${key}`, 'data', (err, res) => {
      clearTimeout(timeout)

      if(err) {
        reject(err)
        return
      }

      resolve(JSON.parse(res))
    })
  })
}

const set = (req, results) => {
  const key = constructKey(req)
  const request = JSON.stringify(req)
  const data = JSON.stringify(results)
  const signature = crypto.createHash('sha256').update(data).digest('hex')

  return new Promise((resolve, reject) => {
    var timeout = setTimeout(() => {
      console.log('cache set timeout')
      reject(new Error('cache set timeout'))
      return
    }, 5000)

    client.hmset(`gql:${key}`, 'request', request, 'data', data, 'signature', signature, err => {
      clearTimeout(timeout)

      if(err) {
        console.log('cache set io error')
        reject(err)
        return
      }

      resolve()
    })
  })
}

const constructKey = req => {
  const query = JSON.stringify(req)
  return crypto.createHash('sha256').update(query).digest('hex')
}
