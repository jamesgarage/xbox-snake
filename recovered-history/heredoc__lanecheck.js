/* lanecheck.js - runs in the extension's ISOLATED world (it needs chrome.runtime, which
   the MAIN-world rig scripts cannot see). Stamps two versions onto <html>:
     rigLoadedVersion - the manifest Chrome actually LOADED (cached until the extension
                        is reloaded at chrome://extensions)
     rigDiskVersion   - manifest.json fetched fresh from DISK
   The rig compares its own compiled-in RIG_VERSION against rigDiskVersion; a mismatch
   means the loaded build is stale. That mismatch has repeatedly masqueraded as a
   gameplay regression - now it names itself. */
(function () {
  try {
    var loaded = chrome.runtime.getManifest().version;
    document.documentElement.dataset.rigLoadedVersion = loaded;
    fetch(chrome.runtime.getURL('manifest.json'))
      .then(function (r) { return r.json(); })
      .then(function (m) { document.documentElement.dataset.rigDiskVersion = m.version; })
      .catch(function () { document.documentElement.dataset.rigDiskVersion = loaded; });
  } catch (e) {}
})();