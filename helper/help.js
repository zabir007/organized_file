// helpFn
function helpFn() {
    console.log(`
    List of all commands:
        zed tree "directoryPath"
        zed organize "directoryPath"
        zed help
    `);
}

module.exports = {
    helpKeys: helpFn
}