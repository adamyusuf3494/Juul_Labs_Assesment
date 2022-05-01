/**
 * Function reads an xml file
 * @param {xml File} xmlFile 
 * @returns xml data as string
 */
function readXml(xmlFile) {
    return new Promise(function(resolve, reject) {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", xmlFile, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                return resolve(xmlFunction(this.response))
            }
        };
    })
}

/**
 * Function parses xml string into xml tree
 * @param {*} xml 
 * @returns xml tree
 */
function xmlFunction(xml) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xml, "text/xml");
    return xmlDoc
}

/**
 * Function creates an HTML input element from XML node
 * @param {xml node } node 
 * @param {html form element} form 
 * @param {html div element} div 
 */
function createTextInput(node, form, div) {

    // Add styling to the div that the input will be nested in
    div.className = "mui-textfield mui-textfield--float-label";

    title = node.getAttribute('title')

    var span

    // Create input element dynamically
    input = document.createElement("input");

    // Map node attributes to the input element
    mapAttribute(node, input)

    // Append input element to the div element
    div.appendChild(input);

    // If mapAttribute creates a span element, append it to the div element
    if (span) {
        div.appendChild(span);
    }

    // Append div element to the form element
    form.appendChild(div);
}

/**
 * Function creates an HTML select element from XML node
 * @param {xml node } node 
 * @param {html form element} form 
 * @param {html div element} div 
 */
function createSelectInput(node, form, div) {
    total = 0
    title = node.getAttribute('title')

    // If the xml node has a multiple attribute, create a button that will dynamically add a new element when selected
    if (node.getAttribute('multiple')) {
        createAddNewItemButton()
    }

    // Create a select element dynamically
    select = document.createElement("select");
    // Create HTML select element and set Attributes
    setSelectElementAttribute(title, node, select)

    // Create default select option
    createDefaultOption(title, select)

    // Create option element for each value in the array
    createSelectOptions(node, select)
    
    // Create a label element dynamically
    label = document.createElement("label");
    label.innerHTML = title;

    // Create a nested div element dynamically
    nestedDiv = document.createElement("div");
    // Add styling to the nested div that the select element will be nested in
    nestedDiv.className = "mui-select";
    // Append select element to the nested div element
    nestedDiv.appendChild(select)
    // Append label element to the nested div element
    nestedDiv.appendChild(label)
    // Append the nested div element to the div element
    div.appendChild(nestedDiv)
    // Append div element to the form element
    form.appendChild(div)
}

/**
 * Function creates an HTML radio element from XML node
 * @param {xml node } node 
 * @param {html form element} form 
 * @param {html div element} div 
 */
function createRadioInput(node, form, div) {

    title = node.getAttribute('title')

    // Create a label element dynamically
    label = document.createElement("h4");
    label.innerHTML = title

    // Append label element to the div element
    div.appendChild(label)

    // Create option element for each value in the array
    createRadioOptions(node, div)

    // Append div element to the form element
    form.appendChild(div)
}

/**
 * Function adds pattern attribute to HTML input element
 * @param {Title of the input element} title 
 * @param {HTML input element} input 
 * @param {HTML span element} span 
 */
