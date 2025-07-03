document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('dateInput');
    const convertBtn = document.getElementById('convertBtn');
    const resultSection = document.getElementById('resultSection');
    const errorSection = document.getElementById('errorSection');
    const unixResult = document.getElementById('unixResult');
    const utcResult = document.getElementById('utcResult');
    const errorMessage = document.getElementById('errorMessage');

    // Function to show results
    function showResult(data) {
        unixResult.textContent = data.unix;
        utcResult.textContent = data.utc;
        resultSection.style.display = 'block';
        errorSection.style.display = 'none';
    }

    // Function to show error
    function showError(message) {
        errorMessage.textContent = message;
        errorSection.style.display = 'block';
        resultSection.style.display = 'none';
    }

    // Function to hide all result sections
    function hideResults() {
        resultSection.style.display = 'none';
        errorSection.style.display = 'none';
    }

    // Function to convert date
    async function convertDate(dateString) {
        try {
            const url = dateString ? `/api/${encodeURIComponent(dateString)}` : '/api/';
            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                showResult(data);
            } else {
                showError(data.error || 'An error occurred');
            }
        } catch (error) {
            showError('Network error. Please try again.');
            console.error('Error:', error);
        }
    }

    // Event listener for convert button
    convertBtn.addEventListener('click', function() {
        const dateValue = dateInput.value.trim();
        convertDate(dateValue);
    });

    // Event listener for Enter key
    dateInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const dateValue = dateInput.value.trim();
            convertDate(dateValue);
        }
    });

    // Event listener for input changes (hide results when user starts typing)
    dateInput.addEventListener('input', function() {
        hideResults();
    });

    // Auto-convert current time when page loads
    window.addEventListener('load', function() {
        // Show current time as default
        convertDate('');
    });

    // Add some example click handlers for better UX
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'CODE' && e.target.textContent.includes('/api/')) {
            const example = e.target.textContent.replace('/api/', '').replace(' (current time)', '');
            dateInput.value = example;
            convertDate(example);
        }
    });
}); 