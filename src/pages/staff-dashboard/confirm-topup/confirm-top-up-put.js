async function confirmTopUpPut(topUpId){
    console.log(localStorage.getItem('staffToken'))
    try {
        const response = await fetch('http://34.142.244.77/staff/confirm-topup', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('staffToken')}`
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