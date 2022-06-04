require('dotenv').config();
const mongoose = require('mongoose');
const {
  Schema
} = mongoose;



mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const personSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});
const Person = mongoose.model("Person", personSchema);


const newPersoon = new Person({
  name: "Xerox 420",
  age: 25,
  favoriteFoods: ["Pizza", "Burger"]
})

const createAndSavePerson = (done) => {
  newPersoon.save(function (err, data) {
    if (err) return done(err);
    console.log(data);
    done(null, data);
  });

};

var arrayOfPeople = [{
    name: "ter stegan",
    age: 30,
    favoriteFoods: ["Burger"]
  },
  {
    name: "Alves",
    age: 39,
    favoriteFoods: ["chicken"]
  },
  {
    name: "Alba",
    age: 30,
    favoriteFoods: ["Pizza"]
  }
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err);
    console.log(data);
    done(null, data);
  })
};
const findPeopleByName = (personName, done) => {
  Person.find({
    name: personName
  }, function (err, personFound) {
    if (err) return done(err);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({
    favoriteFoods: food
  }, function (err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({
    name: personName
  }, {
    age: ageToSet
  }, {
    new: true
  }, (err, updatedDoc) => {
    if (err) return done(err);
    done(null, updatedDoc);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(
    personId,
    (err, removedDoc) => {
      if (err) return done(err);
      done(null, removedDoc);
    }
  );
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({
    name: nameToRemove
  }, (err, response) => {
    if (err) return done(err);
    done(null, response);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/ );
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;