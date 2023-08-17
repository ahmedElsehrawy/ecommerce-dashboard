import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($input: createUserInput!) {
    register(input: $input) {
      id
      firstName
      lastName
      email
      password
      balance
      phone
      token
      cart {
        id
      }
      createdAt
      updatedAt
    }
  }
`;

export const LOGIN = gql`
  mutation Login($input: loginInput!) {
    login(input: $input) {
      id
      firstName
      lastName
      email
      token
      role
    }
  }
`;

export const ME = gql`
  query User {
    user {
      id
      firstName
      lastName
      email
      balance
      phone
      role
    }
  }
`;

export const PRODUCTS = gql`
  query GetProducts($where: getProductsInput!, $skip: Int!, $take: Int!) {
    products(where: $where, skip: $skip, take: $take) {
      count
      nodes {
        id
        name
        description
        mainImage
        Gallery {
          id
          url
        }
        categoryId
        vendorId
        price
        discountId
        Inventory {
          id
          quantity
          size
          color
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const PRODUCT = gql`
  query Product($where: getProductInput!) {
    product(where: $where) {
      id
      name
      description
      mainImage
      price
      category {
        id
        name
      }
      Gallery {
        url
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProdcut(
    $input: updateProdcutInput!
    $productId: updateProdcutWhereUniqueId!
  ) {
    updateProdcut(input: $input, productId: $productId) {
      id
      name
      description
      mainImage
      price
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation createProduct($input: createProductInput!) {
    createProduct(input: $input) {
      id
      name
      description
      mainImage
      Gallery {
        id
        url
      }
    }
  }
`;

export const CATEGORIES = gql`
  query Categories($skip: Int!, $take: Int!, $name: String) {
    categories(skip: $skip, take: $take, name: $name) {
      count
      nodes {
        id
        name
        ownerId
      }
    }
  }
`;

export const CATEGORY = gql`
  query GetOneCategory($where: getOneCategoryWhereUniqueInput!) {
    getOneCategory(where: $where) {
      id
      name
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: createCategoryInput!) {
    createCategory(input: $input) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory(
    $input: updateCategoryInput!
    $where: updateCategoryWhereUniqueInput!
  ) {
    updateCategory(input: $input, where: $where) {
      id
      name
    }
  }
`;

export const ORDERS = gql`
  query VendorOrders($skip: Int!, $take: Int!) {
    vendorOrders(skip: $skip, take: $take) {
      count
      nodes {
        id
        orderStatus
        totalPrice
        userId
        user {
          id
          firstName
          lastName
        }
        address {
          country
          city
          postalCode
          telephone
          street
          houseNumber
        }
        OrderItem {
          id
          product {
            id
            name
            description
            mainImage
            Gallery {
              id
              url
            }
          }
          quantity
        }
        createdAt
      }
    }
  }
`;

export const CREATE_DISCOUNT = gql`
  mutation CreateDiscount($input: createDiscountInput!) {
    createDiscount(input: $input) {
      id
      name
      percent
      active
      createdAt
      vendorId
    }
  }
`;

export const DISCOUNTS = gql`
  query Query($skip: Int!, $take: Int!) {
    discounts(skip: $skip, take: $take) {
      count
      nodes {
        id
        name
        percent
        active
        createdAt
      }
    }
  }
`;

export const DISCOUNT = gql`
  query GetDiscount($where: updateDiscountWhereUniqueInput!) {
    getDiscount(where: $where) {
      id
      percent
      name
      active
    }
  }
`;

export const UPDATE_DISCOUNT = gql`
  mutation UpdateDiscount(
    $input: updateDiscountInput!
    $where: updateDiscountWhereUniqueInput!
  ) {
    updateDiscount(input: $input, where: $where) {
      id
      name
      percent
      active
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($input: resetPaswwordInput!) {
    resetPassword(input: $input) {
      id
      firstName
      lastName
      email
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($where: getProductInput!) {
    deleteProduct(where: $where) {
      id
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($where: getOneCategoryWhereUniqueInput!) {
    deleteCategory(where: $where) {
      id
    }
  }
`;

export const DELETE_DISCOUNT = gql`
  mutation DeleteDiscount($where: deleteDiscountWhereUniqeInput!) {
    deleteDiscount(where: $where) {
      id
    }
  }
`;
