// jest.config.ts
export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',

    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': [
            'ts-jest',
            {
                useESM: false,
                isolatedModules: true,
                tsconfig: {
                    allowJs: true,
                    module: 'commonjs'
                }
            }
        ]
    },

    transformIgnorePatterns: [
        'node_modules/(?!(?:react-dnd|@react-dnd|dnd-core|react-dnd-html5-backend)/)'
    ],

    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts']
};
