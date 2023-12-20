// script.js
async function getVersion() {
    
    const response = await fetch('http://127.0.0.1:8000/version');
    console.log(response);
    const version = await response.text();
    console.log(version);
    const versionContainer = document.getElementById("version");
    versionContainer.textContent = version
}
getVersion();