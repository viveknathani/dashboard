const repositories = [
    {owner: 'viveknathani', repo: 'binge', workflows: ['lint', 'test']},
    {owner: 'viveknathani', repo: 'collector', workflows: ['build', 'deploy']},
    {owner: 'viveknathani', repo: 'delp', workflows: ['build', 'test']},
    {owner: 'viveknathani', repo: 'kkrh', workflows: ['lint-go', 'test-go', 'deploy-server']},
    {owner: 'viveknathani', repo: 'makesite', workflows: ['lint', 'test', 'release']},
]

const commonOptionsForRequests = {
    method: 'GET',
    headers: {
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
    }
}

async function getIssueAndPullCount(repository) {
    try {
      const url = `https://api.github.com/repos/${repository.owner}/${repository.repo}/issues` 
      const response = await fetch(url, commonOptionsForRequests);
      const data = await response.json();
      return data.length;
    } catch (err) {
        console.log(err);
    }
}

const repoTable = new Map();

async function prepareRepoTable() {

    for (const repository of repositories) {
        const repoTableValue = {
            issuesAndPulls: await getIssueAndPullCount(repository),
            workflows: repository.workflows
        }
        repoTable.set(`${repository.owner}/${repository.repo}`, repoTableValue);
    }
}

let table = document.getElementsByTagName('tbody')[0];

function prepareTableOnScreen() {

    repoTable.forEach((value, key) => {
        let row = document.createElement('tr');
        let repoName = document.createElement('td');
        let repoIssuesAndPulls = document.createElement('td');
        let repoWorkflows = document.createElement('td');
        value.workflows.forEach((workflow) => {
            let img = document.createElement('img');
            img.src = `https://github.com/${key}/actions/workflows/${workflow}.yaml/badge.svg`
            repoWorkflows.appendChild(img);
        });
        if (value.workflows.length === 0) {
            repoWorkflows.innerText = 'none';
        }
        repoName.innerText = key;
        repoIssuesAndPulls.innerText = value.issuesAndPulls;
        row.appendChild(repoName);
        row.appendChild(repoIssuesAndPulls);
        row.appendChild(repoWorkflows);
        table.appendChild(row);
    });
}

prepareRepoTable().then(() => prepareTableOnScreen()).catch((err) => console.log(err));

