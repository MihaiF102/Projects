const mongoose = require("mongoose")
const cities = require("./cities")
const { places, descriptors } = require("./seedHelpers")
const Campground = require("../models/campground")

mongoose.connect('mongodb+srv://mihaiDB:7VcZDi5mvyC8kbg@clusterm.ykjww.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on("error", console.error.bind(console, "connections error"))
db.once("open", () => {
    console.log("Database connected")
})

const sample = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: "607433c5f7ec6d327886eb74",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore ex veniam, voluptatibus nisi sed recusandae fugiat suscipit explicabo similique beatae excepturi ut voluptatum facere alias laudantium sapiente incidunt.Itaque,ipsa.",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: "https://res.cloudinary.com/detaqbtvd/image/upload/v1618224599/YelpCamp/ehtlacuiz2d2qlegir4v.jpg",
                    filename: "YelpCamp/ehtlacuiz2d2qlegir4v"
                },
                {
                    url: "https://res.cloudinary.com/detaqbtvd/image/upload/v1618224599/YelpCamp/nbajk3mrsmwojweaosph.jpg",
                    filename: "YelpCamp/nbajk3mrsmwojweaosph"
                },
                {
                    url: "https://res.cloudinary.com/detaqbtvd/image/upload/v1618224599/YelpCamp/qkl94bgtoxcckzg23kym.jpg",
                    filename: "YelpCamp/qkl94bgtoxcckzg23kym"
                }
            ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})