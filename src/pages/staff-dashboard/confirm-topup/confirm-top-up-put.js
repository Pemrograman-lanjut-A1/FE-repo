async function confirmTopUpPut(topUpId){
    try {
        const response = await fetch('34.128.118.113/staff/confirm-topup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: topUpId
            }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // const data = await response.json();
        console.log("Confirm request called, id: ", topUpId);
    } catch (error) {
        console.error('Error:', error);
    }
}

export { confirmTopUpPut }; // Export the function