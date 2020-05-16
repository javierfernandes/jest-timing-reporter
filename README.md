# jest-timing-reporter

A Jest reporter that collects test execution time into snapshots files as JSON which can be used later with [jest-timing-action](https://github.com/javierfernandes/jest-timing-action).

# Usage

Install with

```bash
npm i --save-dev jest-timing-reporter
```

or 

```bash
yarn add -D jest-timing-reporter
```

Then edit the jest config in your `package.json` (if that's the case)

```json
{
  "jest": {
    "reporters": [
      "default",
      "jest-timing-reporter"
    ]
  },
}
```

Now you can run `yarn test` or `npm run test` and check that it generated tsnapshot files for each test file.
Make sure you have those files tracked in git.

# Output

It works pretty similar to jest's snapshots. Just that
* it will write snapshots on every run
* it won't check against the previous snapshot at all (that's done by [jest-timing-action](https://github.com/javierfernandes/jest-timing-action) for information purpose when comparing a PR against its base branch)
  
Here is an example folder structure showing the `__tsnapshots__` folder that contains each test file's snapshot

```bash
.
├── LICENSE
├── README.md
├── __tsnapshots__
│   └── index.test.tsnapshot
├── index.js
├── index.test.js
├── package.json
├── some
│   └── more
│       ├── __tsnapshots__
│       │   └── more.test.tsnapshot
│       ├── more.test.js
│       └── tests
│           ├── __tsnapshots__
│           │   └── good.test.tsnapshot
│           └── good.test.js
├── yarn-error.log
└── yarn.lock
```

# Further Work

Currently this is just a small script done as a proof-of-concept to explore jest, GH actions, GH API, etc. plus providing some basic "smoke-test" like information to try to detect changes that impact performance of your code.
For sure this could evolve to a much more useful "continuous code quality measure" solution.

* Handle tests being renamed
* Handle it being moved into a different describe or a new describe
* Handle file moved (remove old file)
* Handle file deleted (remove old file)