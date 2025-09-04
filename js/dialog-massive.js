window.DialogMassive = (() => {
    function waitForElements(selectors, callback, interval = 100, timeout = 5000) {
        const start = Date.now();

        const timer = setInterval(() => {
            const elements = selectors.map(id => document.getElementById(id));
            const allReady = elements.every(el => el !== null);

            if (allReady) {
                clearInterval(timer);
                callback(...elements);
            } else if (Date.now() - start > timeout) {
                clearInterval(timer);
                console.warn("DialogMassive: elements not found in time");
            }
        }, interval);
    }

    return {
        init: () => {

            waitForElements(
                ["csv-input", "save-btn", "clear-btn", "columns-container", "table-container", "notification"],
                (csvInput, saveBtn, clearBtn, columnsContainer, tableContainer, notification) => {
                    console.log("All elements loaded!");
                    // now safe to use your logic

                    // Listen for paste events
                    csvInput.addEventListener('paste', function (e) {
                        setTimeout(processCSV, 100);
                    });

                    // Also process when user types (though CSV is typically pasted)
                    csvInput.addEventListener('input', processCSV);

                    // Clear button functionality
                    clearBtn.addEventListener('click', function () {
                        csvInput.value = '';
                        columnsContainer.innerHTML = '<div class="no-data">No CSV data pasted yet</div>';
                        tableContainer.innerHTML = '<p class="no-data">Data preview will appear here after pasting CSV</p>';
                    });

                    // Save button functionality
                    saveBtn.addEventListener('click', function () {
                        if (!csvInput.value.trim()) {
                            showNotification('Please paste some CSV data first', 'error');
                            return;
                        }

                        // In a real application, you would send data to a server here
                        // For this demo, we'll just show a success message
                        showNotification('CSV data saved successfully!', 'success');

                        // You could also download the data as a file
                        const data = csvInput.value;
                        const blob = new Blob([data], { type: 'text/csv' });
                        const url = URL.createObjectURL(blob);

                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'data.csv';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                    });

                    function processCSV() {
                        const csvData = csvInput.value.trim();

                        if (!csvData) {
                            columnsContainer.innerHTML = '<div class="no-data">No CSV data pasted yet</div>';
                            tableContainer.innerHTML = '<p class="no-data">Data preview will appear here after pasting CSV</p>';
                            return;
                        }

                        try {
                            // Parse CSV data
                            const rows = csvData.split('\n');
                            const headers = rows[0].split(',').map(header => header.trim());

                            // Display detected columns
                            columnsContainer.innerHTML = '';
                            headers.forEach(header => {
                                const columnEl = document.createElement('div');
                                columnEl.className = 'column';
                                columnEl.textContent = header;
                                columnsContainer.appendChild(columnEl);
                            });

                            // Create and display table
                            let tableHTML = '<table><thead><tr>';
                            headers.forEach(header => {
                                tableHTML += `<th>${header}</th>`;
                            });
                            tableHTML += '</tr></thead><tbody>';

                            for (let i = 1; i < Math.min(rows.length, 6); i++) {
                                if (rows[i].trim()) {
                                    tableHTML += '<tr>';
                                    const cells = rows[i].split(',').map(cell => cell.trim());
                                    cells.forEach(cell => {
                                        tableHTML += `<td>${cell}</td>`;
                                    });
                                    tableHTML += '</tr>';
                                }
                            }

                            tableHTML += '</tbody></table>';

                            if (rows.length > 6) {
                                tableHTML += `<p class="preview-note">Showing first 5 rows of ${rows.length - 1} rows</p>`;
                            }

                            tableContainer.innerHTML = tableHTML;

                        } catch (error) {
                            showNotification('Error parsing CSV data. Please check the format.', 'error');
                            console.error(error);
                        }
                    }

                    function showNotification(message, type) {
                        notification.textContent = message;
                        notification.className = `notification ${type}`;
                        notification.classList.add('show');

                        setTimeout(() => {
                            notification.classList.remove('show');
                        }, 3000);
                    }
                }
            );
        }
    };
})();
