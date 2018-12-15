const presets = [
    [
        "@babel/env",
        {
            targets: {
                "ie": "7"
            },
            useBuiltIns: "entry",
        },
    ],
    [
        "@babel/preset-flow",
    ],
];

const plugins = [
    '@babel/plugin-proposal-class-properties'
];

module.exports = { presets, plugins };
