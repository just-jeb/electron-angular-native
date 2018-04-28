<a href="https://electronjs.org/"><img src="https://camo.githubusercontent.com/627c774e3070482b180c3abd858ef2145d46303b/68747470733a2f2f656c656374726f6e6a732e6f72672f696d616765732f656c656374726f6e2d6c6f676f2e737667" alt="Electron" height="50px"/></a>&nbsp;&nbsp;&nbsp;&nbsp;
<a href="https://github.com/electron/spectron"><img src="https://cloud.githubusercontent.com/assets/378023/15063284/cf544f2c-1383-11e6-9336-e13bd64b1694.png" alt="Electron" height="50px"/></a>&nbsp;&nbsp;
<a href="https://angular.io/"><img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="Angular" width="50px"/></a>&nbsp;&nbsp;[![GitHub version](https://badge.fury.io/gh/meltedspark%2Felectron-angular-native.svg)](https://badge.fury.io/gh/meltedspark%2Felectron-angular-native) [![GitHub license](https://img.shields.io/github/license/meltedspark/electron-angular-native.svg)](https://github.com/meltedspark/electron-angular-native/blob/master/LICENSE.md)

**Linux/Mac**: [![Build Status](https://travis-ci.org/meltedspark/electron-angular-native.svg?branch=master)](https://travis-ci.org/meltedspark/electron-angular-native)  **Windows**: [![Build status](https://ci.appveyor.com/api/projects/status/github/meltedspark/electron-angular-native?branch=master&svg=true)](https://ci.appveyor.com/project/meltedspark/electron-angular-native/branch/master)
 
Easy to use, ready for distribution boilerplate for Electron Angular applications supporting native code.  
Native code is supported in two different ways:
 - [native node.js addon](https://nodejs.org/api/addons.html) (.node) using [nan](https://github.com/nodejs/nan).  
   This is useful when you own the code and you want it to be part of the build.  
   In this case the native source code is part of your application code base and compiled with [node-gyp](https://github.com/nodejs/node-gyp).
 - Native library (.dll, .so or .dylib) using [node-ffi](https://github.com/node-ffi/node-ffi).  
   This is useful when you don't own the code of the native library or, alternatively, have another project which already compiles to a native library 
   and you want to utilize this library in your Electron application.  
   In this case you supply precompiled libraries and use them via Foreign Function Interface (**node-ffi**)

## Features

 - [Electron](http://electron.atom.io/) 1.8.2
 - [Spectron](https://github.com/electron/spectron) 3.8.0
 - [Angular](https://angular.io/) 5.2
 - [Angular CLI](https://cli.angular.io/) 1.6.8
 - [Angular AoT](https://angular.io/guide/aot-compiler) for production
 - [Typescript](https://www.typescriptlang.org/) 2.5.3
 - Native node.js addons (using [nan](https://github.com/nodejs/nan))
 - Native libraries support (using [node-ffi](https://github.com/node-ffi/node-ffi) 2.2.0)
 - Hot reload for development

## Getting ready

1. In order to clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer.   
   * **Node 9 is not supported yet** due to a [node-ffi issue](https://github.com/node-ffi/node-ffi/issues/438) 
   * **bash command line is required (use git-bash for windows)**
2. Clone the repository
	* If you're behind a corporate firewall configure `git` proxy:  
	
		```bash
		git config --global http.proxy http://proxy.company.com:port  
		git config --global https.proxy http://proxy.company.com:port  
		```
	* From your bash (git-bash or similar) command line:

		```bash
		# Clone this repository
		# git > 2.13
		git clone --recurse-submodules https://github.com/meltedspark/electron-angular-native
		# git <= 2.12
		git clone --recursive https://github.com/meltedspark/electron-angular-native
		# Go into the repository
		cd electron-angular-native
		```  
		
3. Prepare the environment  

	* If you're behind a corporate firewall configure `npm` proxy:  
		
		```bash
		npm config set proxy http://proxy.company.com:port  
		npm config set https-proxy http://proxy.company.com:port
		```
	* **EXTREMELY IMPORTANT**: Make sure you have `python v2.7` and appropriate `C\C++ compiler toolchain` installed:
	
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
		# Install dependencies
		npm install
		```  
		
## Application structure

 - All the source code resides in `src/` directory
 - All the native source code resides in `src/native/` directory (a new native source code shall be put there as well)
 - Precompiled binaries (`simplelib`) are fetched from [another git repository](https://github.com/meltedspark/electron-angular-native-simplelib-bin) as git submodule and can be found in `native-artifacts/precompiled-libraries` directory.  
   If you have any precompiled binaries you'd like to use in your project just put them inside this directory, while keeping platform and architecture subdirectories same to the `simplelib`.
 - Native artifacts that were compiled from the source code as part of the build can be found in `native-artifacts/native-addons` directory (first time compiled on `npm install`)
  
## Application info
You can define application name, version, author and runtime node dependencies in `app.package.js`  

## Development

- **Running application in debug mode:**

	```bash
	npm start
	```
  
	This will run your Electron Angular application in watch mode, i.e. if you change any `.ts` file the application will reload the changes automatically.  
	The application starts with debug tools open so that you can place breakpoints and debug your Typescript code.  
	
	**Note** *that first time you run `npm start` the application might open with console error saying "Not allowed to load local resource: file:///.../electron-angular-native/serve/index.html".  
	The reason for that is that webpack compilation and electron serve run simultaneously and the application starts before the code is ready.  
	All you need to do is wait - once the compilation is complete the application will reload with the compiled code.*
	
- **Compiling native code:** 

	Native code is not compiled on every `npm start` (it's only compiled on `npm install` and before the distribution), but if you want to recompile it, run the following command from your *bash* command line:  

	```bash
	npm run compile:native
	```

- **Running end to end tests with Spectron:**  

	To run end to end tests use the following command:
	
	```bash
	npm run e2e
	``` 
	This will run all the tests in `e2e` directory (the tests extension must be `.e2e-spec.ts`).  
	For your convenience there is a helper class `SpectronUtils` which can be used for tests definition and two test examples:
	
	 - `native-links.e2e-spec.ts` verifies that the links that loaded from native modules present upon the application start
	 - `sanity.e2e-spec.ts` verifies that the application starts
	
- **AoT build:**  

  Sometimes you want to make sure your code compiles with AoT compiler during the development.  
  In order to do that use the following command:  
  
  ```bash
  npm run build
  ```
  
  If you want to *run* the application in product mode (built with AoT) use this:
  
  ```bash
  npm run start:prod
  ```
  
## Distribution

 - Run the following from the root folder to create a distribution for:  
  
   - Current platform:
    
     ```bash
     npm run dist
	- Windows 32 bit:  
 
		```bash
		npm run dist:windows:32
	- Windows 64 bit:   
 
		```bash
		npm run dist:windows:64
	 - Linux 32 bit:
	
		```bash
		npm run dist:linux:32
	- Linux 64 bit:
	
		```bash
		npm run dist:linux:64
	- OSX:
	
		```bash
		npm run dist:osx
 - Be aware that cross-platform builds are [performed](https://www.electron.build/multi-platform-build) on remote server
 - Distributed application is built in production mode (to benefit from [Angular AoT](https://angular.io/guide/aot-compiler)).  
   If for some reason you want it in dev mode (JIT), run `npm run dist:dev` 
 - Build artifact can be found in build-artifacts folder
 
## Useful links
 - [Electron documentation](http://electron.atom.io/docs/latest)
 - [Using native modules in Electron](https://github.com/electron/electron/blob/master/docs/tutorial/using-native-node-modules.md)
 - [Running binding.gyp in all subdirectories](http://stackoverflow.com/questions/38693619/node-gyp-run-binding-gyp-in-all-subdirectories)
