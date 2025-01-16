let scripts = [];

// Charger les scripts depuis le localStorage
window.onload = function() {
    scripts = JSON.parse(localStorage.getItem('scripts') || '[]');
    displayScripts();
};

// Afficher les scripts
function displayScripts() {
    const scriptList = document.getElementById('script-list');
    scriptList.innerHTML = '';
    scripts.forEach((script, index) => {
        const item = document.createElement('div');
        item.className = 'script-item';
        item.innerHTML = `
            <div>
                <h3>${script.name}</h3>
                <p>${script.language} - ${script.description}</p>
            </div>
            <div>
                <button class="btn" onclick="copyScript(${index})">Copy</button>
                <a href="${script.file}" download="${script.name}" class="btn">Download</a>
            </div>
        `;
        scriptList.appendChild(item);
    });
}

// Copier un script
function copyScript(index) {
    navigator.clipboard.writeText(scripts[index].content)
        .then(() => alert('Script copied to clipboard!'))
        .catch(() => alert('Failed to copy script.'));
}

// Gérer l'upload de scripts
document.getElementById('upload-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('script-name').value;
    const language = document.getElementById('script-language').value;
    const description = document.getElementById('script-description').value;
    const file = document.getElementById('script-file').files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            const newScript = {
                name,
                language,
                description,
                file: URL.createObjectURL(file),
                content: reader.result
            };
            scripts.push(newScript);
            localStorage.setItem('scripts', JSON.stringify(scripts));
            alert('Script uploaded successfully!');
            window.location.href = 'index.html';
        };
        reader.readAsText(file);
    }
});
