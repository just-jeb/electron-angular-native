{
  "targets": [
    {
      "target_name": "build_all",
      "type": "none",
      "dependencies": [
        "<!@(find ./src/native* -name binding.gyp -not -path \"./**/node_modules/*\" | sed -e s/$/:*/)"
      ]
    }
  ]
}