function inputFormat(title, input, span){
    if (title == "Email Address") {
        input.setAttribute("pattern", "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
        span.innerHTML = "expected format: email@email.com"

    } else if (title == "Phone Number") {
        input.setAttribute("pattern", "[0-9]{3}-[0-9]{3}-[0-9]{4}");
        span.innerHTML = "expected format: 111-111-1111"


    } else if (title == "Postal Code") {
        input.setAttribute("pattern", "[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]");
        span.innerHTML = "expected format: A1A 1A1"

    }
}

/**
 * Function maps xml node attributes to HTML input element attributes
 * @param {XML node} node 
 * @param {HTML input element} input 
 */
function mapAttribute(node, input){
    for (i = 0; i < node.attributes.length; i++) {
        if (node.attributes[i].name == "required") {
            input.setAttribute(node.attributes[i].name, "");
        }
        if (node.attributes[i].name == "disabled") {
            input.setAttribute("readonly", "");
        } 
        else if (node.attributes[i].name == "sum") {
            input.setAttribute("value", "0");
        } 
        else if (node.attributes[i].name == "tax_rate") {
            input.setAttribute("taxRate", "15");
        } 
        else if (node.attributes[i].name == "format") {
            span = document.createElement("span");
            inputFormat(title, input, span)
        }
        else if (node.attributes[i].name == "type") {
            input.setAttribute(node.attributes[i].name, node.attributes[i].value);
        } 
        else if (node.attributes[i].name == "title") {
            input.setAttribute("name", node.attributes[i].value);
            input.setAttribute("id", node.attributes[i].value);
        }
    }
}

/**
 * Function creates the default option for HTML select element
 * @param {title of the select element} title 
 * @param {HTML option element} option 
 * @param {HTML Select element} select 
 */
function createDefaultOption(title, select){
    // Create a option element dynamically
    option = document.createElement("option");

    if (title == "Item") {
        option.setAttribute("value", "0");
    } else if (title == "Province") {
        option.setAttribute("value", "");
    }
    option.innerHTML = ""
    select.appendChild(option);
}

/**
 * Function sets attributes of HTML select element
 * @param {title of the select element} title 
 * @param {XML node} node 
 * @param {HTML select element} select 
 */
function setSelectElementAttribute(title, node, select){
    select.setAttribute("name", title);
    select.setAttribute("id", title);

    if (title == "Item") {
        select.addEventListener("change", sum)
    }

    if (node.getAttribute('required')) {
        select.setAttribute("required", "");
    }
}

/**
 * Function creates option elemnts for select element 
 * @param {XML node} node 
 * @param {HTML select element} select 
 */
function createSelectOptions(node, select){
    // Create an array with the options from the xml node
    myArray = node.getAttribute('options').split(",").map(p => p.trim());
    
    // Iterate through array to create options
    myArray.forEach(value => {

        option = document.createElement("option");

        if (value.includes("|")) {
            option.setAttribute("value", value.split("|")[1]);
            option.innerHTML = value.split("|")[0]
        } else {
            option.setAttribute("value", value);
            option.innerHTML = value
        }

        select.appendChild(option);

    })
}

/**
 * Function creates option elemnts for radio element
 * @param {XML Node} node 
 * @param {HTML div element} div 
 */
function createRadioOptions(node, div){
    // Create an array with the options from the xml node
    myArray = node.getAttribute('options').split(",").map(p => p.trim());

    // Iterate through array to create options
    myArray.forEach(value => {
        // Create a option element dynamically
        option = document.createElement("input");
        option.setAttribute("type", "radio");
        option.setAttribute("option", value);
        option.setAttribute("name", title);
        option.setAttribute("value", value);
        option.addEventListener("change", sum)

        // Create a label element dynamically
        let label = document.createElement("label");
        label.innerHTML = value

        // Create a nestedDiv element dynamically
        let nestedDiv = document.createElement("div");
        nestedDiv.className = "mui-radio";
        nestedDiv.appendChild(option)
        nestedDiv.appendChild(label)

        div.appendChild(nestedDiv)
    })
}

/**
 * Recursive function that traverses the XML Tree to convert it to an HTML form
 * @param {XML tree} tree 
 */
function traverse(tree) {
    // Check if tree has a child node and child node value is not 0
    if (tree.hasChildNodes() & tree.childNodes[0]?.nodeValue != "0") {
        // Remove underscore from the title
        nodeTitle = tree.tagName.replace(/_/g, ' ');

        // Create a h2 element dynamically
        section = document.createElement("h2")
        section.innerHTML = nodeTitle.toUpperCase()

        // Append h2 element to form
        form.appendChild(section)

        for (var i = 0; i < tree.childNodes.length; i++) {
            traverse(tree.childNodes[i])
        }
    } else {
        // Ignore undefined children returned during the traversal of the XML tree
        if (tree.tagName != undefined) {
            type = tree.getAttribute('type')
            total = 0

            div = document.createElement("div");

            label = document.createElement("label");
            label.innerHTML = tree.getAttribute('title')

            // Based on the type of node, create corresponding element
            if (type.toLowerCase() == "text") {
                createTextInput(tree, form, div)
                div.appendChild(label)
            } else if (type.toLowerCase() == "select") {
                createSelectInput(tree, form, div)
            } else if (type.toLowerCase() == "radio") {
                createRadioInput(tree, form, div)
            }
        }
    }
}

/**
 * Function to create add new item button dynamically
 */
function createAddNewItemButton() {
    // Create a button element dynamically
    btn = document.createElement("button");
    // Add styling to the button element
    btn.className = "mui-btn mui-btn--primary";
    btn.setAttribute("type", "button");
    btn.innerHTML = "Add item";
    btn.addEventListener("click", addNewItem)

    // Append button to the form
    form.appendChild(btn)
}

/**
 * Funtion to create new item
 */
function addNewItem() {
    // Create a div element dynamically
    nestedDiv = document.createElement("div");
    // Add styling to the div element
    nestedDiv.className = "mui-select";

    // Get the item element
    node = document.getElementsByName("Item");

    // Clone the item elemnt
    clone = node[node.length - 1].cloneNode(true);
    clone.addEventListener("change", sum)

    // Create a label element dynamically
    label = document.createElement("label");
    label.innerHTML = "Item";

    // Append the clone item element to the nested div
    nestedDiv.appendChild(clone)
    // Append the label item element to the nested div
    nestedDiv.appendChild(label)

    // Append the nested div to the parent of the parent of the item node
    node[node.length - 1].parentNode.parentNode.appendChild(nestedDiv)
}

/**
 * Funtion sums the expedited shipping and the items
 */
function sum() {
    total = 0

    // Get the the expedited radio element
    expedited = document.getElementsByName("Expedited Shipping");

    // Get array of item select elements
    array = document.getElementsByName("Item");

    if (expedited[0].checked) {
        total += 300
    }

    // Sum the item elements
    for (i = 0; i < array.length; i++) {
        total = total + parseInt(array[i].value)
    }

    // Get the tax input element
    tax = document.getElementsByName("Taxes");
    // Get the total input element
    final = document.getElementsByName("Total");

    // // Get the tax rate from the tax input element attributte
    attributes = tax[0].attributes
    // Calculate and update the tax 
    if (tax.length > 0) {
        tax[0].value = parseInt(attributes.getNamedItem("taxRate").value) * total / 100
    }
    // Calculate and update the final total 
    if (final.length > 0) {
        final[0].value = total + parseInt(tax[0].value)
    }
}

// Create a form dynamically
var form = document.createElement("form");
form.setAttribute("action", "display.html");

// Add styling to the form
form.className = "mui-form";

// Fetch and parse the XML document into traversable tree
readXml("https://raw.githubusercontent.com/adamyusuf3494/Juul_Labs_Assesment/main/juul/xmlTest.txt").then((xmlDoc) => {
    // traverse the XML file
    traverse(xmlDoc.childNodes[0])

    // create a submit button dynamically
    var s = document.createElement("input");
    s.setAttribute("type", "submit");
    s.setAttribute("value", "Submit");
    // Add styling to the submit button
    s.className = "mui-btn mui-btn--primary";

    // Append the submit button to the form
    form.appendChild(s);
})

// Append the form to the document
document.body.appendChild(form);