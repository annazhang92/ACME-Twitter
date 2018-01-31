
const people = [
    {id:1, name:'Max'},
    {id:2, name:'Jan'},
    {id:3, name:'Anna'},
];

const getPeople =() =>{
    return people;
}

const getPerson=(id) =>{
    return people.find (person=>person.id ===id*1);
}

module.exports ={
    getPeople,
    getPerson
}