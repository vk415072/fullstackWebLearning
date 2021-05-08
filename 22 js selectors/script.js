// trying diff selectors:
// here i'm only targeting the first paragraph from the html

// 1. element selector by id
document.getElementById("first");

// 2. query selector by id (it uses CSS synatax. "#" in this case)
document.querySelector("#first");

// 3. elements by class name
document.getElementsByClassName("special");
// but it'll give all elements with this class name, so to narrow it down to first one we'll add [0]
document.getElementsByClassName("special") [0];

// 4. query selector by class
document.querySelector(".special");
// here no need to add [0] as regular or query selector only look for first result
// if we use 'querySelectorAll' then we can specify which one we need. eg:
document.querySelectorAll(".special") [0];

// 5. elements by tag name
document.getElementsByTagName("p") [0];

// 6. querySeslector by tag name
document.querySelectorAll("p") [0];

// they all select this:
// <p id="first" class="special">Hello</p>