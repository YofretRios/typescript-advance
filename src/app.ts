// ## 1 Intersection Types (un common)
// Intercection types allows us to combine other types
type Admin =  {
  name: string;
  roles: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;
// interface ElevatedEmployee extends Admin, Employee {}
// Concept that is very close on interface

const e1: ElevatedEmployee = {
  name: 'Joe',
  roles: ['create-server'],
  startDate: new Date(),
}

console.log(e1)

// Intersection types can be used in conjuction with any types including union types
type Combinable = string | number;
type Numeric = number | boolean;
// In this case the intersection type is number
type Universal = Combinable & Numeric;

// ## 2 Type Guards (more common)
// They Help with Union Types, and Intersection Types
// While having the flexibility of both of them, often we need to know which exact are we getting at runtime
// Type guards using typeof
function add(a: Combinable, b: Combinable) {
  // return a + b; // Wrong, needs type guards
  if (typeof a === 'string' || typeof b === 'string') { // Type guard
    return a.toString() + b.toString();
  }

  return a + b;
}

const result = add(5, '5');

// Type guards using "in" keyword
type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('name: ' + emp.name);
  // console.log('roles: ' + emp.roles); // Wrong, needs type guards
  // console.log('startDate: ' + emp.startDate); // Wrong, needs type guards
  if ('roles' in emp) { // The Typ Guard for roles
    console.log('roles: ' + emp.roles);
  }
  if ('startDate' in emp) {	// The Typ Guard for startDate
    console.log('startDate: ' + emp.startDate);
  }
}

printEmployeeInformation(e1);

// Type guards using "instace of" keyword
class Car {
  drive() {
    console.log('driving...');
  }
}

class Truck {
  drive() {
    console.log('driving a truck...');
  }

  loadCargo(amount: number) {
    console.log('Loading cargo... ' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(v: Vehicle) {
  v.drive();
  if (v instanceof Truck) {
    v.loadCargo(5); // wrong, needs type guards
  }
}

useVehicle(v2);

// ## 3 Discriminated Unions
// Is Pattern that can be use when working with union type, that makes
// type guard easier, is available when working with object types
interface Bird {
  type: 'bird' // Discriminator, not a value
  flyingSpeed: number
}

interface Horse {
  type: 'horse' // Discriminator, not a value
  runningSpeed: number
}

type Animal = Bird | Horse; // Discriminated union, with a common property that describe that object

function moveAnimal(animal: Animal) {
  // console.log('Moving with spedd: ' + animal.flyingSpeed); // Wrong, Needs a type guard, or discriminated union
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = 'Moving with speed: ' + animal.flyingSpeed;
      break;
    case 'horse':	
      speed = 'Moving with speed: ' + animal.runningSpeed;
  }
  console.log(speed);
}

moveAnimal({ type: 'bird', flyingSpeed: 10})

// ## 4 Type Casting
// Helps us tell typescript the an specific value is of a specific type where typescript is not able detect it 
// on its own
// const paragraph = document.querySelector('p'); // typscript knows we want to select a P
// That changes when selecting by ID
// const paragraph = document.getElementById('message id'); // typscript only knows that is a HTML Element
// const userInput = <HTMLInputElement> document.getElementById('user-input');
// The "!" tells typscript that the expresion in front will never yield null
const userInput = document.getElementById('user-input') as HTMLInputElement;

userInput.value = 'Hi there!'; // Won't work, without type casting

// ## 5 Index Properties
// Allows us to create object which are more flexible regarding the properties they might hold
// No need to know in advance which property
interface ErrorContainer {
  [prop: string]: string // Telling Typscript that an object based on ErrorContainer container must have a key that is a string, with a string value
  // id: string
}

const error: ErrorContainer = {
  email: 'Wrong Email',
  userName: 'Must start with a capital letter'
}

// ## 6 Function overloads
// Allows us to have multiple functions with the same name, but different call signatures

function parseDate(timestamp: number): Date;
function parseDate(m: number, d: number, y: number): Date;
function parseDate(m: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, m, d);
  }

  return new Date(m);
}

const date = parseDate(12345678);
const date2 = parseDate(1, 1, 1);