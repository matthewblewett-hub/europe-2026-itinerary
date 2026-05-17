const itinerary = [
  {
    id: "day-1",
    date: "Monday 18 May 2026",
    title: "Departure",
    overview: "Leave Franschhoek for the airport and catch the overnight flight.",
    bgImage: "assets/day1_bg_1778914424448.png",
    items: [
      {
        time: "Afternoon",
        title: "Leave Franschhoek for Airport",
        type: "travel",
        icon: "fa-car",
        description: "Drive to Cape Town International Airport.",
        mapLink: "https://maps.google.com/?q=Cape+Town+International+Airport"
      },
      {
        time: "Evening",
        title: "Flight - BA058",
        type: "flight",
        icon: "fa-plane-departure",
        description: "Overnight flight to London Heathrow. Booking Ref: X8NXN8",
        link: "https://www.britishairways.com/travel/managebooking/public/en_gb?bookingRef=X8NXN8"
      }
    ]
  },
  {
    id: "day-2",
    date: "Tuesday 19 May 2026",
    title: "Marlborough & Somerset",
    overview: "Arrival in UK, scenic drive, and exploring Somerset.",
    bgImage: "assets/day2_bg_1778914442648.png",
    items: [
      {
        time: "05:30",
        title: "Arrive: Heathrow Terminal 5",
        type: "flight",
        icon: "fa-plane-arrival",
        description: "Immigration, luggage, coffee."
      },
      {
        time: "Morning",
        title: "Collect Avis Rental Car",
        type: "car",
        icon: "fa-car-side",
        description: "Collect car at T5."
      },
      {
        time: "Morning",
        title: "Drive: Heathrow → Marlborough",
        type: "travel",
        icon: "fa-route",
        description: "Distance: ~120 km / 75 mi. Drive Time: ~1 hr 20 mins.",
        mapLink: "https://maps.google.com/?q=Marlborough,+UK"
      },
      {
        time: "Breakfast",
        title: "Breakfast Stop: Marlborough",
        type: "food",
        icon: "fa-coffee",
        description: "Beautiful English market town directly on route. 45–60 mins: coffee + breakfast walk.",
        mapLink: "https://maps.google.com/?q=Marlborough,+UK"
      },
      {
        time: "Late Morning",
        title: "Drive: Marlborough → Bruton",
        type: "travel",
        icon: "fa-route",
        description: "Distance: ~88 km / 55 mi. Drive Time: ~1 hr 15 mins.",
        mapLink: "https://maps.google.com/?q=Bruton,+UK"
      },
      {
        time: "Afternoon",
        title: "Visit: The Newt in Somerset",
        type: "activity",
        icon: "fa-leaf",
        description: "Explore the gardens, farm shop, and woodland walks.",
        link: "https://thenewtinsomerset.com/",
        mapLink: "https://maps.google.com/?q=The+Newt+in+Somerset"
      },
      {
        time: "Night",
        title: "Accommodation: At The Chapel",
        type: "hotel",
        icon: "fa-bed",
        description: "Check-in and dinner at The Chapel. Booking Ref: DBM399525542786071",
        link: "https://guest.eu.guestline.app/SOCATC?reservationNumber=DBM399525542786071&familyName=Blewwtt&linkOrigin=dbm-booking-confirmation",
        mapLink: "https://maps.google.com/?q=At+The+Chapel,+Bruton"
      }
    ]
  },
  {
    id: "day-3",
    date: "Wednesday 20 May 2026",
    title: "Stonehenge & London West-End",
    overview: "Stonehenge visit, return to London, and West-End show.",
    bgImage: "assets/day3_bg_1778914464506.png",
    items: [
      {
        time: "Morning",
        title: "Relaxed Somerset Morning",
        type: "activity",
        icon: "fa-sun",
        description: "Optional: breakfast, photography/shopping in Bruton."
      },
      {
        time: "10:00",
        title: "Depart Bruton",
        type: "travel",
        icon: "fa-car",
        description: "Drive: Bruton → Stonehenge. Distance: ~70 km / 43 mi. Drive Time: ~1 hr."
      },
      {
        time: "11:00",
        title: "Visit: Stonehenge",
        type: "activity",
        icon: "fa-landmark",
        description: "Short scenic stop only: viewpoint, short walk.",
        link: "https://www.english-heritage.org.uk/visit/places/stonehenge/",
        mapLink: "https://maps.google.com/?q=Stonehenge"
      },
      {
        time: "Lunch",
        title: "Lunch: Salisbury",
        type: "food",
        icon: "fa-utensils",
        description: "Excellent cathedral town for: relaxed lunch, quick stroll, coffee.",
        mapLink: "https://maps.google.com/?q=Salisbury,+UK"
      },
      {
        time: "Afternoon",
        title: "Return to Heathrow",
        type: "travel",
        icon: "fa-route",
        description: "Drive: Stonehenge/Salisbury → Heathrow T5. Distance: ~120 km / 75 mi. Drive Time: ~1 hr 45 mins to 2 hrs."
      },
      {
        time: "Afternoon",
        title: "Return Avis Car",
        type: "car",
        icon: "fa-car-side",
        description: "Return car at Heathrow T5."
      },
      {
        time: "Afternoon",
        title: "Heathrow → Central London",
        type: "travel",
        icon: "fa-train",
        description: "Underground - Piccadilly Line. 50-55 min."
      },
      {
        time: "Check-in",
        title: "Check-in at Zedwell Hotel",
        type: "hotel",
        icon: "fa-hotel",
        description: "Zedwell Hotel Piccadilly Circus. Booking Ref: 5275680881",
        link: "https://secure.booking.com/myreservations.html?bn=5275680881",
        mapLink: "https://maps.google.com/?q=Zedwell+Hotel+Piccadilly+Circus"
      },
      {
        time: "18:15",
        title: "Light Drinks",
        type: "food",
        icon: "fa-glass-martini-alt",
        description: "Pre-show drinks."
      },
      {
        time: "19:30",
        title: "West-End Show: Operation Mincemeat",
        type: "activity",
        icon: "fa-ticket-alt",
        description: "Operation Mincemeat at Fortune Theatre. ATG Order: 40349022",
        link: "https://www.atgtickets.com/",
        mapLink: "https://maps.google.com/?q=Fortune+Theatre+London"
      },
      {
        time: "22:00",
        title: "Late Dinner: Brasserie Zédel",
        type: "food",
        icon: "fa-utensils",
        description: "Late dinner followed by relaxed Piccadilly/Covent Garden walk, London lights, easy short walk back to hotel.",
        link: "https://www.brasseriezedel.com/"
      }
    ]
  },
  {
    id: "day-4",
    date: "Thursday 21 May 2026",
    title: "London & Eurostar to Rotterdam",
    overview: "Morning run and sightseeing in London, afternoon Eurostar to Rotterdam, and evening train to Haarlem.",
    bgImage: "assets/day4_bg.png",
    items: [
      {
        time: "07:00",
        title: "Morning Run",
        type: "activity",
        icon: "fa-running",
        description: "Run through Green Park & St James Park."
      },
      {
        time: "08:00",
        title: "Breakfast",
        type: "food",
        icon: "fa-coffee",
        description: "WatchHouse Covent Garden.",
        mapLink: "https://maps.google.com/?q=WatchHouse+Covent+Garden"
      },
      {
        time: "09:00",
        title: "Tube to Tower Bridge",
        type: "travel",
        icon: "fa-subway",
        description: "Take the London Underground to Tower Bridge."
      },
      {
        time: "09:30",
        title: "Tower Bridge & St Katharine Docks",
        type: "activity",
        icon: "fa-monument",
        description: "Explore Tower Bridge, then walk to St Katharine Docks.",
        mapLink: "https://maps.google.com/?q=Tower+Bridge"
      },
      {
        time: "12:30",
        title: "Travel to St Pancras",
        type: "travel",
        icon: "fa-subway",
        description: "Make your way to St Pancras International."
      },
      {
        time: "14:00",
        title: "Check-in: Eurostar",
        type: "travel",
        icon: "fa-train",
        description: "Arrive for check-in to Eurostar to Rotterdam."
      },
      {
        time: "15:04",
        title: "Eurostar Departs",
        type: "travel",
        icon: "fa-train",
        description: "Train departs London St Pancras."
      },
      {
        time: "19:32",
        title: "Arrive Rotterdam",
        type: "travel",
        icon: "fa-train",
        description: "Arrive at Rotterdam Centraal."
      },
      {
        time: "20:00",
        title: "Train to Haarlem",
        type: "travel",
        icon: "fa-train",
        description: "Take the local train from Rotterdam to Haarlem."
      },
      {
        time: "Night",
        title: "Accommodation: Boutique Hotel Staats",
        type: "hotel",
        icon: "fa-bed",
        description: "Check-in and stay overnight.",
        mapLink: "https://maps.google.com/?q=Boutique+Hotel+Staats+Haarlem",
        link: "https://hotelstaats.nl/"
      }
    ]
  },
  {
    id: "day-5",
    date: "Friday 22 May 2026",
    title: "Haarlem & Amsterdam",
    overview: "Morning in Haarlem, day trip to Amsterdam for canals and cycling.",
    bgImage: "assets/day5_bg.png",
    items: [
      {
        time: "07:00",
        title: "Morning Run",
        type: "activity",
        icon: "fa-running",
        description: "Run route: Staats → canals → Grote Markt → Spaarne River (optional windmill loop near Molen De Adriaan)."
      },
      {
        time: "08:00",
        title: "Breakfast in Haarlem",
        type: "food",
        icon: "fa-coffee",
        description: "Native Haarlem (Best Fit) or By Lima (Alternative)."
      },
      {
        time: "09:00",
        title: "Train to Amsterdam",
        type: "travel",
        icon: "fa-train",
        description: "Take the Intercity or Sprinter train from Haarlem Station to Amsterdam Centraal (approx. 15-20 mins)."
      },
      {
        time: "10:00",
        title: "Explore Amsterdam",
        type: "activity",
        icon: "fa-walking",
        description: "Suggested Flow: Central Station, Jordaan district, Nine Streets, Canal ring, Vondelpark cycle, Museumplein area."
      },
      {
        time: "11:00",
        title: "Bike Ride",
        type: "activity",
        icon: "fa-bicycle",
        description: "Rent bikes from MacBike or Black Bikes. Ride in Jordaan, Vondelpark, Oud-Zuid. Avoid commuter rush lanes initially."
      },
      {
        time: "13:00",
        title: "Lunch",
        type: "food",
        icon: "fa-utensils",
        description: "Pluk Amsterdam or canal-side at Café de Jaren."
      },
      {
        time: "15:00",
        title: "Canal Cruise",
        type: "activity",
        icon: "fa-ship",
        description: "Use 'Those Dam Boat Guys' for smaller, more personal boats. (Alternatives: Rijksmuseum, Anne Frank House exterior, Heineken terrace)."
      },
      {
        time: "18:00",
        title: "Return to Haarlem",
        type: "travel",
        icon: "fa-train",
        description: "Take the train from Amsterdam Centraal back to Haarlem Station."
      },
      {
        time: "19:00",
        title: "Dinner in Haarlem",
        type: "food",
        icon: "fa-utensils",
        description: "Restaurant ML (Best fit) or Toujours (More relaxed). Followed by an evening canal stroll."
      }
    ]
  },
  {
    id: "day-6",
    date: "Saturday 23 May 2026",
    title: "Dutch Countryside Day",
    overview: "Iconic Dutch day: Keukenhof gardens and exploring Leiden.",
    bgImage: "assets/day6_bg.png",
    items: [
      {
        time: "Morning",
        title: "Keukenhof Gardens",
        type: "activity",
        icon: "fa-seedling",
        description: "Take the Keukenhof Express Bus (50 or 850) from Haarlem Station. Spend 2.5–3 hours enjoying the beautiful gardens.",
        mapLink: "https://maps.google.com/?q=Keukenhof"
      },
      {
        time: "Lunch",
        title: "Lunch in Leiden",
        type: "food",
        icon: "fa-utensils",
        description: "Take Bus 854 from Keukenhof to Leiden Centraal. Lunch at Waag or Lot en de Walvis in Leiden."
      },
      {
        time: "Afternoon",
        title: "Explore Leiden",
        type: "activity",
        icon: "fa-walking",
        description: "Explore the canals, university atmosphere, hidden courtyards, and slower Dutch life."
      },
      {
        time: "Late Afternoon",
        title: "Zaanse Schans",
        type: "activity",
        icon: "fa-camera",
        description: "Train from Leiden Centraal to Zaandijk Zaanse Schans (via Amsterdam Sloterdijk). Return to Haarlem Station afterwards. If too rushed, skip this entirely."
      }
    ]
  },
  {
    id: "day-7",
    date: "Sunday 24 May 2026",
    title: "Rotterdam & Cruise",
    overview: "Train to Rotterdam and luggage storage.",
    bgImage: "assets/day7_bg.png",
    items: [
      {
        time: "09:00",
        title: "Train to Rotterdam",
        type: "travel",
        icon: "fa-train",
        description: "Take the direct Intercity train from Haarlem Station to Rotterdam Centraal (approx. 45-55 mins)."
      },
      {
        time: "Morning",
        title: "Rotterdam Centraal",
        type: "activity",
        icon: "fa-suitcase",
        description: "Store luggage if needed."
      }
    ]
  }
];
