"scripts": {
    "build": "babel src --out-dir dist",
        "start": "node dist/index.js",
            "dev": "nodemon --exec npx babel-node src/index.js",
                "prettier": "prettier --config ./.prettierrc --write \"**/*.js\"",
                    "pretest": "eslint --ignore-path .gitignore .",
                        "postinstall": "rm -rf dist && yarn run build",
                            "lint": "yarn prettier --write --check --config ./.prettierrc \"**/*.js\" && eslint --fix ./src",
                                "release": "release-it patch --no-npm.publish"
}