


export default new (class InMemoryPersonRepository {

  persons = []
  id = 0;


  add(person){

    this.persons.push({
      ...person
    });
    return true;
  }

  getAll(){
    return this.persons;
  }

  remove(id){
    this.persons = this.persons.filter(person => person.id != id);
    return true
  }

})()