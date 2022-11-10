chrome.alarms.create({
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.local.get("mnemonic", (res) => {
    console.log(res.mnemonic);
  });
});
