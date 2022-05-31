# dashboard

dashboard is a lightweight tool that helps me take a look at the status of all the open source projects I maintain, from a centralized place. 

It fetches the issue count and pull request count using the [GitHub API](https://docs.github.com/en/rest). For the workflows, it fetches the `badge.svg` file for each workflow. To add a repository for viewing in the dashboard, the `respositories` array in the [script.js](./script.js) file needs to be updated. 

## LICENSE

[MIT](./LICENSE)

