# 📺 Smart TV Game Demo

## Project Description

Welcome to our Proof of Concept (POC) project aimed at testing the viability of creating a fun app for Smart TVs. This project is a parody of the classic Duck Hunt game for NES but with a twist – it features the faces of my kids! The app supports the Magic Control, allowing children to aim and hit targets. No engines were used; we relied solely on vanilla JavaScript.

## 📸 Snapshots 
[![Demo Video]([https://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg](https://github.com/rafaelboschini/smarttvgamedemo/blob/main/assets/screenshots/demo.png?raw=true))](https://www.youtube.com/watch?v=FYAAGnYKefk&ab_channel=RafaelBoschini)


## 🚀 Getting Started

### Installing the SDK

Follow the official webOS SDK installation steps:

[webOS TV SDK Installation Reference](https://webostv.developer.lge.com/develop/tools/cli-installation)

### Generating a Build

Run `ares-package .\` to generate a build.

### Testing on Emulator

Test your app on the emulator using:

`ares-launch -s 23 .\`

### Installing on Your TV

Run `ares-setup-device --list` to find your TV device. Once found, use the following command:

ares-install --device MyTV ./smarttvgamedemo_0.0.1_all.ipk

## Additional Information

For more detailed instructions and insights, refer to the [webOS TV CLI Introduction](https://webostv.developer.lge.com/develop/tools/cli-introduction) guide.

## 🧙 About the Author

Hi, I'm Rafael Boschini! I've been developing software for 20 years and have a passion for creating creative applications.

For more about me, visit my LinkedIn profile.

Connect with me on [LinkedIn](https://www.linkedin.com/in/rafael-boschini-5747311/).
