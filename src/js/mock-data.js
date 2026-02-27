
const vehicles = [
    {
        id: 1,
        model: "Toyota Camry",
        type: "Sedan",
        price: 50,
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=70",
        seats: 5,
        transmission: "Auto",
        fuel: "Petrol",
        description: "Comfortable sedan ideal for daily commuting and city travel."
    },
    {
        id: 2,
        model: "Honda CR-V",
        type: "SUV",
        price: 75,
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=70",
        seats: 5,
        transmission: "Auto",
        fuel: "Petrol",
        description: "Spacious SUV with extra room for luggage and family trips."
    },
    {
        id: 3,
        model: "Ford Mustang",
        type: "Sports",
        price: 120,
        image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=70",
        seats: 2,
        transmission: "Manual",
        fuel: "Petrol",
        description: "Performance sports car designed for an exciting driving experience."
    },
    {
        id: 4,
        model: "Toyota Hiace",
        type: "Van",
        price: 90,
        image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1200&q=70",
        seats: 12,
        transmission: "Auto",
        fuel: "Diesel",
        description: "High-capacity van for group transport and large luggage needs."
    },
    {
        id: 5,
        model: "BMW 3 Series",
        type: "Sedan",
        price: 110,
        image: "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1200&q=70",
        seats: 5,
        transmission: "Auto",
        fuel: "Petrol",
        description: "Premium sedan with refined comfort and smooth highway performance."
    },
    {
        id: 6,
        model: "Mercedes-Benz C-Class",
        type: "Sedan",
        price: 125,
        image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=70",
        seats: 5,
        transmission: "Auto",
        fuel: "Petrol",
        description: "Luxury sedan offering elegant styling and a quiet driving experience."
    },
    {
        id: 7,
        model: "Hyundai Tucson",
        type: "SUV",
        price: 85,
        image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=70",
        seats: 5,
        transmission: "Auto",
        fuel: "Petrol",
        description: "Versatile SUV with generous space for weekend trips and daily use."
    },
    {
        id: 8,
        model: "Nissan X-Trail",
        type: "SUV",
        price: 92,
        image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=1200&q=70",
        seats: 7,
        transmission: "Auto",
        fuel: "Petrol",
        description: "Family-friendly SUV with extra seating and improved comfort for long journeys."
    }
];

// Function to get vehicles (Simulates DB Query)
function getVehicles() {
    return vehicles;
}