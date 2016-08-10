{	
	'variables': {
		'blah': '<!(find app/plugins/native -not -path \"./**/node_modules/*\" -mindepth 2 -name binding.gyp | sed -e s/$/:*/)'
		#'app/plugins/native/node-addon/binding.gyp:* app/plugins/native/node-addon-Copy/binding.gyp:*'
	},
	
    'targets': [
        {
            'target_name': 'build_all',
            'type': 'none',
            'dependencies': [ 
				'<!@(find ./app/* -name binding.gyp -not -path \"./**/node_modules/*\" | sed -e s/$/:*/)'
			]
        }		

    ]
}