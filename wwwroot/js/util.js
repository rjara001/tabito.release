// JavaScript code
window.topMenuJsFunctions = {
    submitLogOut: function (button) {
        button.click();
    }
};

function saveAsFile(fileName, byteBase64) {
    const link = document.createElement('a');
    link.download = fileName;
    link.href = 'data:application/octet-stream;base64,' + byteBase64;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};