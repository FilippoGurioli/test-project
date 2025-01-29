var publishCmd = `
IMAGE_NAME="filippogurioli/test-project"
docker build -t "$IMAGE_NAME:\${nextRelease.version}" .
docker push --all-tags "$IMAGE_NAME"
`
var config = require('semantic-release-preconfigured-conventional-commits');
config.plugins.push(
    [
        "@semantic-release/exec",
        {
            "publishCmd": publishCmd,
        }
    ],
    "@semantic-release/github",
    [
        "@semantic-release/git",
        {
            "assets": ["package.json", "package-lock.json", "CHANGELOG.md"],
            "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
        }
    ]
)
module.exports = config