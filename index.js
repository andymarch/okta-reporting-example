require('dotenv').config()
const okta = require('@okta/okta-sdk-nodejs');

const customDefaultRequestExecutor = new okta.DefaultRequestExecutor({
    maxRetries: 2,
    requestTimeout: 0 // Specify in milliseconds if needed
  })

customDefaultRequestExecutor.on('backoff', (request, response, requestId, delayMs) => {
    console.log(`Backoff ${delayMs} ${requestId}, ${request.url}`);
});

customDefaultRequestExecutor.on('resume', (request, requestId) => {
    console.log(`Resume ${requestId} ${request.url}`);
});

const client = new okta.Client({
  orgUrl: process.env.ORG,
  token: process.env.TOKEN,
  requestExecutor: customDefaultRequestExecutor
});

client.listGroupUsers(process.env.GROUP_ID).each(async function (user){
    console.log("User "+ user.profile.login)

    console.log("Has roles: ")
    for await (let role of client.listAssignedRolesForUser(user.id)) {
        console.log("   "+role.label + " assigned by " +  role.assignmentType)
    }

    console.log("Has apps: ")
    for await (let app of client.listApplications({filter:'user.id eq "'+user.id+'"'})) {
        console.log("   "+app.label)
    }
})