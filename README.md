# electron-angular2-native

An easy to use, ready for distribution boilerplate for Electron applications which use Angular 2 along with native modules (node.js addons and regular native libraries).  
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
		
3. Install and run:  

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
	* Make sure you have `python` and appropriate `C\C++ compiler toolchain` installed as it described in **Installation** section of [node-gyp](https://github.com/nodejs/node-gyp).
	* From your bash (git-bash or similar) command line:  
		
		```bash
		# Install dependencies and run the app
		npm install && npm start
		```  
## To distribute

The application is packaged using [electron-packager](https://github.com/electron-userland/electron-packager) with NSIS installer.  
Run the following from the root folder to create a distribution for:
 - Windows 32 bit:  
	```bash
	npm run dist:win32
	```
 - Windows 64 bit:   
	```bash
	npm run dist:win64
	```  
	
## Useful links
 - [Electron documentation](http://electron.atom.io/docs/latest)
 - [Using native modules in Electron](https://github.com/electron/electron/blob/master/docs/tutorial/using-native-node-modules.md)
 - [Node.js module lookup mechanism with System.js](http://stackoverflow.com/questions/38747445/node-js-module-lookup-in-electronangular-2-typescript-application)
 - [Running binding.gyp in all subdirectories](http://stackoverflow.com/questions/38693619/node-gyp-run-binding-gyp-in-all-subdirectories)
 - [System.js plugin-node-binary](https://github.com/systemjs/plugin-node-binary)

## License [Apache](LICENSE.md)
