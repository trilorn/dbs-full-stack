import {
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt
} from 'graphql'

import { getProducts, addProduct } from '../../db/products'

const productType = new GraphQLObjectType({
  name: 'Product',
  description: 'Product belong to a user',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'The name'
    },
    description: {
      type: GraphQLString,
      description: 'The description'
    },
    images: {
      type: new GraphQLList(GraphQLString),
      description: 'The product images'
    }
  })
})

const query = {
  products: {
    type: new GraphQLList(productType),
    args: {
      limit: {
        description: 'limit items in the results',
        type: GraphQLInt
      }
    },
    resolve: (root, { limit }) => getProducts(limit)
  }
}

const mutation = {
  addProduct: {
    type: productType,
    args: {
      name: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
      images: {
        type: new GraphQLList(GraphQLString)
      }
    },
    resolve: (obj, input) => addProduct(input)
  }
}

const subscription = {}

export const ProductSchema = {
  query,
  mutation,
  subscription,
  types: [productType]
}
