{
  "targets": [
    {
      "target_name": "link-provider",
      "sources": [
        "LinkProvider.cpp"
      ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")"
      ]
    },
    {
      "target_name": "action_after_build",
      "type": "none",
      "dependencies": [
        "link-provider"
      ],
      "copies": [
        {
          "files": [
            "<(PRODUCT_DIR)/link-provider.node"
          ],
          "destination": "../../../native-artifacts/native-addons"
        }
      ]
    }
  ]
}
