document.addEventListener('DOMContentLoaded', function () {
    // Helper function to calculate estimated delivery
    function calculateEstimatedDelivery(shippedOutDate, deliveryTime) {
        const days = parseInt(deliveryTime);
        const shippedDate = new Date(shippedOutDate);
        shippedDate.setDate(shippedDate.getDate() + days);

        const year = shippedDate.getFullYear();
        const month = String(shippedDate.getMonth() + 1).padStart(2, '0');
        const day = String(shippedDate.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    // Simulated local database of shipments
    const shipments = [
        {
            trackingId: 'FAST123456789',
            status: 'In Transit',
            destination: 'New York, USA',
            shippedOutDate: '2024-03-12',
            deliveryTime: '3 days',
            estimatedDelivery: calculateEstimatedDelivery('2024-03-12', '3 days'),
        },
        {
            trackingId: 'FAST987654321',
            status: 'Delivered',
            destination: 'Los Angeles, USA',
            shippedOutDate: '2024-03-07',
            deliveryTime: '3 days',
            estimatedDelivery: calculateEstimatedDelivery('2024-03-07', '3 days'),
        },
        {
            trackingId: 'FAST456789123',
            status: 'Out for Delivery',
            destination: 'Chicago, USA',
            shippedOutDate: '2024-03-09',
            deliveryTime: '3 days',
            estimatedDelivery: calculateEstimatedDelivery('2024-03-09', '3 days'),
        },
    ];

    // Get references to the input field and the track button
    const trackInput = document.querySelector('input[type="text"]');
    const trackButton = document.querySelector('button.bg-red-600');

    // Add an event listener to the "Track Now" button
    trackButton.addEventListener('click', function () {
        const trackingId = trackInput.value.trim();

        if (trackingId) {
            // Find the shipment in the local database
            const shipment = shipments.find((shipment) => shipment.trackingId === trackingId);

            if (shipment) {
                // Display the tracking result
                displayTrackingResult(shipment);
            } else {
                alert('Tracking ID not found. Please check your ID and try again.');
            }
        } else {
            alert('Please enter a valid tracking ID.');
        }
    });

    // Function to display the tracking result
    function displayTrackingResult(result) {
        // Create a modal to display the result
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 max-w-md w-full">
                <h2 class="text-xl font-bold mb-4">Tracking Result</h2>
                <p><strong>Tracking ID:</strong> ${result.trackingId}</p>
                <p><strong>Status:</strong> ${result.status}</p>
                <p><strong>Destination:</strong> ${result.destination}</p>
                <p><strong>Shipped Out Date:</strong> ${result.shippedOutDate}</p>
                <p><strong>Estimated Delivery:</strong> ${result.estimatedDelivery}</p>
                <button class="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Close</button>
            </div>
        `;

        // Add the modal to the body
        document.body.appendChild(modal);

        // Add an event listener to the close button
        const closeButton = modal.querySelector('button');
        closeButton.addEventListener('click', function () {
            document.body.removeChild(modal);
        });
    }
});