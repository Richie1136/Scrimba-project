let myLeads = []
const inputEl = document.getElementById('input-el')
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById('ul-el')
const deleteBtn = document.getElementById('delete-btn')
const tabBtn = document.getElementById('tab-btn')
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
  })
})

const render = (leads) => {
  let listItems = ""
  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
            <a target='_blank' href='${leads[i]}'>
            ${leads[i]}
            </a>
            </li>
            `
  }
  ulEl.innerHTML = listItems
}


if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  render(myLeads)
}
deleteBtn.addEventListener('dblclick', () => {
  localStorage.clear()
  myLeads = []
  render(myLeads)
})

inputBtn.addEventListener("click", () => {
  myLeads.push(inputEl.value)
  console.log(myLeads)
  // Clear out the input field
  inputEl.value = ''
  // Save the myLeads array to localStorage 
  // PS: remember JSON.stringify()
  localStorage.setItem('myLeads', JSON.stringify(myLeads))
  render(myLeads)

})