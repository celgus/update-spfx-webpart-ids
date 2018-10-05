/**
 * Shifts GUID of webparts to enable creeating a test package. GUID's must be lowercase.
 * DO NOT run this in your local folder, only for use in VSTS build!
 */
gulp.task("updateManifestIds", function () {
    return gulp.src("src/webparts/**/*.manifest.json", { base: "./" })
      .pipe(map(function (file, done) {
        let json = JSON.parse(file.contents.toString());
        console.log("Updating webpart for test: " + json.alias)
        let id = json.id.split("").reverse();
        let shiftCharacter = id[0];
        let newCharacter;
        if (!parseInt(shiftCharacter)) {
          newCharacter = shiftCharacter.charCodeAt() < 102 ? String.fromCharCode(shiftCharacter.charCodeAt() + 1) : "0";
        } else {
          newCharacter = shiftCharacter.charCodeAt() < 57 ? String.fromCharCode(shiftCharacter.charCodeAt() + 1) : "a";
        }
        id[0] = newCharacter;
        json.id = id.reverse().join("");
        file.contents = new Buffer(JSON.stringify(json));
        done(null, file);
      }))
      .pipe(gulp.dest("."));
  });