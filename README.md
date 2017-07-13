# electron-angular-native

An easy to use, ready for distribution boilerplate for Electron applications which use Angular along with native modules (node.js addons and regular native libraries).  
The application has a pluggable structure and consists of list of strings, while each string is provided by a different plugin:
 - String provided by pure JS class
 - String provided by [native node.js addon](https://nodejs.org/api/addons.html) (.node) via proxy JS class
 - String provided by [native node.js addon](https://nodejs.org/api/addons.html) (.node) directly
 - String provided by native library (dll) via proxy JS class using [node-ffi](https://github.com/node-ffi/node-ffi)  

Plugins are loaded at runtime
## Features

 - [Electron](http://electron.atom.io/)
 - [Angular 2](https://angular.io/)
 - [System.js](https://github.com/systemjs/systemjs)
 - [Typescript](https://www.typescriptlang.org/)
 - [Node.js](https://nodejs.org/en/)
 - Native node.js addons (using [nan](https://github.com/nodejs/nan))
 - Native libraries support (using [node-ffi](https://github.com/node-ffi/node-ffi))

## To Use

1. To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. 
2. Clone the repository
	* If you're behind a corporate firewall configure `git` proxy:  
	
		```bash
		git config --global http.proxy http://proxy.company.com:port  
		git config --global https.proxy http://proxy.company.com:port  
		```
	* From your bash (git-bash or similar) command line:

		```bash
		# Clone this repository
		git clone https://github.com/meltedspark/electron-angular2-native
		# Go into the repository
		cd electron-angular2-native
		```  
		
3. Install and run  

	* If you're behind a corporate firewall configure `npm` and `.typingsrc` proxy:  
		
		```bash
		npm config set proxy http://proxy.company.com:port  
		npm config set https-proxy http://proxy.company.com:port
		```
		
		Edit `.typingsrc` file:  
	
		```bash
		proxy=http://proxy.company.com:port  
		rejectUnauthorized=false
		```
	* Make sure you have `python v2.7` and appropriate `C\C++ compiler toolchain` installed:
	
		> You will also need to install:
		> 
		>   * On Unix:
		>     * `python` (`v2.7` recommended, `v3.x.x` is __*not*__ supported)
		>     * `make`
		>     * A proper C/C++ compiler toolchain, like [GCC](https://gcc.gnu.org)
		>   * On Mac OS X:
		>     * `python` (`v2.7` recommended, `v3.x.x` is __*not*__ supported) (already installed on Mac OS X)
		>     * [Xcode](https://developer.apple.com/xcode/download/)
		>       * You also need to install the `Command Line Tools` via Xcode. You can find this under the menu `Xcode -> Preferences -> Downloads`
		>       * This step will install `gcc` and the related toolchain containing `make`
		>   * On Windows:
		>     * Option 1: Install all the required tools and configurations using Microsoft's [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools) using `npm install --global --production windows-build-tools` from an elevated PowerShell or CMD.exe (run as Administrator).
		>     * Option 2: Install tools and configuration manually:
		>       * Visual C++ Build Environment:
		>         * Option 1: Install [Visual C++ Build Tools](http://landinghub.visualstudio.com/visual-cpp-build-tools) using the **Default Install** option.
		>         * Option 2: Install [Visual Studio 2015](https://www.visualstudio.com/products/visual-studio-community-vs) (or modify an existing installation) and select *Common Tools for Visual C++* during setup. This also works with the free Community and Express for Desktop editions.
		> 
		>         > :bulb: [Windows Vista / 7 only] requires [.NET Framework 4.5.1](http://www.microsoft.com/en-us/download/details.aspx?id=40773)
		>       * Install [Python 2.7](https://www.python.org/downloads/) (`v3.x.x` is not supported), and run `npm config set python python2.7` (or see below for further instructions on specifying the proper Python version and path.)
		>       * Launch cmd, `npm config set msvs_version 2015`
		>		
		>     If the above steps didn't work for you, please visit [Microsoft's Node.js Guidelines for Windows](https://github.com/Microsoft/nodejs-guidelines/blob/master/windows-environment.md#compiling-native-addon-modules) for additional tips.
		> 
		> If you have multiple Python versions installed, you can set `npm`'s 'python' config key to the appropriate
		> value:
		> 
		> ``` bash
		> $ npm config set python /path/to/executable/python2.7
		> ```
		> 
		> Note that OS X is just a flavour of Unix and so needs `python`, `make`, and C/C++.
		> An easy way to obtain these is to install XCode from Apple,
		> and then use it to install the command line tools (under Preferences -> Downloads).
		> 
		
	* From your bash (git-bash or similar) command line:  
		
		```bash
		# Install dependencies and run the app
		npm install && npm start
		```  
		
## To distribute

The application is packaged using [electron-packager](https://github.com/electron-userland/electron-packager).  
 - Make sure you have installed [required system packages](https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build)
 - Run the following from the root folder to create a distribution for:
	- Windows 32 bit:  
 
		```bash
		npm run dist:win32
		```
	- Windows 64 bit:   
 
		```bash
		npm run dist:win64
		```  
	- Linux 32 bit:
	
		```bash
		npm run dist:linux32
		```	
	- Linux 64 bit:
	
		```bash
		npm run dist:linux64
		```			
	- OSX:
	
		```bash
		npm run dist:osx
		```	
	
## Useful links
 - [Electron documentation](http://electron.atom.io/docs/latest)
 - [Using native modules in Electron](https://github.com/electron/electron/blob/master/docs/tutorial/using-native-node-modules.md)
 - [Node.js module lookup mechanism with System.js](http://stackoverflow.com/questions/38747445/node-js-module-lookup-in-electronangular-2-typescript-application)
 - [Running binding.gyp in all subdirectories](http://stackoverflow.com/questions/38693619/node-gyp-run-binding-gyp-in-all-subdirectories)
 - [System.js plugin-node-binary](https://github.com/systemjs/plugin-node-binary)

## License [Apache](LICENSE.md)
