// script.js
async function getVersion() {
    
    const response = await fetch('http://127.0.0.1:6789/version');
    const version = await response.text();
    const versionContainer = document.getElementById("version");
    versionContainer.textContent = version;
}

getVersion();
