module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': 'E:/Webstorm Projects/unit-tests-lab1/src/$1',
        '\\.(css|less|sass|scss)$': 'E:/Webstorm Projects/unit-tests-lab1/src/__mocks__/styleMock.js', // додайте цю строку
    },
    setupFilesAfterEnv: ['E:/Webstorm Projects/unit-tests-lab1/src/setupTests.ts'],
};
