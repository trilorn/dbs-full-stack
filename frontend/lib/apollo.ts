import { withData } from 'next-apollo'
import { HttpLink } from 'apollo-boost'

const config = {
  link: new HttpLink({
    uri: 'http://backend:5000/graphql' // Server URL (must be absolute)
  })
}

export default withData(config)
