import '@testing-library/jest-native/extend-expect'; // Para extender los matchers de testing-library

declare global {
  namespace jest {
    interface Matchers<R, T> {
      toHaveStyle(style: object): R;
    }
  }
}