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
    "title": "Eidfjord",
    "overview": "Nature immersion: dramatic waterfalls, high plateaus, and classic fjord scenery.",
    "bgImage": "",
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
    "items": [
      {
        "time": "Morning",
        "title": "Disembark Cruise",
        "type": "activity",
        "icon": "fa-ship",
        "description": "Leave the Holland America cruise and head to the airport."
      },
      {
        "time": "13:00",
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
        "time": "14:30",
        "title": "Drive to York",
        "type": "travel",
        "icon": "fa-route",
        "description": "Drive M62/A64 towards York (approx 2 hours).",
        "mapLink": "https://www.google.com/maps/dir/Manchester/York+Meadows+Caravan+Park"
      },
      {
        "time": "16:30",
        "title": "Arrive at York Meadows",
        "type": "hotel",
        "icon": "fa-campground",
        "description": "Set up at York Meadows Caravan Park (Sheriff Hutton).",
        "mapLink": "https://maps.google.com/?q=York+Meadows+Caravan+Park"
      },
      {
        "time": "18:00",
        "title": "Dinner at Guy Fawkes Inn",
        "type": "food",
        "icon": "fa-utensils",
        "description": "If you have the energy, take the short drive/bus into York for an atmospheric pub dinner right next to the Minster.",
        "mapLink": "https://maps.google.com/?q=Guy+Fawkes+Inn+York"
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
        "description": "Walk the historic City Walls and visit the spectacular York Minster.",
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
        "description": "Wander the famous medieval timber-framed street for shopping and photos.",
        "mapLink": "https://maps.google.com/?q=The+Shambles+York"
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
        "description": "Perfect for the 'Le Sanctuaire' eye—see the famous Poison Garden and water cascades.",
        "mapLink": "https://maps.google.com/?q=Alnwick+Castle",
        "ticketLink": "https://www.alnwickcastle.com/book-tickets"
      },
      {
        "time": "14:30",
        "title": "Coastal Drive & Bamburgh Castle",
        "type": "travel",
        "icon": "fa-camera",
        "description": "Drive the coastal road past Bamburgh Castle for dramatic beach photos.",
        "mapLink": "https://www.google.com/maps/dir/Alnwick+Castle/Bamburgh+Castle/Proctors+Stead+Caravan+Park"
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
        "time": "18:00",
        "title": "Dinner in Craster",
        "type": "food",
        "icon": "fa-fish",
        "description": "Walk down into Craster village for fresh seafood right on the harbor (e.g., The Jolly Fisherman).",
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
    "items": [
      {
        "time": "09:30",
        "title": "Depart Proctors Stead",
        "type": "travel",
        "icon": "fa-route",
        "description": "Drive the scenic coastal A1 route north into Scotland (approx 2 hrs).",
        "mapLink": "https://www.google.com/maps/dir/Proctors+Stead+Caravan+Park/Mortonhall+Caravan+Park"
      },
      {
        "time": "12:30",
        "title": "Arrive at Mortonhall",
        "type": "hotel",
        "icon": "fa-campground",
        "description": "Arrive at Mortonhall Caravan & Camping Park. Set up the van.",
        "mapLink": "https://maps.google.com/?q=Mortonhall+Caravan+Park"
      },
      {
        "time": "14:00",
        "title": "Bus to City Center",
        "type": "travel",
        "icon": "fa-bus",
        "description": "Catch the quick local bus from outside the park straight into Edinburgh."
      },
      {
        "time": "15:00",
        "title": "The Royal Mile",
        "type": "activity",
        "icon": "fa-walking",
        "description": "Walk the Royal Mile from the Castle down toward Holyrood.",
        "mapLink": "https://maps.google.com/?q=The+Royal+Mile+Edinburgh"
      },
      {
        "time": "18:30",
        "title": "Dinner at The Witchery",
        "type": "food",
        "icon": "fa-utensils",
        "description": "Incredibly gothic and atmospheric dining by the castle.",
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
        "description": "Phenomenal glasshouses and rock gardens.",
        "mapLink": "https://maps.google.com/?q=Royal+Botanic+Garden+Edinburgh"
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
        "title": "Calton Hill",
        "type": "activity",
        "icon": "fa-camera",
        "description": "Climb Calton Hill for panoramic photos of the city skyline.",
        "mapLink": "https://maps.google.com/?q=Calton+Hill"
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
        "title": "Rannoch Moor & Glencoe",
        "type": "activity",
        "icon": "fa-mountain",
        "description": "Drive across the desolate Rannoch Moor and descend through the breathtaking Glencoe pass. Pull over for photos."
      },
      {
        "time": "15:30",
        "title": "Arrive at Glen Nevis",
        "type": "hotel",
        "icon": "fa-campground",
        "description": "Set up at Glen Nevis Caravan & Camping Park (sitting right at the foot of Ben Nevis).",
        "mapLink": "https://maps.google.com/?q=Glen+Nevis+Caravan+and+Camping+Park"
      },
      {
        "time": "18:00",
        "title": "Dinner at Ben Nevis Inn",
        "type": "food",
        "icon": "fa-utensils",
        "description": "Walk right next door for a hearty dinner at the famous mountaineers' pub.",
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
    "items": [
      {
        "time": "08:30",
        "title": "Start Trotternish Loop",
        "type": "travel",
        "icon": "fa-route",
        "description": "Early start to beat the crowds.",
        "mapLink": "https://www.google.com/maps/dir/Portree+Campsite/Old+Man+of+Storr/Kilt+Rock/Quiraing/Portree+Campsite"
      },
      {
        "time": "09:30",
        "title": "Hike Old Man of Storr",
        "type": "activity",
        "icon": "fa-hiking",
        "description": "Steady climb for incredible aesthetic views.",
        "mapLink": "https://maps.google.com/?q=Old+Man+of+Storr"
      },
      {
        "time": "13:00",
        "title": "Kilt Rock & The Quiraing",
        "type": "activity",
        "icon": "fa-mountain",
        "description": "See the waterfall dropping into the ocean, then drive up into the otherworldly Quiraing.",
        "mapLink": "https://maps.google.com/?q=Quiraing"
      },
      {
        "time": "16:00",
        "title": "Return to Portree",
        "type": "activity",
        "icon": "fa-campground",
        "description": "Return to Portree Campsite to rest tired legs."
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
        "description": "Visit the historic seat of Clan MacLeod and its beautiful walled garden.",
        "mapLink": "https://maps.google.com/?q=Dunvegan+Castle",
        "ticketLink": "https://www.dunvegancastle.com/book-tickets/"
      },
      {
        "time": "13:00",
        "title": "Neist Point Lighthouse",
        "type": "activity",
        "icon": "fa-camera",
        "description": "Dramatic coastal walk along the sheer cliffs to the lighthouse.",
        "mapLink": "https://maps.google.com/?q=Neist+Point+Lighthouse"
      },
      {
        "time": "18:00",
        "title": "Premium Dinner",
        "type": "food",
        "icon": "fa-utensils",
        "description": "Treat yourself to a final Skye dinner at The Three Chimneys (world-renowned, book months ahead!) or Edinbane Lodge.",
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
    "overview": "The longest drive of the trip, arriving in the stunning Lake District.",
    "bgImage": "",
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
        "time": "15:30",
        "title": "Friar's Crag",
        "type": "activity",
        "icon": "fa-walking",
        "description": "Stretch your legs by walking down to the lake edge at Friar’s Crag.",
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
    "overview": "Catbells hike, Grasmere Gingerbread, and Wordsworth.",
    "bgImage": "",
    "items": [
      {
        "time": "09:30",
        "title": "Catbells Hike",
        "type": "activity",
        "icon": "fa-hiking",
        "description": "Drive to the base of Catbells for a short, sharp climb with expansive, beautiful views.",
        "mapLink": "https://maps.google.com/?q=Catbells+Lake+District"
      },
      {
        "time": "13:00",
        "title": "Grasmere & Dove Cottage",
        "type": "activity",
        "icon": "fa-home",
        "description": "Visit Wordsworth’s Dove Cottage and buy the famous Grasmere Gingerbread.",
        "mapLink": "https://maps.google.com/?q=Dove+Cottage+Grasmere"
      },
      {
        "time": "17:00",
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