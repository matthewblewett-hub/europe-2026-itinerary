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
    "coords": {"lat": 51.42, "lon": -1.73},
    "weatherLocation": "Marlborough",
    "learnMore": {
      "title": "Marlborough & the Wiltshire Downs",
      "intro": "Marlborough is one of England's most handsome market towns, sitting in a broad valley of the River Kennet amid the rolling chalk downlands of Wiltshire. It's a natural gateway to some of Britain's most ancient and mysterious landscapes.",
      "history": "The town's wide High Street — one of the broadest in England — was established in the 13th century and became a key coaching stop on the London–Bath road. The surrounding downs are home to some of Europe's most significant prehistoric sites: Avebury stone circle (older than Stonehenge), Silbury Hill — the largest man-made mound in Europe — and the Kennet Avenue of standing stones all lie within a 15-minute drive.",
      "geography": "The North Wessex Downs AONB surrounds the town, a landscape of open chalk grassland, beech hangers and ancient drove roads. The Vale of Pewsey lies to the south, and the Marlborough Downs rise steeply to the north, carved by Iron Age hill forts.",
      "highlights": [
            "Marlborough High Street",
            "Avebury Stone Circle",
            "Silbury Hill",
            "Savernake Forest",
            "The Food Gallery café"
      ],
      "funFact": "Marlborough College, one of England's top public schools, occupies a mound that is almost certainly a Norman motte — itself built on top of the prehistoric Marlborough Mound, a Neolithic earthwork contemporary with Stonehenge."
},
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
    "coords": {"lat": 51.11, "lon": -2.72},
    "weatherLocation": "Somerset",
    "learnMore": {
      "title": "Somerset & the Vale of Avalon",
      "intro": "Somerset is a county of extraordinary contrasts — from the flat, mystical Somerset Levels to the rugged moorland of Exmoor, and from the limestone gorge at Cheddar to the gentle hills of the Blackdowns. It's a land of cider, myth and ancient legend.",
      "history": "Glastonbury's Tor has drawn pilgrims and seekers for over a thousand years. The town claims to be the 'Isle of Avalon' — the legendary resting place of King Arthur — and Glastonbury Abbey was once the wealthiest in England before Henry VIII's Dissolution. The Levels were inhabited by lake-dwelling Iron Age communities and are one of Britain's great wetland wildernesses.",
      "geography": "The Somerset Levels are one of the lowest-lying areas in Britain, reclaimed from ancient marshland. The Mendip Hills form a limestone plateau to the north, riddled with caves and gorges. Glastonbury Tor rises 158 metres from the flat plains, visible for miles in every direction.",
      "highlights": [
            "Glastonbury Tor",
            "Glastonbury Abbey",
            "Cheddar Gorge & Caves",
            "Wells Cathedral",
            "The Newt in Somerset"
      ],
      "funFact": "The 'Sweet Track' — a Neolithic wooden walkway discovered in the Somerset Levels — dates to 3806 BCE, making it one of the oldest engineered roads ever found anywhere in the world."
},
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
    "coords": {"lat": 51.18, "lon": -3.0},
    "weatherLocation": "Glastonbury",
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
    "coords": {"lat": 52.37, "lon": 4.9},
    "weatherLocation": "Amsterdam",
    "learnMore": {
      "title": "Amsterdam, The Netherlands",
      "intro": "Amsterdam is one of Europe's great cities — intimate and walkable yet packed with world-class museums, extraordinary canal architecture and a rich, complex history. Built almost entirely on piles driven into soft peat, it's a city that simply shouldn't exist yet is utterly magnificent.",
      "history": "Founded as a fishing village in the 13th century at the mouth of the Amstel river, Amsterdam rose to become the richest city on Earth during the 17th-century Dutch Golden Age. The Dutch East India Company (VOC) — the world's first multinational corporation — made the city the centre of global trade. This golden wealth funded the canal ring, the merchant houses, and the extraordinary art of Rembrandt and Vermeer.",
      "geography": "Amsterdam sits at sea level, protected by a complex network of dykes and pumps. The city's iconic canal ring (grachtengordel) was laid out in a precise arc in the 17th century and is now a UNESCO World Heritage Site. The city is remarkably flat — the highest point is a bridge over a canal.",
      "highlights": [
            "Rijksmuseum",
            "Van Gogh Museum",
            "Anne Frank House",
            "Jordaan neighbourhood",
            "Canal boat tour",
            "NDSM Wharf"
      ],
      "funFact": "Amsterdam has more bicycles than people — approximately 880,000 bikes for 800,000 residents. There are more bikes than cars, and the city has over 400km of dedicated cycle paths."
},
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
    "coords": {"lat": 52.16, "lon": 4.49},
    "weatherLocation": "Leiden",
    "learnMore": {
      "title": "Leiden & Haarlem, Holland",
      "intro": "Two of Holland's most beautiful and historic cities lie within easy reach of Amsterdam. Leiden is a canal-laced university city of great intellectual pedigree, while Haarlem — just 20km from Amsterdam — is everything its larger neighbour is, but quieter and arguably more authentic.",
      "history": "Leiden is one of Europe's oldest and most distinguished university cities, founded in 1575 by William of Orange as a reward for the city's brave resistance to a Spanish siege. Rembrandt van Rijn was born here. The Pilgrim Fathers lived in Leiden for 11 years before sailing to America on the Mayflower in 1620. Haarlem is the capital of North Holland and contains one of the Netherlands' finest Gothic churches — the Grote Kerk (St Bavo).",
      "geography": "Both cities sit in the low-lying coastal region of the Netherlands, intersected by canals and waterways. The Keukenhof flower gardens — the world's largest flower park — lie midway between them, near Lisse, surrounded by the bulb fields of the Bollenstreek.",
      "highlights": [
            "Haarlem Grote Markt",
            "Teylers Museum (oldest in Netherlands)",
            "Keukenhof Gardens",
            "Leiden city walls",
            "Leiden's Pieterskerk"
      ],
      "funFact": "The Leiden-based scientist Jan van der Waals, Albert Einstein's teacher Hendrik Lorentz, and Nobel laureate Heike Kamerlingh Onnes (who first liquefied helium) all worked at Leiden University — making it one of the most consequential physics institutions in history."
},
    items: [
      {
        time: "08:30",
        title: "Coffee at Native",
        type: "food",
        icon: "fa-coffee",
        description: "Start the day with a fantastic coffee in Haarlem before heading to the station.",
        mapLink: "https://maps.google.com/?q=Native+Haarlem"
      },
      {
        time: "10:00",
        title: "Train to Leiden",
        type: "travel",
        icon: "fa-train",
        description: "Depart Haarlem Centraal for a quick 30-minute ride to Leiden."
      },
      {
        time: "10:30",
        title: "Molen de Valk (Windmill)",
        type: "activity",
        icon: "fa-camera",
        description: "Just 3 mins from the station. Great for exterior photos right on the canal edge.",
        mapLink: "https://maps.google.com/?q=Molen+de+Valk+Leiden"
      },
      {
        time: "11:00",
        title: "Hortus Botanicus Leiden",
        type: "activity",
        icon: "fa-leaf",
        description: "Walk down the Rapenburg canal to the stunning historic greenhouses and Japanese garden.",
        ticketLink: "https://hortusleiden.nl/en/plan-your-visit/tickets",
        mapLink: "https://maps.google.com/?q=Hortus+Botanicus+Leiden"
      },
      {
        time: "12:30",
        title: "Easy Fiets Rental",
        type: "activity",
        icon: "fa-bicycle",
        description: "Pick up bikes in the city center and cycle out into the Weipoort polders.",
        mapLink: "https://maps.google.com/?q=Easy+Fiets+Leiden"
      },
      {
        time: "13:15",
        title: "Cheese Farm & Polder Lunch",
        type: "food",
        icon: "fa-cheese",
        description: "Arrive at Boerderij 't Geertje or Kaasboerderij Van Veen in Zoeterwoude. Authentic cheese making, clogs, and farm animals. Buy local farmhouse cheese/bread for a picnic or eat at the farm restaurant.",
        mapLink: "https://maps.google.com/?q=Kaasboerderij+Zoeterwoude"
      },
      {
        time: "15:30",
        title: "The Burcht (Leiden Castle)",
        type: "activity",
        icon: "fa-monument",
        description: "Return bikes and climb the hidden stairs to this 11th-century keep for panoramic views over Leiden.",
        mapLink: "https://maps.google.com/?q=Burcht+van+Leiden"
      },
      {
        time: "16:30",
        title: "Canal Cruise",
        type: "activity",
        icon: "fa-ship",
        description: "A beautiful 1-hour cruise under Leiden's incredibly low bridges."
      },
      {
        time: "17:45",
        title: "Early Dinner / Drinks",
        type: "food",
        icon: "fa-utensils",
        description: "Find a table on the water along the Beestenmarkt or Aalmarkt for a relaxed evening.",
        mapLink: "https://maps.google.com/?q=Beestenmarkt+Leiden"
      },
      {
        time: "20:00",
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
    "coords": {"lat": 52.16, "lon": 4.49},
    "weatherLocation": "Leiden",
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
    "coords": {"lat": 51.92, "lon": 4.48},
    "weatherLocation": "Rotterdam",
    "learnMore": {
      "title": "Rotterdam, The Netherlands",
      "intro": "Rotterdam is unlike any other Dutch city — it was almost entirely destroyed by German bombing in May 1940 and rebuilt from scratch, becoming a living showcase of bold, visionary modern architecture. It's also Europe's largest seaport.",
      "history": "Rotterdam's medieval city centre was obliterated in a single afternoon on 14 May 1940. Rather than rebuild in traditional Dutch style, the city chose to reinvent itself as a canvas for architectural experimentation. The result is extraordinary: the cube houses, the Markthal, the Erasmus Bridge (nicknamed 'The Swan'), and a skyline unlike anywhere else in Europe.",
      "geography": "Rotterdam sits at the mouth of the Rhine and Meuse rivers, 30km from the North Sea. The Port of Rotterdam stretches 40km and handles more cargo than any other port in Europe. The city lies almost entirely below sea level.",
      "highlights": [
            "Markthal",
            "Cube Houses (Kubuswoningen)",
            "Erasmus Bridge",
            "SS Rotterdam",
            "Museum Boijmans Van Beuningen"
      ],
      "funFact": "The Rotterdam port handles over 469 million tonnes of cargo per year. If you lined up all the ships that pass through in a single year, they would stretch three times around the Earth's equator."
},
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
    "coords": {"lat": 60.47, "lon": 7.07},
    "weatherLocation": "Eidfjord",
    "learnMore": {
      "title": "Eidfjord & Hardangerfjord",
      "intro": "Eidfjord sits at the innermost reach of the Hardangerfjord — Norway's second-longest fjord and widely regarded as the most beautiful. This tiny village of just 900 people is surrounded by scenery of almost supernatural drama: sheer cliffs, roaring waterfalls, ancient orchards and the vast plateau of the Hardangervidda.",
      "history": "The Hardanger region has been inhabited since the Stone Age. The orchards — apple, cherry and plum — that line the fjordbanks have been cultivated for centuries, brought here by monks in medieval times. The Vøringsfossen waterfall was first measured and mapped in the 1800s and became one of Norway's earliest tourist attractions, drawing Victorian adventurers from across Europe.",
      "geography": "The Hardangervidda plateau — Europe's largest mountain plateau at 8,000km² — dominates the landscape above Eidfjord. The plateau sits at around 1,200 metres and is home to Europe's largest wild reindeer herd. Below it, the cliffs drop 180 metres to the valley floor at Vøringsfossen.",
      "highlights": [
            "Vøringsfossen Waterfall",
            "Hardangervidda plateau",
            "Eidfjord village",
            "Hardanger Bridge",
            "Hardangerfjord cruise"
      ],
      "funFact": "Vøringsfossen drops 183 metres — but the water then continues to fall a further 163 metres in cascades. The total fall from the plateau to the valley floor is one of the most dramatic vertical descents in Europe."
},
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
    "title": "Eidfjord",
    "overview": "Nature immersion: dramatic waterfalls, high plateaus, and classic fjord scenery.",
    "bgImage": "",
    "coords": {"lat": 61.85, "lon": 6.79},
    "weatherLocation": "Olden",
    "learnMore": {
      "title": "Olden & Nordfjord",
      "intro": "Olden is a small, immaculate village at the end of the Nordfjord, backdropped by the glistening ice of the Briksdalsbreen glacier — an arm of the Jostedalsbreen, the largest glacier on the European mainland. The combination of glacier, river, waterfalls and fjord makes this one of Norway's most photogenic destinations.",
      "history": "Olden has been a popular tourist destination since the late 19th century when British tourists came by steamer to walk to the Briksdal glacier. At that time the glacier reached almost to the valley floor. Today it has retreated significantly due to climate change — a stark, visible reminder of global warming in one of Europe's most remote places.",
      "geography": "Jostedalsbreen glacier covers 487km² and is up to 600 metres deep in places. The Briksdalsbreen arm flows down into a glacier lake in the valley, visible from the road. The surrounding mountains rise to over 1,700 metres.",
      "highlights": [
            "Briksdalsbreen Glacier",
            "Glacier lake kayaking",
            "Nordfjord boat cruise",
            "Oldedalen valley hike",
            "Trollstigen (nearby)"
      ],
      "funFact": "Jostedalsbreen is so massive that it influences local weather — it generates its own precipitation and microclimate. The glacier has existed in roughly its current form for over 2,500 years."
},
    "items": [
      {
        "time": "07:00",
        "title": "Fjord Sail-In",
        "type": "activity",
        "icon": "fa-ship",
        "description": "Slow breakfast onboard while entering the deep, spectacular Hardangerfjord. Be on deck!"
      },
      {
        "time": "08:30",
        "title": "Vøringsfossen Waterfall",
        "type": "travel",
        "icon": "fa-water",
        "description": "Take a taxi/excursion up the valley to see one of Norway's most dramatic waterfalls and the Hardangervidda plateau.",
        "mapLink": "https://maps.google.com/?q=Voringfossen"
      },
      {
        "time": "12:30",
        "title": "Lunch in Eidfjord",
        "type": "food",
        "icon": "fa-utensils",
        "description": "Head back down for a light lunch by the water in the village, or pop back onto the ship."
      },
      {
        "time": "13:30",
        "title": "Riverside Walk & Coffee",
        "type": "activity",
        "icon": "fa-walking",
        "description": "Gentle walk around the village marina. Stop at Vik Bakery for excellent coffee and cardamom buns.",
        "mapLink": "https://maps.google.com/?q=Vik+Bakery+Eidfjord",
        "link": "https://www.facebook.com/VikPensjonat/"
      },
      {
        "time": "15:00",
        "title": "Ship Departs Eidfjord",
        "type": "travel",
        "icon": "fa-ship",
        "description": "Make sure you are back onboard before 15:00!"
      }
    ]
  },
  {
    "id": "day-p2-4",
    "phase": "phase2",
    "date": "Wednesday 27 May 2026",
    "title": "Olden",
    "overview": "Mountain valleys and spiritual beauty: soaring cable cars and emerald lakes.",
    "bgImage": "",
    "coords": {"lat": 62.47, "lon": 6.15},
    "weatherLocation": "Ålesund",
    "learnMore": {
      "title": "Ålesund",
      "intro": "Ålesund is one of the world's most beautifully situated cities — an archipelago town spread across several islands at the meeting of fjords, sea and mountain. It is also Norway's finest example of Art Nouveau architecture, rebuilt entirely in this style after a devastating fire in 1904.",
      "history": "On 23 January 1904, a fire swept through Ålesund destroying nearly 800 buildings and leaving 10,000 people homeless. Kaiser Wilhelm II of Germany — who had a personal fondness for the town — sent four ships of emergency supplies within days. The rebuilding, completed in just three years, resulted in an extraordinary concentration of Art Nouveau (Jugendstil) architecture, now the finest in Scandinavia.",
      "geography": "Ålesund occupies a group of islands and peninsulas at the opening of the Geirangerfjord. The town is surrounded by the open Atlantic to the west and a maze of fjords, islands and mountains to the east. Aksla hill (189m) in the centre provides panoramic views over the entire archipelago.",
      "highlights": [
            "Aksla viewpoint",
            "Art Nouveau Centre (Jugendstilsenteret)",
            "Ålesund old town",
            "Atlanterhavsparken aquarium",
            "Hjørundfjord boat trip"
      ],
      "funFact": "The Geirangerfjord — accessible from Ålesund — is listed as a UNESCO World Heritage Site and is consistently rated the world's most beautiful fjord. The famous Seven Sisters waterfall drops 410 metres directly into the fjord."
},
    "items": [
      {
        "time": "09:00",
        "title": "Arrival in Olden",
        "type": "activity",
        "icon": "fa-ship",
        "description": "Easy breakfast onboard as the ship docks in the lush, emerald Nordfjord."
      },
      {
        "time": "10:00",
        "title": "Loen Skylift & Hike",
        "type": "activity",
        "icon": "fa-mountain",
        "description": "10-minute transport to the Skylift. Ride 1,000m up Mount Hoven for short walks and awe-inspiring views.",
        "mapLink": "https://maps.google.com/?q=Loen+Skylift",
        "ticketLink": "https://www.loenskylift.com/"
      },
      {
        "time": "12:30",
        "title": "Lunch at Hoven Restaurant",
        "type": "food",
        "icon": "fa-utensils",
        "description": "Coffee or lunch at the top of the Skylift with panoramic mountain views.",
        "link": "https://www.loenskylift.com/restaurant-hoven"
      },
      {
        "time": "14:30",
        "title": "Olden/Loen Valley Exploration",
        "type": "activity",
        "icon": "fa-leaf",
        "description": "Explore the valley floor slowly. Optional: kayak on the glacial Oldevatnet lake or walk the riverside."
      },
      {
        "time": "17:00",
        "title": "Back Onboard",
        "type": "food",
        "icon": "fa-ship",
        "description": "Waterside dinner onboard before the 19:00 departure."
      },
      {
        "time": "19:00",
        "title": "Ship Departs Olden",
        "type": "travel",
        "icon": "fa-ship",
        "description": "Make sure you are back onboard before 19:00!"
      }
    ]
  },
  {
    "id": "day-p2-5",
    "phase": "phase2",
    "date": "Thursday 28 May 2026",
    "title": "Ålesund",
    "overview": "Beautiful Art Nouveau town, panoramic viewpoints, and elegant café culture.",
    "bgImage": "",
    "coords": {"lat": 60.39, "lon": 5.32},
    "weatherLocation": "Bergen",
    "learnMore": {
      "title": "Bergen, Gateway to the Fjords",
      "intro": "Bergen is Norway's second city and its cultural capital — a place of wooden houses, fish markets, funiculars and mountains. Founded in 1070, it was for centuries the most important city in Scandinavia and a key member of the Hanseatic League trading network.",
      "history": "Bergen was Norway's capital during the Middle Ages and the country's largest city until the 19th century. The Bryggen wharf — a row of colourful Hanseatic merchant warehouses facing the harbour — dates from the 14th century and is one of Norway's UNESCO World Heritage Sites. The German Hanseatic merchants who dominated Bergen's trade from 1360 to 1754 lived in closed, self-contained communities on the wharf, forbidden from marrying local women.",
      "geography": "Bergen sits between seven mountains (the 'Seven Mountains' or De syv fjell) and seven fjords. The Fløibanen funicular climbs to 320 metres above the city in just 8 minutes. The city receives over 2,250mm of rain per year — more than anywhere else in Norway — earned Bergen its nickname 'the City of Rain'.",
      "highlights": [
            "Bryggen Wharf (UNESCO)",
            "Fish Market (Fisketorget)",
            "Fløibanen funicular",
            "KODE Art Museums",
            "Troldhaugen (Grieg's home)"
      ],
      "funFact": "Bergen holds the Norwegian record for most consecutive days of rain: 85 days. Locals are so accustomed to it that they say: 'There is no bad weather, only bad clothing.'"
},
    "items": [
      {
        "time": "08:00",
        "title": "Quiet Harbor Walk",
        "type": "activity",
        "icon": "fa-walking",
        "description": "Walk the harbor and Art Nouveau streets (Kongens Gate, canals) quietly before the crowds build.",
        "mapLink": "https://maps.google.com/?q=Kongens+Gate+Alesund"
      },
      {
        "time": "11:00",
        "title": "Aksla Viewpoint",
        "type": "activity",
        "icon": "fa-camera",
        "description": "Climb the 418 steps (or drive) up to the Fjellstua viewpoint for the extraordinary panoramic view.",
        "mapLink": "https://maps.google.com/?q=Fjellstua+Alesund"
      },
      {
        "time": "12:30",
        "title": "Café Culture Lunch",
        "type": "food",
        "icon": "fa-coffee",
        "description": "Long, relaxed seafood lunch or coffee stop. Recommended: Apotekergata No. 5 or Green Garden.",
        "mapLink": "https://maps.google.com/?q=Apotekergata+No.+5",
        "link": "https://www.hotelbrosundet.no/apotekergata-no-5/"
      },
      {
        "time": "14:00",
        "title": "Optional Kayak or Wander",
        "type": "activity",
        "icon": "fa-water",
        "description": "Optional Brosundet Canal kayak tour, or simply wander and photograph the architecture."
      },
      {
        "time": "17:00",
        "title": "Ship Departs Ålesund",
        "type": "travel",
        "icon": "fa-ship",
        "description": "Make sure you are back onboard before 17:00!"
      }
    ]
  },
  {
    "id": "day-p2-6",
    "phase": "phase2",
    "date": "Friday 29 May 2026",
    "title": "Bergen",
    "overview": "History, mountain overlooks, and wandering the old Hanseatic city.",
    "bgImage": "",
    "coords": {"lat": 60.39, "lon": 5.32},
    "weatherLocation": "Bergen",
    "items": [
      {
        "time": "08:00",
        "title": "Bryggen Waterfront",
        "type": "activity",
        "icon": "fa-building",
        "description": "Early harbor wander. Explore the deep, atmospheric wooden alleyways of the UNESCO-listed Bryggen before it gets busy.",
        "mapLink": "https://maps.google.com/?q=Bryggen+Bergen"
      },
      {
        "time": "10:30",
        "title": "Fløibanen Funicular & Mount Fløyen",
        "type": "activity",
        "icon": "fa-mountain",
        "description": "Take the funicular up. Do some forest walks, breathe the mountain air, and enjoy views over the fjords and city.",
        "mapLink": "https://maps.google.com/?q=Floibanen+Bergen",
        "ticketLink": "https://floyen.no/en/floibanen"
      },
      {
        "time": "12:30",
        "title": "Lunch/Coffee at the Summit",
        "type": "food",
        "icon": "fa-coffee",
        "description": "Have a reflective coffee or lunch at the top of Mount Fløyen."
      },
      {
        "time": "13:30",
        "title": "City Wandering",
        "type": "activity",
        "icon": "fa-walking",
        "description": "Walk or funicular back down. Slowly wander through the fish market, laneways, and independent shops.",
        "mapLink": "https://maps.google.com/?q=Bergen+Fish+Market"
      },
      {
        "time": "17:00",
        "title": "Ship Departs Bergen",
        "type": "travel",
        "icon": "fa-ship",
        "description": "Make sure you are back onboard before 17:00!"
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
    "coords": {"lat": 57.0, "lon": 4.0},
    "weatherLocation": "At Sea",
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
    "title": "Rotterdam to York Meadows",
    "overview": "Disembark cruise, fly to Manchester, pick up Indie Camper, and drive to York.",
    "bgImage": "",
    "coords": {"lat": 53.96, "lon": -1.08},
    "weatherLocation": "York",
    "items": [
      {
        "time": "Morning",
        "title": "Disembark Cruise",
        "type": "activity",
        "icon": "fa-ship",
        "description": "Leave the Holland America cruise and head to the airport."
      },
      {
        "time": "15:30",
        "title": "Flight to Manchester",
        "type": "travel",
        "icon": "fa-plane",
        "description": "Flight departs 15:30, arrives Manchester 15:50."
      },
      {
        "time": "17:00",
        "title": "Pick up Indie Camper",
        "type": "travel",
        "icon": "fa-caravan",
        "description": "Collect the campervan in Manchester.",
        "extraLinks": [
          {
            "url": "assets/Indie_Docs.jpg",
            "label": "Rental Docs"
          }
        ]
      },
      {
        "time": "17:30",
        "title": "Drive to York",
        "type": "travel",
        "icon": "fa-route",
        "description": "Drive M62/A64 towards York (approx 2 hours).",
        "mapLink": "https://www.google.com/maps/dir/Manchester/York+Meadows+Caravan+Park"
      },
      {
        "time": "20:00",
        "title": "Arrive at York Meadows",
        "type": "hotel",
        "icon": "fa-campground",
        "description": "Set up at York Meadows Caravan Park (Sheriff Hutton). Long day — relax and settle in!",
        "mapLink": "https://maps.google.com/?q=York+Meadows+Caravan+Park"
      }
    ]
  },
  {
    "id": "day-p3-2",
    "phase": "phase3",
    "date": "Monday 1 June 2026",
    "title": "Historic York",
    "overview": "Explore the medieval streets, city walls, and have high tea at Bettys.",
    "bgImage": "",
    "coords": {"lat": 53.96, "lon": -1.08},
    "weatherLocation": "York",
    "learnMore": {
      "title": "York — City of Layers",
      "intro": "York is perhaps England's most historically layered city — founded by the Romans, ruled by the Vikings, shaped by the Normans, and now one of the best-preserved medieval cities in Europe. Within its ancient walls lies 2,000 years of continuous history.",
      "history": "Founded as Eboracum in 71 CE, York was the most important Roman city north of London — Emperor Hadrian visited, and Constantine the Great was proclaimed Emperor here in 306 CE. The Vikings captured it in 866, renaming it Jorvik, and it became the second city of England under Scandinavian rule. The Normans built the castle and the minster. The city was a major centre of the textile trade in the medieval period, and later became the home of chocolate making — Rowntrees (Kit-Kat, Smarties) and Terry's (Chocolate Orange) were both based here.",
      "geography": "York sits on the flat Vale of York at the confluence of the Rivers Ouse and Foss. The city is encircled by 3.4km of medieval walls — the most complete in England — and centred on the magnificent York Minster, the largest Gothic cathedral in Northern Europe.",
      "highlights": [
            "York Minster",
            "The Shambles",
            "JORVIK Viking Centre",
            "National Railway Museum",
            "York City Walls",
            "Clifford's Tower"
      ],
      "funFact": "The Shambles — York's famous medieval street — appears in Harry Potter as Diagon Alley. The street's name comes from the Old English 'shamel' meaning shelves or counter, referring to the butchers' stalls that once lined it."
},
    "items": [
      {
        "time": "09:30",
        "title": "Head into York",
        "type": "travel",
        "icon": "fa-bus",
        "description": "Head from York Meadows into the city center."
      },
      {
        "time": "10:00",
        "title": "City Walls & York Minster",
        "type": "activity",
        "icon": "fa-monument",
        "description": "Walk the historic 3.4km City Walls (about 2 hrs) and visit the spectacular York Minster with its Great East Window. (Oost List)",
        "mapLink": "https://maps.google.com/?q=York+Minster",
        "ticketLink": "https://yorkminster.org/visit/book-tickets/"
      },
      {
        "time": "13:00",
        "title": "Bettys Café Tea Rooms",
        "type": "food",
        "icon": "fa-coffee",
        "description": "High-end afternoon tea or lunch at the famous Bettys. (Pre-booking highly recommended!)",
        "mapLink": "https://maps.google.com/?q=Bettys+Cafe+Tea+Rooms+York",
        "ticketLink": "https://www.bettys.co.uk/cafe-tea-rooms/our-locations/bettys-york"
      },
      {
        "time": "15:00",
        "title": "The Shambles",
        "type": "activity",
        "icon": "fa-camera",
        "description": "Wander the famous medieval timber-framed butchers' street. (Oost List)",
        "mapLink": "https://maps.google.com/?q=The+Shambles+York"
      },
      {
        "time": "16:00",
        "title": "National Railway Museum OR JORVIK Viking Centre",
        "type": "activity",
        "icon": "fa-train",
        "description": "Option A: National Railway Museum — world-class free collection (Mallard, Shinkansen), open 10:00-17:00. Option B: JORVIK Viking Centre — immersive ride and galleries on Viking-age York at Coppergate. (Oost List — choose one!)",
        "mapLink": "https://maps.google.com/?q=National+Railway+Museum+York",
        "ticketLink": "https://www.jorvikvikingcentre.co.uk/"
      },
      {
        "time": "17:30",
        "title": "Return to York Meadows",
        "type": "activity",
        "icon": "fa-campground",
        "description": "Return to York Meadows for a relaxed evening."
      }
    ]
  },
  {
    "id": "day-p3-3",
    "phase": "phase3",
    "date": "Tuesday 2 June 2026",
    "title": "Northumberland Coast",
    "overview": "Drive north, visit Alnwick Castle, and arrive at Proctors Stead.",
    "bgImage": "",
    "coords": {"lat": 55.47, "lon": -1.7},
    "weatherLocation": "Northumberland",
    "learnMore": {
      "title": "Northumberland — England's Wild North",
      "intro": "Northumberland is England's least densely populated county and its most dramatic — a land of wind-scoured moorland, ruined castles, vast sandy beaches and the Cheviot hills. It has more castles per mile than anywhere else in Europe, and some of England's darkest skies.",
      "history": "Northumberland was England's most disputed border territory for over a thousand years. The county was shaped by conflict between English and Scottish kingdoms, Norman conquest, Viking raids and the constant warfare of the Border Reivers. Hadrian's Wall — built by Emperor Hadrian from 122 CE across the full 73-mile width of Britain — passes through the county. Bamburgh Castle was the seat of the ancient Northumbrian kings; Alnwick Castle has been home to the Percy family since 1309.",
      "geography": "The Northumberland coast is one of England's most dramatic — wide, dune-backed sandy beaches facing the North Sea, with the Farne Islands offshore (home to vast puffin and seal colonies). The Cheviot Hills rise to 815 metres on the Scottish border. The county contains England's largest forest park (Kielder) and the Northumberland International Dark Sky Park, one of the darkest places in Europe.",
      "highlights": [
            "Bamburgh Castle",
            "Alnwick Castle & Gardens",
            "Holy Island (Lindisfarne)",
            "Dunstanburgh Castle walk",
            "Farne Islands boat trip",
            "Craster kippers"
      ],
      "funFact": "Bamburgh Castle was the first castle in England to be captured using gunpowder artillery during the Wars of the Roses in 1464. It was also the inspiration for the castle in the film 'The Last Castle'."
},
    "items": [
      {
        "time": "09:00",
        "title": "Depart York",
        "type": "travel",
        "icon": "fa-route",
        "description": "Drive north via the A19/A1 (approx 2.5 hrs).",
        "mapLink": "https://www.google.com/maps/dir/York+Meadows+Caravan+Park/Alnwick+Castle"
      },
      {
        "time": "11:30",
        "title": "Alnwick Castle & Gardens",
        "type": "activity",
        "icon": "fa-chess-rook",
        "description": "The famous Poison Garden and spectacular water cascades. (Oost List)",
        "mapLink": "https://maps.google.com/?q=Alnwick+Castle",
        "ticketLink": "https://www.alnwickcastle.com/book-tickets"
      },
      {
        "time": "14:00",
        "title": "Bamburgh Beach Walk",
        "type": "activity",
        "icon": "fa-umbrella-beach",
        "description": "Stop for a proper beach walk at Bamburgh — low tide reflections with the castle silhouette are extraordinary. (Oost List)",
        "mapLink": "https://maps.google.com/?q=Bamburgh+Beach"
      },
      {
        "time": "16:00",
        "title": "Arrive at Proctors Stead",
        "type": "hotel",
        "icon": "fa-campground",
        "description": "Set up at Proctors Stead Caravan Park (near Craster).",
        "mapLink": "https://maps.google.com/?q=Proctors+Stead+Caravan+Park"
      },
      {
        "time": "17:30",
        "title": "Craster Smokehouses",
        "type": "activity",
        "icon": "fa-fish",
        "description": "L. Robson & Sons — world-famous traditional Craster kippers smokehouse, a 2-minute walk from camp. (Oost List)",
        "mapLink": "https://maps.google.com/?q=Robsons+Craster+Kippers"
      },
      {
        "time": "18:30",
        "title": "Dinner at The Jolly Fisherman",
        "type": "food",
        "icon": "fa-utensils",
        "description": "Fresh seafood right on the harbour in Craster village.",
        "mapLink": "https://maps.google.com/?q=The+Jolly+Fisherman+Craster"
      }
    ]
  },
  {
    "id": "day-p3-4",
    "phase": "phase3",
    "date": "Wednesday 3 June 2026",
    "title": "Drive to Edinburgh",
    "overview": "Coastal drive into Scotland and exploring the Royal Mile.",
    "bgImage": "",
    "coords": {"lat": 55.95, "lon": -3.19},
    "weatherLocation": "Edinburgh",
    "learnMore": {
      "title": "Edinburgh — Athens of the North",
      "intro": "Edinburgh is one of the world's great capital cities — a place of extraordinary beauty, intellectual heritage and theatrical drama, where ancient volcanic rock meets Georgian elegance and medieval grandeur sits alongside cutting-edge culture.",
      "history": "Edinburgh Castle's volcanic rock has been inhabited since the Iron Age. The medieval Old Town grew along the Royal Mile from castle to palace in a uniquely dense, vertical style — 'tenement' buildings rose to 11 storeys, making them among the tallest in the world in their day. The 18th century Edinburgh Enlightenment made the city the intellectual capital of the Western world, producing figures including David Hume, Adam Smith, James Watt and James Hutton (the founder of modern geology).",
      "geography": "Edinburgh sits on a dramatic landscape of ancient volcanic plugs and crags. Arthur's Seat (251m) is an extinct volcano rising from the centre of the city. The Old Town clings to a glacially-carved ridge, while the Georgian New Town was laid out in elegant planned streets below. The Firth of Forth estuary lies 3km to the north.",
      "highlights": [
            "Edinburgh Castle",
            "Royal Mile",
            "Arthur's Seat",
            "Calton Hill",
            "Royal Botanic Garden",
            "Dean Village",
            "National Museum of Scotland"
      ],
      "funFact": "Edinburgh has more listed buildings per square kilometre than anywhere else in the world. The Edinburgh Festival (August) is the largest arts festival on Earth, with over 3,000 shows performed in 300 venues across a single month."
},
    "items": [
      {
        "time": "09:00",
        "title": "Dunstanburgh Coastal Walk",
        "type": "activity",
        "icon": "fa-hiking",
        "description": "Before packing up, do the iconic Craster → Dunstanburgh Castle → Embleton coastal walk (6-8km). Ruins on the headland, seabirds and dramatic cliffs. (Oost List)",
        "mapLink": "https://maps.google.com/?q=Dunstanburgh+Castle"
      },
      {
        "time": "11:30",
        "title": "Depart for Edinburgh",
        "type": "travel",
        "icon": "fa-route",
        "description": "Drive the scenic coastal A1 route north into Scotland (approx 2 hrs).",
        "mapLink": "https://www.google.com/maps/dir/Proctors+Stead+Caravan+Park/Mortonhall+Caravan+Park"
      },
      {
        "time": "14:00",
        "title": "Arrive at Mortonhall",
        "type": "hotel",
        "icon": "fa-campground",
        "description": "Arrive at Mortonhall Caravan & Camping Park. Set up the van.",
        "mapLink": "https://maps.google.com/?q=Mortonhall+Caravan+Park"
      },
      {
        "time": "15:30",
        "title": "Bus to City Center",
        "type": "travel",
        "icon": "fa-bus",
        "description": "Catch the local bus from outside the park into Edinburgh. Use contactless — Lothian Buses TapTapCap caps daily fares. (Oost List tip)"
      },
      {
        "time": "16:00",
        "title": "The Royal Mile & St Giles' Cathedral",
        "type": "activity",
        "icon": "fa-walking",
        "description": "Walk the Royal Mile from the Castle down toward Holyrood. Pop into St Giles' Cathedral — free entry. (Oost List)",
        "mapLink": "https://maps.google.com/?q=The+Royal+Mile+Edinburgh"
      },
      {
        "time": "18:30",
        "title": "Dinner at The Witchery",
        "type": "food",
        "icon": "fa-utensils",
        "description": "Incredibly gothic and atmospheric dining by the castle. Pre-book essential.",
        "mapLink": "https://maps.google.com/?q=The+Witchery+by+the+Castle",
        "ticketLink": "https://www.thewitchery.com/"
      }
    ]
  },
  {
    "id": "day-p3-5",
    "phase": "phase3",
    "date": "Thursday 4 June 2026",
    "title": "Edinburgh Elegance",
    "overview": "Botanic Gardens, Stockbridge, and Calton Hill.",
    "bgImage": "",
    "coords": {"lat": 55.95, "lon": -3.19},
    "weatherLocation": "Edinburgh",
    "items": [
      {
        "time": "09:30",
        "title": "Bus to New Town",
        "type": "travel",
        "icon": "fa-bus",
        "description": "Head into the elegant Georgian New Town."
      },
      {
        "time": "10:00",
        "title": "Royal Botanic Garden",
        "type": "activity",
        "icon": "fa-leaf",
        "description": "Phenomenal 70-acre garden with glasshouses and rock garden — free entry. (Oost List)",
        "mapLink": "https://maps.google.com/?q=Royal+Botanic+Garden+Edinburgh"
      },
      {
        "time": "11:30",
        "title": "Dean Village & Water of Leith",
        "type": "activity",
        "icon": "fa-walking",
        "description": "Wander through the picturesque Dean Village along the Water of Leith — a hidden gem free from tourists. (Oost List)",
        "mapLink": "https://maps.google.com/?q=Dean+Village+Edinburgh"
      },
      {
        "time": "13:00",
        "title": "Lunch in Stockbridge",
        "type": "food",
        "icon": "fa-utensils",
        "description": "Wander the stylish Stockbridge neighborhood for lunch.",
        "mapLink": "https://maps.google.com/?q=Stockbridge+Edinburgh"
      },
      {
        "time": "15:00",
        "title": "National Museum of Scotland OR Calton Hill",
        "type": "activity",
        "icon": "fa-camera",
        "description": "Option A: National Museum of Scotland — free, world-class galleries, open 10:00-17:00. Option B: Calton Hill for 360° city panorama with monuments. (Oost List — choose one!)",
        "mapLink": "https://maps.google.com/?q=Calton+Hill+Edinburgh",
        "ticketLink": "https://www.nms.ac.uk/national-museum-of-scotland/"
      },
      {
        "time": "18:00",
        "title": "Relax at Mortonhall",
        "type": "activity",
        "icon": "fa-wine-glass",
        "description": "Relaxing evening back at the campsite with local Scottish deli produce."
      }
    ]
  },
  {
    "id": "day-p3-6",
    "phase": "phase3",
    "date": "Friday 5 June 2026",
    "title": "Drive to Glen Nevis",
    "overview": "Cross Rannoch Moor and the dramatic Glencoe pass.",
    "bgImage": "",
    "coords": {"lat": 56.82, "lon": -5.1},
    "weatherLocation": "Glen Nevis",
    "learnMore": {
      "title": "Glen Nevis & Fort William",
      "intro": "Glen Nevis is one of the most spectacular glens in Scotland — a deep, dramatic valley carved beneath Ben Nevis, Britain's highest mountain. The glen runs from Fort William into an increasingly wild landscape of gorge, waterfall and high corrie. Fort William itself is the 'Outdoor Capital of the UK'.",
      "history": "Fort William was established as a garrison in 1690 to control the Jacobite Highland clans. The surrounding region was central to the Jacobite rising of 1745 — Bonnie Prince Charlie raised his standard at nearby Glenfinnan before marching south to claim the British throne. Glencoe, just to the south, was the site of the infamous 1692 massacre of the MacDonald clan by government troops.",
      "geography": "Ben Nevis rises to 1,345 metres — 4,413 feet — making it the highest point in the British Isles. Its summit is in cloud 355 days of the year. Glen Nevis cuts east behind the mountain into a spectacular inner gorge where the Water of Nevis tumbles through a narrow rock channel. The Steall Falls — Scotland's second highest at 120m — drop into this hidden valley.",
      "highlights": [
            "Ben Nevis",
            "Steall Falls gorge walk",
            "Nevis Range Gondola",
            "Glenfinnan Viaduct",
            "Neptune's Staircase locks",
            "Glencoe valley"
      ],
      "funFact": "Approximately 125,000 people attempt to climb Ben Nevis each year. The record for the ascent and descent is held by Kenny Stuart — 1 hour 25 minutes for what most walkers take 7-9 hours to complete."
},
    "items": [
      {
        "time": "09:00",
        "title": "Depart Edinburgh",
        "type": "travel",
        "icon": "fa-route",
        "description": "Drive north via Perth (approx 3.5 hrs total drive time).",
        "mapLink": "https://www.google.com/maps/dir/Mortonhall+Caravan+Park/Pitlochry/Glen+Nevis+Caravan+Park"
      },
      {
        "time": "11:00",
        "title": "Coffee in Pitlochry",
        "type": "food",
        "icon": "fa-coffee",
        "description": "Stop in the lovely highland town of Pitlochry."
      },
      {
        "time": "13:30",
        "title": "Rannoch Moor & Glencoe Pass",
        "type": "activity",
        "icon": "fa-mountain",
        "description": "Drive across the desolate Rannoch Moor and descend through the breathtaking Glencoe pass. Pull over at the Glencoe Visitor Centre layby for photos. (Oost List)"
      },
      {
        "time": "15:30",
        "title": "Arrive at Glen Nevis",
        "type": "hotel",
        "icon": "fa-campground",
        "description": "Set up at Glen Nevis Caravan & Camping Park at the foot of Ben Nevis.",
        "mapLink": "https://maps.google.com/?q=Glen+Nevis+Caravan+and+Camping+Park"
      },
      {
        "time": "16:30",
        "title": "Neptune's Staircase (Banavie)",
        "type": "activity",
        "icon": "fa-water",
        "description": "Quick detour to the 8-lock Caledonian Canal staircase — watch the lock-keepers work. Free, 15 mins from camp. (Oost List)",
        "mapLink": "https://maps.google.com/?q=Neptune's+Staircase+Banavie"
      },
      {
        "time": "18:00",
        "title": "Dinner at Ben Nevis Inn",
        "type": "food",
        "icon": "fa-utensils",
        "description": "Walk next door for a hearty dinner at the famous mountaineers' pub.",
        "mapLink": "https://maps.google.com/?q=Ben+Nevis+Inn"
      }
    ]
  },
  {
    "id": "day-p3-7",
    "phase": "phase3",
    "date": "Saturday 6 June 2026",
    "title": "Steall Falls & Glencoe",
    "overview": "A beautiful local hike to one of Scotland's highest waterfalls.",
    "bgImage": "",
    "coords": {"lat": 56.82, "lon": -5.1},
    "weatherLocation": "Glen Nevis",
    "items": [
      {
        "time": "09:30",
        "title": "Hike to Steall Falls",
        "type": "activity",
        "icon": "fa-hiking",
        "description": "Leave the van parked and walk up the stunning Glen Nevis valley to Steall Falls (a moderate hike).",
        "mapLink": "https://maps.google.com/?q=Steall+Waterfall"
      },
      {
        "time": "13:30",
        "title": "Glencoe Lochan Trail",
        "type": "activity",
        "icon": "fa-walking",
        "description": "Drive back down into Glencoe to do this easy, serene walk around a pine-fringed loch reflecting the mountains.",
        "mapLink": "https://maps.google.com/?q=Glencoe+Lochan"
      },
      {
        "time": "17:00",
        "title": "Relax at Campsite",
        "type": "activity",
        "icon": "fa-campground",
        "description": "Relax at Glen Nevis campsite taking in the mountain views."
      }
    ]
  },
  {
    "id": "day-p3-8",
    "phase": "phase3",
    "date": "Sunday 7 June 2026",
    "title": "Drive to Isle of Skye",
    "overview": "Castles, bridges, and arriving on the magical Isle of Skye.",
    "bgImage": "",
    "coords": {"lat": 57.41, "lon": -6.2},
    "weatherLocation": "Portree, Skye",
    "learnMore": {
      "title": "Isle of Skye — The Winged Isle",
      "intro": "Skye is Scotland's largest island and its most mythologised — a place of jagged black mountains, ancient Gaelic culture, fairy pools and some of the most otherworldly landscapes in Europe. The Cuillin ridge is considered the finest mountain terrain in the British Isles.",
      "history": "Skye has been inhabited for at least 8,000 years. The island was Norse territory for 400 years before returning to Scottish rule in 1266. Clan MacLeod (based at Dunvegan) and Clan MacDonald dominated the island for centuries. Skye is inseparable from the Jacobite story — Bonnie Prince Charlie famously fled to Skye disguised as 'Betty Burke' after the defeat at Culloden in 1746, immortalised in the 'Skye Boat Song'. Gaelic culture and language have survived here more strongly than almost anywhere else.",
      "geography": "Skye is 77km long and up to 40km wide — more a series of peninsulas than a single landmass. The Cuillin mountains rise to 993m and are the only true alpine environment in the British Isles — formed from gabbro rock so rough that conventional compass readings are unreliable. The Trotternish Ridge in the north is a 30km escarpment of pinnacles and cliffs formed by the world's largest inland landslip.",
      "highlights": [
            "Old Man of Storr",
            "The Quiraing",
            "Dunvegan Castle",
            "Neist Point Lighthouse",
            "Fairy Pools (Glen Brittle)",
            "Eilean Donan Castle",
            "Sligachan"
      ],
      "funFact": "The Cuillin mountains are so geologically unusual — formed from magnetic gabbro rock — that they distort compass needles by up to 10 degrees, making navigation with a standard compass unreliable. Climbers must use GPS or learn to read the terrain itself."
},
    "items": [
      {
        "time": "09:00",
        "title": "Depart Glen Nevis",
        "type": "travel",
        "icon": "fa-route",
        "description": "Drive the scenic A87 toward Skye.",
        "mapLink": "https://www.google.com/maps/dir/Glen+Nevis+Caravan+Park/Eilean+Donan+Castle/Portree+Campsite"
      },
      {
        "time": "11:30",
        "title": "Eilean Donan Castle",
        "type": "activity",
        "icon": "fa-chess-rook",
        "description": "Pull over for a walk around the exterior of the most photographed castle in Scotland.",
        "mapLink": "https://maps.google.com/?q=Eilean+Donan+Castle"
      },
      {
        "time": "13:30",
        "title": "Skye Bridge & Portree",
        "type": "travel",
        "icon": "fa-caravan",
        "description": "Cross the Skye Bridge and drive up the island to Portree."
      },
      {
        "time": "15:00",
        "title": "Arrive at Portree Campsite",
        "type": "hotel",
        "icon": "fa-campground",
        "description": "Set up at Portree Campsite (Torvaig).",
        "mapLink": "https://maps.google.com/?q=Portree+Campsite"
      },
      {
        "time": "17:00",
        "title": "Dinner at Sea Breezes",
        "type": "food",
        "icon": "fa-fish",
        "description": "Walk down into Portree harbor to see the colorful houses and grab incredible seafood at Sea Breezes.",
        "mapLink": "https://maps.google.com/?q=Sea+Breezes+Portree",
        "ticketLink": "https://www.seabreezes-portree.com/"
      }
    ]
  },
  {
    "id": "day-p3-9",
    "phase": "phase3",
    "date": "Monday 8 June 2026",
    "title": "Skye: Trotternish Loop",
    "overview": "The epic landscapes of the Old Man of Storr and the Quiraing.",
    "bgImage": "",
    "coords": {"lat": 57.41, "lon": -6.2},
    "weatherLocation": "Portree, Skye",
    "items": [
      {
        "time": "08:30",
        "title": "Start Trotternish Loop",
        "type": "travel",
        "icon": "fa-route",
        "description": "Early start to beat the crowds. Single-track roads with passing places — take it slow. (Oost List tip)",
        "mapLink": "https://www.google.com/maps/dir/Portree+Campsite/Old+Man+of+Storr/Kilt+Rock/Quiraing/Portree+Campsite"
      },
      {
        "time": "09:30",
        "title": "Hike Old Man of Storr",
        "type": "activity",
        "icon": "fa-hiking",
        "description": "Steady 45-min climb for Skye's most iconic silhouette views. (Oost List)",
        "mapLink": "https://maps.google.com/?q=Old+Man+of+Storr"
      },
      {
        "time": "12:00",
        "title": "Lealt Falls & Brother's Point",
        "type": "activity",
        "icon": "fa-water",
        "description": "En-route — free viewpoints and short coastal path to a dramatic headland. (Oost List)",
        "mapLink": "https://maps.google.com/?q=Lealt+Falls+Skye"
      },
      {
        "time": "13:00",
        "title": "Kilt Rock & The Quiraing",
        "type": "activity",
        "icon": "fa-mountain",
        "description": "Kilt Rock waterfall drops into the ocean, then walk up into the otherworldly Quiraing landscape. (Oost List)",
        "mapLink": "https://maps.google.com/?q=Quiraing"
      },
      {
        "time": "16:00",
        "title": "Return to Portree",
        "type": "activity",
        "icon": "fa-campground",
        "description": "Return to Portree Campsite to rest tired legs. Consider a dram at Sligachan Hotel under the Cuillin on the way back. (Oost List)",
        "mapLink": "https://maps.google.com/?q=Sligachan+Hotel"
      }
    ]
  },
  {
    "id": "day-p3-10",
    "phase": "phase3",
    "date": "Tuesday 9 June 2026",
    "title": "Skye: West Coast",
    "overview": "Dunvegan Castle, sheer cliffs, and a premium dinner.",
    "bgImage": "",
    "coords": {"lat": 57.41, "lon": -6.2},
    "weatherLocation": "Portree, Skye",
    "items": [
      {
        "time": "09:30",
        "title": "Drive West",
        "type": "travel",
        "icon": "fa-route",
        "description": "Head to the west side of the island.",
        "mapLink": "https://www.google.com/maps/dir/Portree+Campsite/Dunvegan+Castle/Neist+Point+Lighthouse"
      },
      {
        "time": "10:30",
        "title": "Dunvegan Castle & Gardens",
        "type": "activity",
        "icon": "fa-chess-rook",
        "description": "Historic seat of Clan MacLeod with beautiful walled garden. (Oost List)",
        "mapLink": "https://maps.google.com/?q=Dunvegan+Castle",
        "ticketLink": "https://www.dunvegancastle.com/book-tickets/"
      },
      {
        "time": "12:30",
        "title": "The Oyster Shed (Carbost)",
        "type": "food",
        "icon": "fa-utensils",
        "description": "Casual waterside seafood shack near Talisker. Local favourite for fresh oysters. (Oost List)",
        "mapLink": "https://maps.google.com/?q=The+Oyster+Shed+Carbost"
      },
      {
        "time": "14:00",
        "title": "Neist Point Lighthouse",
        "type": "activity",
        "icon": "fa-camera",
        "description": "Dramatic coastal walk along the sheer cliffs to the lighthouse — heavenly evening light. (Oost List)",
        "mapLink": "https://maps.google.com/?q=Neist+Point+Lighthouse"
      },
      {
        "time": "18:00",
        "title": "Premium Dinner",
        "type": "food",
        "icon": "fa-utensils",
        "description": "Treat yourself to a final Skye dinner at The Three Chimneys (book months ahead!) or Edinbane Lodge. (Oost List)",
        "mapLink": "https://maps.google.com/?q=The+Three+Chimneys",
        "ticketLink": "https://threechimneys.co.uk/"
      }
    ]
  },
  {
    "id": "day-p3-11",
    "phase": "phase3",
    "date": "Wednesday 10 June 2026",
    "title": "Transit to Fort William",
    "overview": "Slower transit drive back down the Great Glen.",
    "bgImage": "",
    "coords": {"lat": 56.82, "lon": -5.1},
    "weatherLocation": "Glen Nevis",
    "items": [
      {
        "time": "09:30",
        "title": "Depart Skye",
        "type": "travel",
        "icon": "fa-route",
        "description": "A beautiful, slower transit drive back over the Skye Bridge and down the Great Glen.",
        "mapLink": "https://www.google.com/maps/dir/Portree+Campsite/Glen+Nevis+Caravan+Park"
      },
      {
        "time": "14:00",
        "title": "Arrive at Glen Nevis",
        "type": "hotel",
        "icon": "fa-campground",
        "description": "Arrive back at Glen Nevis Caravan & Camping Park for your one-night transit stop.",
        "mapLink": "https://maps.google.com/?q=Glen+Nevis+Caravan+and+Camping+Park"
      },
      {
        "time": "15:00",
        "title": "Relaxing Afternoon",
        "type": "activity",
        "icon": "fa-water",
        "description": "A purely relaxing afternoon sitting by the river at the campsite."
      }
    ]
  },
  {
    "id": "day-p3-12",
    "phase": "phase3",
    "date": "Thursday 11 June 2026",
    "title": "Drive to the Lake District",
    "overview": "The longest drive of the trip, arriving in the stunning Lake District.",
    "bgImage": "",
    "coords": {"lat": 54.6, "lon": -3.13},
    "weatherLocation": "Keswick",
    "learnMore": {
      "title": "Keswick & the Lake District",
      "intro": "The Lake District is England's largest national park and one of its most beloved landscapes — a compact but remarkably varied region of mountain, lake and valley that has inspired poets, artists and walkers for three centuries. Keswick is its northern hub, sitting between Derwentwater and Blencathra.",
      "history": "The Lakes were 'discovered' by the Romantics in the late 18th century — William Wordsworth, Samuel Taylor Coleridge and Robert Southey all lived here, sparking a revolution in how people related to wild landscape. John Ruskin spent the last 28 years of his life at Brantwood on Coniston Water. Beatrix Potter bought Hill Top Farm near Hawkshead with the proceeds of Peter Rabbit and donated 4,000 acres to the National Trust on her death.",
      "geography": "The Lake District covers 2,362km² and was formed by glaciation — the lakes occupy U-shaped valleys carved by ice sheets that retreated 10,000 years ago. The highest point is Scafell Pike (978m), England's highest mountain. Derwentwater — beside Keswick — is frequently cited as the most beautiful lake in England.",
      "highlights": [
            "Derwentwater & Keswick Launch",
            "Catbells hike",
            "Castlerigg Stone Circle",
            "Buttermere",
            "Wastwater",
            "Grasmere & Dove Cottage"
      ],
      "funFact": "Castlerigg Stone Circle, just outside Keswick, was erected around 3000 BCE — making it one of the earliest stone circles in Britain, predating Stonehenge. It was placed with extraordinary precision: on the winter solstice, the rising sun aligns perfectly with one of its stones."
},
    "items": [
      {
        "time": "08:30",
        "title": "Early Departure",
        "type": "travel",
        "icon": "fa-route",
        "description": "Long drive (~4.5 to 5 hours) from Fort William down the M74 to the Lake District.",
        "mapLink": "https://www.google.com/maps/dir/Glen+Nevis+Caravan+Park/Castlerigg+Hall+Caravan+Park"
      },
      {
        "time": "14:00",
        "title": "Arrive at Castlerigg Hall",
        "type": "hotel",
        "icon": "fa-campground",
        "description": "Set up at Castlerigg Hall just south of Keswick. Panoramic views over Derwentwater.",
        "mapLink": "https://maps.google.com/?q=Castlerigg+Hall+Caravan+Park"
      },
      {
        "time": "15:00",
        "title": "Castlerigg Stone Circle",
        "type": "activity",
        "icon": "fa-circle",
        "description": "Free, 10-min drive from camp — one of the most spectacular prehistoric stone circles in England with mountain backdrop. (Oost List)",
        "mapLink": "https://maps.google.com/?q=Castlerigg+Stone+Circle"
      },
      {
        "time": "16:00",
        "title": "Friar's Crag & Derwentwater",
        "type": "activity",
        "icon": "fa-walking",
        "description": "Stretch your legs with the short waterside walk to Friar's Crag for iconic lake views. (Oost List)",
        "mapLink": "https://maps.google.com/?q=Friars+Crag+Keswick"
      },
      {
        "time": "18:00",
        "title": "Dinner at The Dog and Gun",
        "type": "food",
        "icon": "fa-utensils",
        "description": "Head into Keswick for a pint and Hungarian Goulash.",
        "mapLink": "https://maps.google.com/?q=The+Dog+and+Gun+Keswick"
      }
    ]
  },
  {
    "id": "day-p3-13",
    "phase": "phase3",
    "date": "Friday 12 June 2026",
    "title": "Lake District Scenery",
    "overview": "Catbells hike, Buttermere, and Wordsworth.",
    "bgImage": "",
    "coords": {"lat": 54.6, "lon": -3.13},
    "weatherLocation": "Keswick",
    "items": [
      {
        "time": "09:00",
        "title": "Keswick Launch to Hawes End",
        "type": "activity",
        "icon": "fa-ship",
        "description": "Take the hop-on/hop-off Derwentwater lake cruise to Hawes End jetty (50-min circuit). A stunning way to start the day. (Oost List)",
        "mapLink": "https://maps.google.com/?q=Keswick+Launch",
        "ticketLink": "https://keswick-launch.co.uk/"
      },
      {
        "time": "10:00",
        "title": "Catbells Hike",
        "type": "activity",
        "icon": "fa-hiking",
        "description": "From Hawes End, hike up Catbells for sweeping fell views — short but rewarding. (Oost List)",
        "mapLink": "https://maps.google.com/?q=Catbells+Lake+District"
      },
      {
        "time": "12:30",
        "title": "Buttermere Circuit",
        "type": "activity",
        "icon": "fa-walking",
        "description": "Drive to Buttermere for a perfect low-level lake circuit with photogenic pine reflections and a café stop. (Oost List)",
        "mapLink": "https://maps.google.com/?q=Buttermere"
      },
      {
        "time": "15:00",
        "title": "Grasmere & Dove Cottage",
        "type": "activity",
        "icon": "fa-home",
        "description": "Visit Wordsworth's Dove Cottage and buy the world-famous Grasmere Gingerbread. (Oost List)",
        "mapLink": "https://maps.google.com/?q=Dove+Cottage+Grasmere"
      },
      {
        "time": "17:30",
        "title": "Sunset over the Fells",
        "type": "activity",
        "icon": "fa-sun",
        "description": "Relax back at Castlerigg Hall watching the sunset over the fells."
      }
    ]
  },
  {
    "id": "day-p3-14",
    "phase": "phase3",
    "date": "Saturday 13 June 2026",
    "title": "Drive to Yorkshire Dales",
    "overview": "Picturesque villages and classic Dales pubs.",
    "bgImage": "",
    "coords": {"lat": 54.07, "lon": -2.0},
    "weatherLocation": "Grassington",
    "learnMore": {
      "title": "Yorkshire Dales — Limestone Country",
      "intro": "The Yorkshire Dales are a landscape of rare, sculptural beauty — pale limestone pavements, green glacial valleys, stone-walled fields, ancient field barns and fast-flowing becks. Grassington is the most characterful of all the Dales market towns, and the landscape around it is as rich in geology and history as anywhere in England.",
      "history": "The Dales were heavily settled by Norse Vikings who named almost every feature — 'dale' (valley), 'beck' (stream), 'scar' (cliff) and 'fell' (hill) are all Old Norse words. The area was mined for lead from Roman times through to the 19th century; the moors above Grassington are dotted with the remains of this industry. Grassington itself was the setting for the BBC's long-running series 'All Creatures Great and Small' (filmed as Darrowby).",
      "geography": "The Yorkshire Dales National Park covers 2,179km² of high moorland and deeply carved limestone valleys. Wharfedale — the valley of the River Wharfe — is the most accessible and arguably the most beautiful of all the dales, running from the high moors near Buckden down through Grassington, Bolton Abbey and out to Ilkley.",
      "highlights": [
            "Grassington village",
            "Bolton Abbey & Priory",
            "The Strid gorge",
            "Kilnsey Crag",
            "Linton Falls",
            "Malham Cove",
            "Embsay Steam Railway"
      ],
      "funFact": "The Strid, near Bolton Abbey, appears to be a narrow stream you could leap across — but it's actually a catastrophically dangerous gorge where the full force of the River Wharfe is compressed through a rock channel just 1.5 metres wide. No one who has fallen in has ever survived."
},
    "items": [
      {
        "time": "09:30",
        "title": "Depart Keswick",
        "type": "travel",
        "icon": "fa-route",
        "description": "Drive east via the A66/A65 into the Yorkshire Dales (~2 hours).",
        "mapLink": "https://www.google.com/maps/dir/Castlerigg+Hall+Caravan+Park/Wood+Nook+Caravan+Park"
      },
      {
        "time": "11:15",
        "title": "Kilnsey Crag Roadside Stop",
        "type": "activity",
        "icon": "fa-camera",
        "description": "En-route on the B6160 into Grassington — the iconic overhanging limestone crag towering over the road. A 5-minute photo stop. (Oost List)",
        "mapLink": "https://maps.google.com/?q=Kilnsey+Crag"
      },
      {
        "time": "12:30",
        "title": "Arrive at Wood Nook",
        "type": "hotel",
        "icon": "fa-campground",
        "description": "Set up at Wood Nook Caravan Park in Grassington.",
        "mapLink": "https://maps.google.com/?q=Wood+Nook+Caravan+Park"
      },
      {
        "time": "14:00",
        "title": "Grassington Village",
        "type": "activity",
        "icon": "fa-walking",
        "description": "Walk into the incredibly picturesque village of Grassington (which doubles as Darrowby in All Creatures Great and Small).",
        "mapLink": "https://maps.google.com/?q=Grassington"
      },
      {
        "time": "18:00",
        "title": "Dinner at The Devonshire",
        "type": "food",
        "icon": "fa-utensils",
        "description": "Enjoy a classic Dales pub dinner.",
        "mapLink": "https://maps.google.com/?q=The+Devonshire+Grassington"
      }
    ]
  },
  {
    "id": "day-p3-15",
    "phase": "phase3",
    "date": "Sunday 14 June 2026",
    "title": "Return to Manchester",
    "overview": "Final morning in the Dales and campervan return.",
    "bgImage": "",
    "coords": {"lat": 53.98, "lon": -1.92},
    "weatherLocation": "Yorkshire Dales",
    "items": [
      {
        "time": "09:00",
        "title": "Bolton Abbey Ruins",
        "type": "activity",
        "icon": "fa-monument",
        "description": "Pack up and visit the nearby Bolton Abbey ruins for a morning walk.",
        "mapLink": "https://maps.google.com/?q=Bolton+Abbey",
        "ticketLink": "https://boltonabbey.com/visit-us/"
      },
      {
        "time": "11:30",
        "title": "Drive to Manchester",
        "type": "travel",
        "icon": "fa-route",
        "description": "Drive the final stretch back to Manchester (~1.5 hours) to empty, clean, and drop off the Indie Camper before your flight home.",
        "mapLink": "https://www.google.com/maps/dir/Bolton+Abbey/Manchester+Airport"
      }
    ]
  }
];