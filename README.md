# @jagodanastudios/saas-library

- Connection library for Any front-end to crm.jagodana.org

# how to push package to npmjs.com
- make build and validate types and exports are okay
```
npm run build
```

- create new version tag [like 1.0.0-sr.1], use below command to create
```
 npm version 1.0.0-sr.1 && git push origin && git push --tags
```

- push to npm
```
npm publish --access public
```