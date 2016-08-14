{
  "targets": [
    {
      "target_name": "string-provider",
      "sources": [ "StringProvider.cpp" ],
      "include_dirs" : [
          "<!(node -e \"require('nan')\")"
      ]
    },
	
	{
      "target_name": "action_after_build",
      "type": "none",
      "dependencies": ['string-provider'],
      "copies": [
        {
          "files": [ "<(PRODUCT_DIR)/string-provider.node" ],
          "destination": "."
        }
      ]
    }
  ]
}