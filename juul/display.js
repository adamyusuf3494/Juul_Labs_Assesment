    // Retrieve the parameters from the url
    const params = new URL(location.href).searchParams;
    // Retreive the values from the url
    fullName = params.get('Full Name')
    email = params.get("Email Address");
    phoneNumber = params.get("Phone Number");
    street = params.get("Street Address");
    city = params.get("City");
    province = params.get("Province");
    postalCode = params.get("Postal Code");
    expedited = params.get("Expedited Shipping");
    items = params.getAll("Item")
    taxes = params.getAll("Taxes")
    finalTotal = params.getAll("Total")

    // Create main div container and sub containers for the various sections
    var container = document.createElement("div");
    var subContainer1 = document.createElement("div");
    var subContainer2 = document.createElement("div");
    var subContainer3 = document.createElement("div");
    var subContainer4 = document.createElement("div");

    // Create h2 and h5 element to display the data
    orderSummary = document.createElement("h2")
    orderSummary.innerHTML = "Order Summary"
    
    customerInfo = document.createElement("h2")
    customerInfo.innerHTML = "Customer Info"
    
    fullNameText = document.createElement("h5")
    fullNameText.innerHTML = "Full Name: "+  fullName
    
    emailText = document.createElement("h5")
    emailText.innerHTML = "Email Address: "+  email
    
    phoneNumberText = document.createElement("h5")
    phoneNumberText.innerHTML = "Phone Number: "+  phoneNumber
    
    address = document.createElement("h2")
    address.innerHTML = "Address"
    
    streetAddressText = document.createElement("h5")
    streetAddressText.innerHTML = "Street Address: "+  street
    
    cityText = document.createElement("h5")
    cityText.innerHTML = "City: "+  city
    
    provinceText = document.createElement("h5")
    provinceText.innerHTML = "Province: "+  province
    
    postalCodeText = document.createElement("h5")
    postalCodeText.innerHTML = "Postal Code: "+  postalCode
    
    orderDetails = document.createElement("h2")
    orderDetails.innerHTML = "Order Details"

    taxText = document.createElement("h5")
    taxText.innerHTML = "Taxes: "+  taxes
    
    totalText = document.createElement("h5")
    totalText.innerHTML = "Total: "+  finalTotal
    
    // Appended the text elements to their appropriate containers
    subContainer1.appendChild(orderSummary)

    subContainer2.appendChild(customerInfo)
    subContainer2.appendChild(fullNameText)
    subContainer2.appendChild(emailText)
    subContainer2.appendChild(phoneNumberText)

    subContainer3.appendChild(address)
    subContainer3.appendChild(streetAddressText)
    subContainer3.appendChild(cityText)
    subContainer3.appendChild(provinceText)
    subContainer3.appendChild(postalCodeText) 

    subContainer4.appendChild(orderDetails)
    subContainer4.appendChild(taxText)
    subContainer4.appendChild(totalText)
    
    container.appendChild(subContainer1)
    container.appendChild(subContainer2)
    container.appendChild(subContainer3)
    container.appendChild(subContainer4)

    // Appended main container to the document body
    document.body.appendChild(container);