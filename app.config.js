export default {
  expo: {
    //..other configs
    plugins: [
      [
        "expo-sqlite",
        {
          enableFTS: true,
          useSQLCipher: true,
          ios: {
            // Override shared configs for iOS if needed
            customBuildFlags: [
              "-DSQLITE_ENABLE_DBSTAT_VTAB=1 -DSQLITE_ENABLE_SNAPSHOT=1",
            ],
          },
        },
      ],
    ],
  },
};
