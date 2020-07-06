const spawn = require("child_process").spawn;
const schedule = require("node-schedule");

console.log(process.cwd());

schedule.scheduleJob("0 17 * * *", () => {
    console.log("Launching standings scrapper.\n");
    spawn("node", ["index.js"]);

})