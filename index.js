const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`
const makeBrTag = tag => str => `${str}<${tag}>`
const startParTag = tag => str => `<${tag}>${str}`
const endParTag = tag => str => `${str}</${tag}>`

// complete this function
const makePoemHTML = (myPoem) => {
  return [titleSetUp(myPoem[0].title), authorSetUp(myPoem[0].author), formatPoem(myPoem[0].lines)].join(' ')
}

//////////////////////////////////////////////////////////////////
//Specific Tags set up
const makeH3 = makeTag('h3')
const makeP = makeTag('p')
const makeBr = makeBrTag('br')
const makePstart = startParTag('p')
const makePend = endParTag('p')
const makeEm = makeTag('em')

//Title Setup
const titleSetUp = makeTag('h2')

//Author Specific Set Up
const addBy = str => "by " + str
const authorSetUp = pipe(addBy, makeEm, makeH3)

//Add breaks to line
// function addBreaks(poemLine) {
//   return makeBr(poemLine)
// }
const addBreaks = poemLine => makeBr(poemLine)

//Line Set up
const firstLine = pipe(makePstart, makeBr)
const lastLine = pipe(makeBr, makePend)

//Format the Lines & stanzas of a poem
function formatPoem(inputArray){

  //Create a holder for the stanzas
  var paragraphArray = []

  //Holds the lines of the current stanza
  var currentStanza = []

  //Determines where the current stanza ends and the next starts
  var lineCounter = []

  //Go through each line of the poem
  for (let i = 0; i < inputArray.length; i++) {

    //Check if th line is a regular line, a stanza end, or the last line
    if(inputArray[i] == "") // This is the end of a stanza
    {
      //join lines of current stanza
      currentStanza = inputArray.slice(lineCounter, i)
      currentStanza = currentStanza.join(' ')

      //Get all the lines of the current stanza and put a paragraph around them
      paragraphArray.push(makeP(currentStanza))

      //update counter
      lineCounter = i

      //clear current stanza
      currentStanza = []

    }else if (i == inputArray.length-1) //This is the end of the poem
      {
        //join lines of current stanza
        currentStanza = inputArray.slice(lineCounter, i+1)
        currentStanza = currentStanza.join(' ')

        //Get all the lines of the current stanza and put a paragraph around them
        paragraphArray.push(makeP(currentStanza))

    }else //this is the end of a line
    {
    //check if the next line is NOT the end of a stanza
      if(inputArray[i+1] != "")
      {
      //remove the last character (a comma) from the string
      inputArray[i].slice(0, -1)

      //For the current line, add break and join to previous line of stanza
      inputArray[i] = makeBr(inputArray[i])
      }
    }
  }

  //Join the pagraphs so there are no commas
  paragraphArray = paragraphArray.join(' ')

  //Return our newly formatted poem
  return paragraphArray
}

//////////////////////////////////////////////////
// function formatPoem2(inputArray){

//     //Create a holder for the stanzas
//     var paragraphArray = []

//     //Holds the lines of the current stanza
//     var currentStanza = []
  
//     //Determines where the current stanza ends and the next starts
//     var lineCounter = []

//   for (let i = 0; i < inputArray.length; i++) {

//     if(i == 0){
//       inputArray[i] = firstLine(inputArray[i])

//     }else {
//       //Check if th line is a regular line, a stanza end, or the last line
//       if(inputArray[i] == "") // This is the end of a stanza
//       {
//         inputArray[i] = makePend(inputArray[i])

//         //join lines of current stanza
//         currentStanza = inputArray.slice(lineCounter, i+1)
//         currentStanza = currentStanza.join(' ')

//         //Get all the lines of the current stanza and put a paragraph around them
//         paragraphArray.push(currentStanza)

//         //update counter
//         lineCounter = i

//         console.log(lineCounter)

//         //clear current stanza
//         currentStanza = []

//       }else if (i == inputArray.length-1) //This is the end of the poem
//         {
//           inputArray[i] = makePend(inputArray[i])
//           //join lines of current stanza
//           currentStanza = inputArray.slice(lineCounter, i+1)
//           currentStanza = currentStanza.join(' ')

//           //Get all the lines of the current stanza and put a paragraph around them
//           paragraphArray.push(currentStanza)

//       }else //this is the end of a line
//       {
//       //check if the next line is NOT the end of a stanza
//         if(inputArray[i+1] != "")
//         {
//           if(i-1 == lineCounter)
//           {
//             console.log(i)
//             inputArray[i] = firstLine(inputArray[i])
//           }else
//           {
//           //For the current line, add break and join to previous line of stanza
//           inputArray[i] = makeBr(inputArray[i])
//           }
//         }
//       }
//     }
//   }

//     //Join the pagraphs so there are no commas
//     paragraphArray = paragraphArray.join(' ')

//     //Return our newly formatted poem
//     return paragraphArray
// }

////////////////////////////////////

// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))


  // //Grab the data
  // const res = await getJSON(poemURL)
  // const myRes = res[0]

  // showPoemInfo(myRes)
  // function showPoemInfo({
  //   author,
  //   title,
  //   lines
  // }){
  //   //poemEl.innerHTML = titleSetUp(title)
  //   //poemEl.innerHTML = authorSetUp(author)
  //   //poemEl.innerHTML = formatPoem(lines)

  // }

}

