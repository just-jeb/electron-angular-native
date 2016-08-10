{
  "targets": [
    {
      "target_name": "StringProvider",
      "sources": [ "StringProvider.cpp" ],
      "include_dirs" : [
          "<!(node -e \"require('nan')\")"
      ]
    },
	
	{
      "target_name": "action_after_build",
      "type": "none",
      "copies": [
        {
          "files": [ "<(PRODUCT_DIR)/StringProvider.node" ],
          "destination": "."
        }
      ]
    }
  ]
}