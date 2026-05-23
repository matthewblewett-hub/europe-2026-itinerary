const itinerary = [
  {
    id: "day-1",
    date: "Monday 18 May 2026",
    title: "Departure",
    overview: "Leave Franschhoek for the airport and catch the overnight flight.",
    bgImage: "assets/day1_bg_1778914424448.png",
    items: [
      {
        time: "15:45",
        title: "Leave Franschhoek (Home) for Airport",
        type: "travel",
        icon: "fa-car",
        description: "Drive to Cape Town International Airport.",
        mapLink: "https://maps.google.com/?q=Cape+Town+International+Airport"
      },
      {
        time: "18:50",
        title: "Flight - BA058",
        type: "flight",
        icon: "fa-plane-departure",
        description: "Overnight flight to London Heathrow. Booking Ref: X8NXN8 (Open BA IOS APP)",
        link: "https://www.britishairways.com/travel/managebooking/public/en_gb?bookingRef=X8NXN8",
        appLink: "baapp://"
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
        description: "Collect car at T5.",
        extraLinks: [
          { url: "assets/Avis_Confirmation.pdf", label: "Avis Booking PDF" }
        ]
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
        description: "Beautiful English market town directly on route. Top coffee pick: The Food Gallery (excellent coffee, end of High St) or Bunce's. 45–60 mins stop.",
        mapLink: "https://maps.google.com/?q=The+Food+Gallery+Marlborough,+UK"
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
        link: "https://guest.eu.guestline.app/SOCATC/reservations/ATC001070/roomPicks/1",
        mapLink: "https://maps.google.com/?q=At+The+Chapel,+Bruton",
        extraLinks: [
          { url: "assets/The_Chapel.pdf", label: "Booking Details PDF" }
        ]
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
        ticketLink: "https://www.english-heritage.org.uk/visit/places/stonehenge/prices-and-opening-times/",
        mapLink: "https://maps.google.com/?q=Stonehenge"
      },
      {
        time: "Lunch",
        title: "Lunch: Salisbury",
        type: "food",
        icon: "fa-utensils",
        description: "Light lunch suggestion near the Cathedral: Rifleman's Table (charming courtyard, lite bites) or The Refectory Restaurant (glass roof views of spire).",
        mapLink: "https://maps.google.com/?q=Rifleman's+Table+Salisbury,+UK"
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
        link: "https://secure.booking.com/confirmation.en-gb.html?label=the-chapel-lincolnshire-2OPh1en6YeL2DZe5bPvkNwS705842337285%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atiaud-2382347442888%3Akwd-2081490832028%3Alp1028951%3Ali%3Adec%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9YXdX6HrtnYy-Ml68sH-ljtU&sid=93414ccfffa220224c8a09accc34c602&aid=311984&auth_key=62QUZF9xdoS0pKTC&source=mytrips",
        mapLink: "https://maps.google.com/?q=Zedwell+Hotel+Piccadilly+Circus",
        appLink: "https://secure.booking.com/confirmation.en-gb.html?label=the-chapel-lincolnshire-2OPh1en6YeL2DZe5bPvkNwS705842337285%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atiaud-2382347442888%3Akwd-2081490832028%3Alp1028951%3Ali%3Adec%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9YXdX6HrtnYy-Ml68sH-ljtU&sid=93414ccfffa220224c8a09accc34c602&aid=311984&auth_key=62QUZF9xdoS0pKTC&source=mytrips"
      },
      {
        time: "17:30",
        title: "Classic Trafalgar Walk",
        type: "activity",
        icon: "fa-walking",
        description: "A beautiful early evening stroll: Walk south down Haymarket to Trafalgar Square. Sit by the fountains under Nelson's Column and snap a photo of Big Ben down Whitehall. From there, it's a short 10-minute walk northeast to your pre-show drinks.",
        mapLink: "https://www.google.com/maps/dir/Zedwell+Piccadilly+Circus,+London/Trafalgar+Square,+London/Covent+Garden+Social+Club,+London"
      },
      {
        time: "18:15",
        title: "Pre-Show Drinks",
        type: "food",
        icon: "fa-glass-martini-alt",
        description: "Great value near Fortune Theatre: Covent Garden Social Club (daily happy hour 'double up' deals till 8pm) OR Be At One (Russell St, iconic 2-for-1 cocktails). For pure historic atmosphere, try The Lamb and Flag.",
        mapLink: "https://maps.google.com/?q=Covent+Garden+Social+Club+London"
      },
      {
        time: "19:30",
        title: "West-End Show: Operation Mincemeat",
        type: "activity",
        icon: "fa-ticket-alt",
        description: "Operation Mincemeat at Fortune Theatre. See PDF with mincemeat tickets. ATG Order: 40349022. (Tip: There is a 15-20 min interval. You have already pre-ordered drinks, see PDF below!)",
        link: "https://www.atgtickets.com/",
        mapLink: "https://maps.google.com/?q=Fortune+Theatre+London",
        extraLinks: [
          { url: "assets/mincemeat_tickets.pdf", label: "Tickets PDF" },
          { url: "assets/Theatre_Order.pdf", label: "Pre-ordered Drinks PDF" }
        ]
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
        ticketLink: "https://www.towerbridge.org.uk/tickets",
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
        description: "Arrive for check-in to Eurostar to Rotterdam. (See Eurostar PDF for MJB and PMB)",
        extraLinks: [
          { url: "assets/Eurostar_Ticket_MJB.pdf", label: "Eurostar MJB" },
          { url: "assets/Eurostar_Ticket_PMB.pdf", label: "Eurostar PMB" }
        ]
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
        title: "Accommodation: Hotel 1635",
        type: "hotel",
        icon: "fa-bed",
        description: "Check-in and stay overnight.",
        mapLink: "https://maps.google.com/?q=Hotel+1635+Haarlem",
        link: "https://app.mews.com/navigator/homepage/953cd2cb-ada3-47b2-a494-b44d006db4c1",
        extraLinks: [
          { url: "assets/Haarlem_Booking.pdf", label: "Booking PDF" }
        ]
      }
    ]
  },
  {
    id: "day-5",
    date: "Friday 22 May 2026",
    title: "Haarlem & Amsterdam Classic Day",
    overview: "Morning run in Haarlem and a classic Amsterdam day: walking, cruising, and the Rijksmuseum.",
    bgImage: "assets/day5_bg.png",
    items: [
      {
        time: "07:00",
        title: "Morning Run from Staats",
        type: "activity",
        icon: "fa-running",
        description: "Route: Zijlstraat → Grote Markt → St. Bavo Church → Spaarne River → Molen De Adriaan."
      },
      {
        time: "08:00",
        title: "Breakfast in Haarlem",
        type: "food",
        icon: "fa-coffee",
        description: "Native or Mica Coffee bar."
      },
      {
        time: "08:45",
        title: "Train to Amsterdam",
        type: "travel",
        icon: "fa-train",
        description: "Take the train from Haarlem Station to Amsterdam Centraal (approx. 15-20 mins). Then grab a tram down to Museumplein."
      },
      {
        time: "10:00",
        title: "Rijksmuseum",
        type: "activity",
        icon: "fa-university",
        description: "Timed Entry at 10:00 AM. See The Night Watch, The Milkmaid, and Dutch masterpieces.",
        extraLinks: [
          { url: "assets/Museum_1.PNG", label: "Ticket 1" },
          { url: "assets/Museum_2.PNG", label: "Ticket 2" }
        ]
      },
      {
        time: "12:30",
        title: "Lunch & Vondelpark Stroll",
        type: "food",
        icon: "fa-utensils",
        description: "Brasserie van Baerle (Classic French-influenced) near Museumplein, followed by a relaxed stroll through the Vondelpark."
      },
      {
        time: "15:00",
        title: "Jordaan & 9 Streets Walk",
        type: "activity",
        icon: "fa-walking",
        description: "Walk north into the 9 Streets area and Jordaan. Best canal atmosphere, boutique shopping, and historic architecture."
      },
      {
        time: "17:30",
        title: "Dinner in Amsterdam",
        type: "food",
        icon: "fa-utensils",
        description: "Suggestions: Jansz. (Elegant, modern Dutch, canal-side at Pulitzer) OR De Struisvogel (Intimate, highly rated in 9 Streets) before the cruise."
      },
      {
        time: "19:15",
        title: "Evening Canal Cruise",
        type: "activity",
        icon: "fa-ship",
        description: "An atmospheric evening cruise through the illuminated canals.",
        extraLinks: [
          { url: "assets/Canal_1.PNG", label: "Cruise Ticket 1" },
          { url: "assets/Canal_2.PNG", label: "Cruise Ticket 2" }
        ]
      },
      {
        time: "21:00",
        title: "Train to Haarlem",
        type: "travel",
        icon: "fa-train",
        description: "Head back to Amsterdam Centraal to catch a late train back to Haarlem."
      }
    ]
  },
  {
    id: "day-6",
    date: "Saturday 23 May 2026",
    title: "Leiden & Countryside Cycling",
    overview: "Leiden canals, gardens, and a beautiful short cycle through the flower region.",
    bgImage: "assets/day6_bg.png",
    items: [
      {
        time: "08:00",
        title: "Coffee at Native",
        type: "food",
        icon: "fa-coffee",
        description: "Start the day with a fantastic coffee in Haarlem before heading to the station.",
        mapLink: "https://maps.google.com/?q=Native+Haarlem"
      },
      {
        time: "09:30",
        title: "Train to Leiden",
        type: "travel",
        icon: "fa-train",
        description: "Depart Haarlem Centraal for a quick 30-minute ride to Leiden."
      },
      {
        time: "10:00",
        title: "Molen de Valk (Windmill)",
        type: "activity",
        icon: "fa-camera",
        description: "Just 3 mins from the station. Great for exterior photos right on the canal edge.",
        mapLink: "https://maps.google.com/?q=Molen+de+Valk+Leiden"
      },
      {
        time: "10:30",
        title: "Hortus Botanicus Leiden",
        type: "activity",
        icon: "fa-leaf",
        description: "Walk down the Rapenburg canal to the stunning historic greenhouses and Japanese garden.",
        ticketLink: "https://hortusleiden.nl/en/plan-your-visit/tickets",
        mapLink: "https://maps.google.com/?q=Hortus+Botanicus+Leiden"
      },
      {
        time: "12:00",
        title: "Easy Fiets Rental",
        type: "activity",
        icon: "fa-bicycle",
        description: "Pick up bikes in the city center and cycle out into the Weipoort polders.",
        mapLink: "https://maps.google.com/?q=Easy+Fiets+Leiden"
      },
      {
        time: "12:45",
        title: "Cheese Farm & Polder Lunch",
        type: "food",
        icon: "fa-cheese",
        description: "Arrive at Boerderij 't Geertje or Kaasboerderij Van Veen in Zoeterwoude. Authentic cheese making, clogs, and farm animals. Buy local farmhouse cheese/bread for a picnic or eat at the farm restaurant.",
        mapLink: "https://maps.google.com/?q=Kaasboerderij+Zoeterwoude"
      },
      {
        time: "15:00",
        title: "The Burcht (Leiden Castle)",
        type: "activity",
        icon: "fa-monument",
        description: "Return bikes and climb the hidden stairs to this 11th-century keep for panoramic views over Leiden.",
        mapLink: "https://maps.google.com/?q=Burcht+van+Leiden"
      },
      {
        time: "16:00",
        title: "Canal Cruise",
        type: "activity",
        icon: "fa-ship",
        description: "A beautiful 1-hour cruise under Leiden's incredibly low bridges."
      },
      {
        time: "17:15",
        title: "Early Dinner / Drinks",
        type: "food",
        icon: "fa-utensils",
        description: "Find a table on the water along the Beestenmarkt or Aalmarkt for a relaxed evening.",
        mapLink: "https://maps.google.com/?q=Beestenmarkt+Leiden"
      },
      {
        time: "19:30",
        title: "Train to Haarlem",
        type: "travel",
        icon: "fa-train",
        description: "Head back to Haarlem to pack and prep for your Sunday transition."
      }
    ]
  },
  {
    id: "day-7",
    date: "Sunday 24 May 2026",
    title: "Rotterdam & Cruise",
    overview: "Train to Rotterdam, mini-visit, and boarding the Holland America Cruise.",
    bgImage: "assets/day7_bg.png",
    items: [
      {
        time: "08:00",
        title: "Breakfast and checkout",
        type: "food",
        icon: "fa-coffee",
        description: "Ask hotel to call taxi only if needed; otherwise walk to station."
      },
      {
        time: "09:00",
        title: "Train to Rotterdam",
        type: "travel",
        icon: "fa-train",
        description: "Train from Haarlem Station to Rotterdam Centraal. Allow 1h15–1h30 with luggage."
      },
      {
        time: "10:30",
        title: "Rotterdam Mini-Visit",
        type: "activity",
        icon: "fa-building",
        description: "Do one: Hotel New York / Kop van Zuid waterfront walk OR Markthal + Cube Houses."
      },
      {
        time: "12:00",
        title: "Holland America Cruise Boarding",
        type: "travel",
        icon: "fa-ship",
        description: "Get to Terminal for 15:00 departure. (See Cruise Boarding Pass PDF)",
        extraLinks: [
          { url: "assets/CRUISE_BOARDING_MJB.pdf", label: "Boarding Pass MJB" },
          { url: "assets/CRUISE_BOARDING_PMB.pdf", label: "Boarding Pass PMB" }
        ]
      }
    ]
  }
,

  {
    "id": "day-p2-1",
    "phase": "phase2",
    "date": "Sunday 24 May 2026",
    "title": "Boarding Norwegian Cruise",
    "overview": "Boarding the Holland America Cruise in Rotterdam.",
    "bgImage": "assets/rotterdam_cruise_bg_1778992332562.png",
    "items": [
      {
        "time": "Afternoon",
        "title": "Boarding",
        "type": "activity",
        "icon": "fa-ship",
        "description": "Board the Holland America cruise ship.",
        "extraLinks": [
          {
            "url": "assets/CRUISE_BOARDING_MJB.pdf",
            "label": "MJB Boarding Pass"
          },
          {
            "url": "assets/CRUISE_BOARDING_PMB.pdf",
            "label": "PMB Boarding Pass"
          }
        ]
      }
    ]
  },
  {
    "id": "day-p2-2",
    "phase": "phase2",
    "date": "Monday 25 May 2026",
    "title": "At Sea",
    "overview": "Cruising towards the Norwegian Fjords.",
    "bgImage": "",
    "items": [
      {
        "time": "All Day",
        "title": "At Sea",
        "type": "activity",
        "icon": "fa-water",
        "description": "Enjoy the ship amenities."
      }
    ]
  },
  {
    "id": "day-p2-3",
    "phase": "phase2",
    "date": "Tuesday 26 May 2026",
    "title": "Eidfjord & Hardangerfjord",
    "overview": "Exploring Eidfjord and Hardangerfjord.",
    "bgImage": "",
    "items": [
      {
        "time": "All Day",
        "title": "Eidfjord",
        "type": "activity",
        "icon": "fa-mountain",
        "description": "Scenic cruising and shore excursions."
      }
    ]
  },
  {
    "id": "day-p2-4",
    "phase": "phase2",
    "date": "Wednesday 27 May 2026",
    "title": "Alesund",
    "overview": "Visiting Alesund.",
    "bgImage": "",
    "items": [
      {
        "time": "All Day",
        "title": "Alesund",
        "type": "activity",
        "icon": "fa-city",
        "description": "Explore the Art Nouveau architecture."
      }
    ]
  },
  {
    "id": "day-p2-5",
    "phase": "phase2",
    "date": "Thursday 28 May 2026",
    "title": "Geiranger",
    "overview": "Geirangerfjord scenic cruising.",
    "bgImage": "",
    "items": [
      {
        "time": "All Day",
        "title": "Geiranger",
        "type": "activity",
        "icon": "fa-camera",
        "description": "Waterfalls and incredible fjord views."
      }
    ]
  },
  {
    "id": "day-p2-6",
    "phase": "phase2",
    "date": "Friday 29 May 2026",
    "title": "Bergen",
    "overview": "Exploring Bergen.",
    "bgImage": "",
    "items": [
      {
        "time": "All Day",
        "title": "Bergen",
        "type": "activity",
        "icon": "fa-home",
        "description": "Bryggen wharf and Mount Floyen."
      }
    ]
  },
  {
    "id": "day-p2-7",
    "phase": "phase2",
    "date": "Saturday 30 May 2026",
    "title": "At Sea",
    "overview": "Cruising back to Rotterdam.",
    "bgImage": "",
    "items": [
      {
        "time": "All Day",
        "title": "At Sea",
        "type": "activity",
        "icon": "fa-water",
        "description": "Final day at sea."
      }
    ]
  },
  {
    "id": "day-p3-1",
    "phase": "phase3",
    "date": "Sunday 31 May 2026",
    "title": "Rotterdam to Manchester",
    "overview": "Disembark cruise, fly to Manchester, pick up Indie Camper.",
    "bgImage": "",
    "items": [
      {
        "time": "Morning",
        "title": "Disembark Cruise",
        "type": "activity",
        "icon": "fa-ship",
        "description": "Disembark the cruise in Rotterdam."
      },
      {
        "time": "Midday",
        "title": "Flight to Manchester",
        "type": "flight",
        "icon": "fa-plane",
        "description": "Fly from Rotterdam to Manchester.",
        "extraLinks": [
          {
            "url": "assets/Flight_to_Manchester.pdf",
            "label": "Flight Details PDF"
          }
        ]
      },
      {
        "time": "Afternoon",
        "title": "Pick up Campervan",
        "type": "car",
        "icon": "fa-caravan",
        "description": "Collect the Indie Camper.",
        "extraLinks": [
          {
            "url": "assets/Indie_Docs.jpg",
            "label": "Indie Camper Docs"
          }
        ]
      },
      {
        "time": "Night",
        "title": "Arrive York (Rowntree Park)",
        "type": "hotel",
        "icon": "fa-campground",
        "description": "First night in York at Rowntree Park.",
        "mapLink": "https://maps.google.com/?q=Rowntree+Park+Caravan+Club+Site+York"
      }
    ]
  },
  {
    "id": "day-p3-2",
    "phase": "phase3",
    "date": "Monday 1 June 2026",
    "title": "York",
    "overview": "Exploring the historic centre of York.",
    "bgImage": "",
    "items": [
      {
        "time": "All Day",
        "title": "Explore York",
        "type": "activity",
        "icon": "fa-walking",
        "description": "Walk into the historic centre from Rowntree Park. York Minster, The Shambles."
      }
    ]
  },
  {
    "id": "day-p3-3",
    "phase": "phase3",
    "date": "Tuesday 2 June 2026",
    "title": "Northumberland Coast",
    "overview": "Drive to Northumberland Coast.",
    "bgImage": "",
    "items": [
      {
        "time": "Morning",
        "title": "Drive North",
        "type": "travel",
        "icon": "fa-route",
        "description": "York to Northumberland Coast via Alnwick and Bamburgh."
      },
      {
        "time": "Night",
        "title": "Waren Caravan & Camping Park",
        "type": "hotel",
        "icon": "fa-campground",
        "description": "Overnight at Waren Caravan Park.",
        "mapLink": "https://maps.google.com/?q=Waren+Caravan+Park+Bamburgh"
      }
    ]
  },
  {
    "id": "day-p3-4",
    "phase": "phase3",
    "date": "Wednesday 3 June 2026",
    "title": "Edinburgh",
    "overview": "Head into Scotland to Edinburgh.",
    "bgImage": "",
    "items": [
      {
        "time": "Morning",
        "title": "Drive to Edinburgh",
        "type": "travel",
        "icon": "fa-route",
        "description": "Northumberland to Edinburgh."
      },
      {
        "time": "Night",
        "title": "Mortonhall Caravan & Camping Park",
        "type": "hotel",
        "icon": "fa-campground",
        "description": "South-of-city location with easy bus access for sightseeing.",
        "mapLink": "https://maps.google.com/?q=Mortonhall+Caravan+and+Camping+Park"
      }
    ]
  },
  {
    "id": "day-p3-5",
    "phase": "phase3",
    "date": "Thursday 4 June 2026",
    "title": "Edinburgh",
    "overview": "Full day exploring Edinburgh.",
    "bgImage": "",
    "items": [
      {
        "time": "All Day",
        "title": "Sightseeing Edinburgh",
        "type": "activity",
        "icon": "fa-city",
        "description": "Bus into the city for sightseeing."
      }
    ]
  },
  {
    "id": "day-p3-6",
    "phase": "phase3",
    "date": "Friday 5 June 2026",
    "title": "Glencoe",
    "overview": "Scenic drive to the Scottish Highlands.",
    "bgImage": "",
    "items": [
      {
        "time": "Morning",
        "title": "Drive to Glencoe",
        "type": "travel",
        "icon": "fa-route",
        "description": "Edinburgh to Glencoe (approx 4.5 - 5 hrs). Scenic, broken naturally by Perth/Pitlochry."
      },
      {
        "time": "Night",
        "title": "Invercoe Caravan & Camping Park",
        "type": "hotel",
        "icon": "fa-campground",
        "description": "Loch Leven frontage.",
        "mapLink": "https://maps.google.com/?q=Invercoe+Caravan+and+Camping+Park"
      }
    ]
  },
  {
    "id": "day-p3-7",
    "phase": "phase3",
    "date": "Saturday 6 June 2026",
    "title": "Glencoe",
    "overview": "Exploring the dramatic Glencoe scenery.",
    "bgImage": "",
    "items": [
      {
        "time": "All Day",
        "title": "Glencoe Lochan & Signal Rock",
        "type": "activity",
        "icon": "fa-hiking",
        "description": "Short iconic walks around Glencoe."
      }
    ]
  },
  {
    "id": "day-p3-8",
    "phase": "phase3",
    "date": "Sunday 7 June 2026",
    "title": "Isle of Skye",
    "overview": "Drive to the majestic Isle of Skye.",
    "bgImage": "",
    "items": [
      {
        "time": "Morning",
        "title": "Drive to Skye",
        "type": "travel",
        "icon": "fa-route",
        "description": "Glencoe to Isle of Skye."
      },
      {
        "time": "Night",
        "title": "Torvaig Caravan & Camping Site",
        "type": "hotel",
        "icon": "fa-campground",
        "description": "Central positioning near Portree.",
        "mapLink": "https://maps.google.com/?q=Torvaig+Caravan+and+Camping+Site"
      }
    ]
  },
  {
    "id": "day-p3-9",
    "phase": "phase3",
    "date": "Monday 8 June 2026",
    "title": "Isle of Skye",
    "overview": "Trotternish loop and boat trips.",
    "bgImage": "",
    "items": [
      {
        "time": "All Day",
        "title": "Skye Sightseeing",
        "type": "activity",
        "icon": "fa-mountain",
        "description": "Trotternish loop, Old Man of Storr, Quiraing."
      }
    ]
  },
  {
    "id": "day-p3-10",
    "phase": "phase3",
    "date": "Tuesday 9 June 2026",
    "title": "Isle of Skye",
    "overview": "West coast sights.",
    "bgImage": "",
    "items": [
      {
        "time": "All Day",
        "title": "West Coast Sights",
        "type": "activity",
        "icon": "fa-water",
        "description": "Neist Point and flexible weather contingency."
      }
    ]
  },
  {
    "id": "day-p3-11",
    "phase": "phase3",
    "date": "Wednesday 10 June 2026",
    "title": "Fort William",
    "overview": "Transit night heading south.",
    "bgImage": "",
    "items": [
      {
        "time": "Morning",
        "title": "Drive South",
        "type": "travel",
        "icon": "fa-route",
        "description": "Skye to Fort William funnel."
      },
      {
        "time": "Night",
        "title": "Glen Nevis Caravan & Camping Park",
        "type": "hotel",
        "icon": "fa-campground",
        "description": "Transit night before the long drive south.",
        "mapLink": "https://maps.google.com/?q=Glen+Nevis+Caravan+and+Camping+Park"
      }
    ]
  },
  {
    "id": "day-p3-12",
    "phase": "phase3",
    "date": "Thursday 11 June 2026",
    "title": "Lake District",
    "overview": "Long drive south to the Lake District.",
    "bgImage": "",
    "items": [
      {
        "time": "Morning",
        "title": "Drive to Keswick",
        "type": "travel",
        "icon": "fa-route",
        "description": "Fort William to Keswick (approx 6 - 6.5 hrs)."
      },
      {
        "time": "Night",
        "title": "Castlerigg Hall Caravan & Camping Park",
        "type": "hotel",
        "icon": "fa-campground",
        "description": "South of Keswick with panoramic views.",
        "mapLink": "https://maps.google.com/?q=Castlerigg+Hall+Caravan+and+Camping+Park"
      }
    ]
  },
  {
    "id": "day-p3-13",
    "phase": "phase3",
    "date": "Friday 12 June 2026",
    "title": "Lake District",
    "overview": "Relaxing in the Lake District.",
    "bgImage": "",
    "items": [
      {
        "time": "All Day",
        "title": "Keswick & Grasmere",
        "type": "activity",
        "icon": "fa-walking",
        "description": "Catbells or Friars Crag. Village-hopping to Grasmere/Ambleside."
      }
    ]
  },
  {
    "id": "day-p3-14",
    "phase": "phase3",
    "date": "Saturday 13 June 2026",
    "title": "Yorkshire Dales",
    "overview": "Heading to the Yorkshire Dales.",
    "bgImage": "",
    "items": [
      {
        "time": "Morning",
        "title": "Drive to Grassington",
        "type": "travel",
        "icon": "fa-route",
        "description": "Keswick into the Yorkshire Dales."
      },
      {
        "time": "Night",
        "title": "Wharfedale Caravan Site",
        "type": "hotel",
        "icon": "fa-campground",
        "description": "Grassington. Perfect for Malham/Bolton Abbey.",
        "mapLink": "https://maps.google.com/?q=Wharfedale+Caravan+Club+Site"
      }
    ]
  },
  {
    "id": "day-p3-15",
    "phase": "phase3",
    "date": "Sunday 14 June 2026",
    "title": "Yorkshire Dales & Manchester",
    "overview": "Final day and return to Manchester.",
    "bgImage": "",
    "items": [
      {
        "time": "Morning",
        "title": "Malham / Bolton Abbey",
        "type": "activity",
        "icon": "fa-hiking",
        "description": "Morning exploration before heading back."
      },
      {
        "time": "Afternoon",
        "title": "Return Camper",
        "type": "travel",
        "icon": "fa-caravan",
        "description": "Drive from Dales to Manchester to return the Indie Camper."
      }
    ]
  }
]