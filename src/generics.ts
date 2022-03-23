// ## Generic Basic, they give flexibity for type safety
const names: Array<string> = ['1', 'Max'];
// names[0].split(' '); 

// ## Generic Example using promises
// We are telling typescript that the promise will return a string
const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('test');
  }, 2000);
})

promise.then(data => {
    data .split(' ');
})

// ## Creating a Generic Function
// Generics to explicitly define that we want to merge 2 objects
function merge<T, A>(objA: T, objB: A) {
  return Object.assign(objA, objB);
}

// This setup will allow non obects to be passed in
const merged = merge({ name: 'Max' }, 30);

console.log(merged)

// Adding constraints to avoid the error above
function merge2<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

// Passing a number will not work because it is not an object
const merged2 = merge2({ name: 'Max' }, { age: 30 });
merged2.age;

// ## More on Generics
interface Lenghty {
  length: number;
}

function countAndDescribe<T extends Lenghty>(element: T): [object, string] {
  let description = 'String value';
  if (element.length > 0) {
    description = 'Got ' + element.length + ' characters';
  }
  return [element, description];
}

console.log(countAndDescribe('Max'));

// ## Keyof
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return 'value: ' + obj[key] 
}

extractAndConvert({ name: 'Max' }, 'name');

// ## Generic Utility Types
interface Post {
  title: string;
  description: string;
  updatedAt: Date;
}

function createPost(title: string, description: string, date: Date): Post {
  let post: Partial<Post> = {};
  post.title = title;
  post.description = description;
  post.updatedAt = date;

  return post as Post;
}

// Locking down our food constant
const foods: Readonly<string[]> = ['banana', 'apple', 'orange'];
foods.push('grape');


// https://www.typescriptlang.org/docs/handbook/2/generics.html