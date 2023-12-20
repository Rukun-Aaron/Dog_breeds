document.getElementById('getVersionButton').addEventListener('click', getApiVersion);

async function getApiVersion() {

    const response = await fetch('http://localhost:8000/version');
    const data = await response.text();
    console.log(response);
    displayVersion(data);

}

function displayVersion(data) {
    const versionContainer = document.getElementById('versionContainer');
    versionContainer.textContent = `API Version: ${data}`;
}
