export default class DataManager {
  static myInstance = null;
  userID = "";

  trips = [
    {
      userid: "user1",
      id: 1,
      title: "Bali Trip"
    },
    {
      userid: "user2",
      id: 2,
      title: "Sydney Business Trip"
    },
    {
      userid: "user2",
      id: 3,
      title: "Snowboarding in Calgary"
    },
    {
      userid: "user2",
      id: 4,
      title: "Mexico Trip with Mates"
    },
    {
      userid: "user2",
      id: 5,
      title: "Cousin's Wedding!"
    },
    {
      userid: "user2",
      id: 6,
      title: "Romantic escape to Melbourne"
    }
  ];

  itinerary = [
    {
      id: 1,
      tripid: 3,

      title: "Calgary Stampede",
      subtitle: "Rodeo event for all ages",
      category: "Play"
    },
    {
      id: 2,
      tripid: 3,

      title: "Chuck E Cheese",
      subtitle: "Family-focused diner",
      category: "Eat"
    },
    {
      id: 3,
      tripid: 2,

      title: "Hotel Fairmont Palliser",
      subtitle:
        "Upscale lodging with an elegant lounge & a 1920s-themed restaurant.",
      category: "Stay"
    },
    {
      id: 4,
      tripid: 2,

      title: "Hyatt Regency",
      subtitle:
        "Polished high-rise lodging offering a modern bar & restaurant, plus a spa & event space.",
      category: "Stay"
    },
    {
      id: 5,
      tripid: 3,

      title: "Calgary Marriott Downtown Hotel",
      subtitle:
        "Contemporary property that offers American dining, 16 meeting rooms & a fitness center.",
      category: "Stay"
    },
    {
      id: 6,
      tripid: 3,

      title: "Scotiabank Theatre Chinook",
      subtitle: "Chain showing blockbusters & indie films",
      category: "Culture"
    },
    {
      id: 7,
      tripid: 4,

      title: "Bar Patrón by Rockpool",
      subtitle:
        "Great new Mexican bar and restaurant unique dishes and fab cocktails",
      category: "Nightlife"
    },
    {
      id: 8,
      tripid: 4,

      title: "Montezuma's",
      subtitle:
        "Lively, Aztec-themed chain offering Mexican staples like burritos and enchiladas, plus cocktails.",
      category: "Nightlife"
    },
    {
      id: 9,
      tripid: 4,

      title: "Sonora",
      subtitle: "Contemporary Mexican Restaurant",
      category: "Nightlife"
    },
    {
      id: 10,
      tripid: 6,

      title: "Sex Toys Melbourne",
      subtitle: "Adult entertainment store",
      category: "Shopping"
    }
  ];

  users = [
    {
      id: "user1",
      name: "Billie Eilish",
      email: "billie@gmail.com",
      password: "1234"
    },
    {
      id: "user2",
      name: "Jon Snow",
      email: "js@gmail.com",
      password: "2345"
    }
  ];

  getItinerary(id) {
    return this.itinerary.filter((trip) => trip.tripid === id);
  }

  getItineraryByCategory(id, category) {
    if (category) {
      return this.itinerary.filter(
        (trip) => trip.tripid === id && trip.category === category
      );
    } else {
      return this.itinerary.filter((trip) => trip.tripid === id);
    }
  }

  getThing(id) {
    return this.itinerary.filter((item) => item.id === id)[0];
  }

  updateItem(id, updated) {
    var index = this.itinerary.findIndex((x) => x.id == id);
    const item = this.itinerary[index];

    this.itinerary[index] = { ...item, ...updated };
  }

  static getInstance() {
    if (DataManager.myInstance == null) {
      DataManager.myInstance = new DataManager();
    }
    return this.myInstance;
  }

  getUserID() {
    return this.userID;
  }

  setUserID(id) {
    this.userID = id;
  }

  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }
  addUser(user) {
    this.users.push(user);
  }

  getUserByEmail(email) {
    return this.users.filter((user) => user.email === email);
  }

  getTrips(id) {
    console.log("getting trips for id: ", id);
    return this.trips.filter((trip) => trip.userid === id);
  }

  addTrip(trip) {
    this.trips.push(trip);
  }
  removeTrip(id) {
    this.trips = this.trips.filter((trip) => trip.id !== id);
  }

  addItem(item) {
    this.itinerary.push(item);
  }
  removeItem(id) {
    this.itinerary = this.itinerary.filter((item) => item.id !== id);
  }
}
