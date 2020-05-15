# My Local Dev Scripts for Productivity

## Chome Extensions

### PR Reviewers
Our team has the workflow of assigning a directly responsible individual to review and sign off
on your PR. Then, we add everyone else on the team as reviewers so they're aware of the PR.
It can get tedious to look everyone up by name to add them. That's what this extension is here to address.

On pull request pages that belong to you and don't already have everyone added as a reviewer,
a "Add Reviewers" button will appear about the "Reviewers" section. Clicking that will add everyone
in your list as a reviewer.

Edit your reviewer list in the `background.js` file. [Here](https://github.com/roger-mo-gusto/local_dev_scripts/blob/a2ff3f97103a8aceb39f32e6fd86cf0b95441c77/chrome_extensions/pr_reviewers/background.js#L2)

### Distraction Delay
This extension adds a 15 second overlay to the websites that distract you from being productive.
Sure, it takes less than 15 seconds to disable the Chrome extension, but for the most part, I find
it's enough friction for me to realize I'm just looking for a distraction and get back to what I
was supposed to be doing.

Manage your website list in the `manifest.json` file. [Here](https://github.com/roger-mo-gusto/local_dev_scripts/blob/a2ff3f97103a8aceb39f32e6fd86cf0b95441c77/chrome_extensions/distraction_delay/manifest.json#L8)

### Install Instructions
- Clone this repo or download it as a zip
- Navigate to your Chrome Extensions (chrome://extensions)
- Enable `Developer mode` at the top right if not already enabled
- Click on `Load unpacked` at the top left
- Select the folder of the extension you want to load


## Terminal Scripts
