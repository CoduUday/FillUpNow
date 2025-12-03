    // Hamburger menu
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Set minimum datetime to now
        const datetimeInput = document.getElementById('datetime');
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        datetimeInput.min = now.toISOString().slice(0, 16);
        datetimeInput.value = now.toISOString().slice(0, 16);

        // Price calculation
        const stationSelect = document.getElementById('station');
        const amountInput = document.getElementById('amount');
        const priceDisplay = document.getElementById('priceDisplay');
        const stationInfo = document.getElementById('stationInfo');

        function updatePrice() {
            const selectedOption = stationSelect.options[stationSelect.selectedIndex];
            if (selectedOption.value) {
                const pricePerKg = parseFloat(selectedOption.dataset.price);
                const amount = parseFloat(amountInput.value) || 0;
                const total = (pricePerKg * amount).toFixed(2);
                
                priceDisplay.textContent = `Total: ₹${total}`;
                
                // Show station info
                stationInfo.style.display = 'block';
                document.getElementById('distance').textContent = selectedOption.textContent.split(' - ')[1];
                document.getElementById('waitTime').textContent = selectedOption.dataset.wait;
            } else {
                priceDisplay.textContent = 'Select station to see price';
                stationInfo.style.display = 'none';
            }
        }

        stationSelect.addEventListener('change', updatePrice);
        amountInput.addEventListener('input', updatePrice);

        // Form submission
        const bookingForm = document.getElementById('bookingForm');
        const modal = document.getElementById('confirmationModal');

        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const selectedOption = stationSelect.options[stationSelect.selectedIndex];
            const pricePerKg = parseFloat(selectedOption.dataset.price);
            const amount = parseFloat(amountInput.value);
            const total = (pricePerKg * amount).toFixed(2);
            const bookingId = 'FUN' + Math.random().toString(36).substr(2, 9).toUpperCase();
            
            // Fill modal
            document.getElementById('bookingId').textContent = bookingId;
            document.getElementById('modalStation').textContent = selectedOption.textContent.split(' - ')[0];
            document.getElementById('modalAmount').textContent = amount;
            document.getElementById('modalPrice').textContent = total;
            document.getElementById('modalDateTime').textContent = new Date(datetimeInput.value).toLocaleString();
            document.getElementById('modalVehicle').textContent = document.getElementById('vehicle').value;
            
            modal.classList.add('active');
            bookingForm.reset();
            updatePrice();
        });

        function closeModal() {
            modal.classList.remove('active');
        }

        // Close modal on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });