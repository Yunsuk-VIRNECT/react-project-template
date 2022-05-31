module.exports = {
  roots: ['<rootDir>/tests/'],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transform TypeScript files using ts-jest
  },
  moduleNameMapper: {
    //alias
    '^@/(.*)$': '<rootDir>/src/$1',
    '^contexts/(.*)$': '<rootDir>/src/contexts/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',

    '^__utils__(.*)$': '<rootDir>/tests/__utils__$1',
    '^__mocks__(.*)$': '<rootDir>/tests/__mocks__$1',
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/__mocks__/fileMock.ts',
    // Handle CSS imports (without CSS modules)
    "^.+\\.(css|sass|scss|less)$": "<rootDir>/tests/__mocks__/styleMock.ts",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  reporters: ['default', 'jest-sonar'],
  testMatch: ['**/__tests__/*.spec.(js|ts|tsx)', '**/*.spec.(js|ts|tsx)'],

  // //@virnect/platform-auth module은 jest가 무시하도록 설정
  transformIgnorePatterns: ['node_modules/(?!@virnect/platform-auth/.*)'],
}
