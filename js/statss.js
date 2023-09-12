maxlengthSlice = 3;
async function fetchDataFromApi() {
    let urlAPi = "https://mindhub-xj03.onrender.com/api/amazing";
    try {
      const response = await fetch(urlAPi);
      return (data = await response.json());
    } catch (error) {
      console.error("Error en fetchDataFromApi:", error);
      throw error;
    }
  }

async function addValuesToRow() {
    try {
        const eventsHighestAttendance = await calculateAndSliceSortedAttendanceObject(sortEventsByAtributeDescending, maxlengthSlice);
        const eventsWithLowerAttendance = await calculateAndSliceSortedAttendanceObject(sortEventsByAtributeAscending, maxlengthSlice);
        const eventsWithLargerCapacity = await getEventsWithLargerCapacity(sortEventsByAtributeDescending, maxlengthSlice);
        
        const eventsHighestAttendanceData = extractDataConcat(eventsHighestAttendance, "name", "attendancePercentage","%");
        const eventsWithLowerAttendanceData = extractDataConcat(eventsWithLowerAttendance, "name", "attendancePercentage","%");
        const eventsWithLargerCapacityData = extractDataConcat(eventsWithLargerCapacity, "name", "capacity");

        for (let i = 0; i < maxlengthSlice; i++) {
            
            addRowToTableBody("event-statistics", eventsHighestAttendanceData[i], eventsWithLowerAttendanceData[i], eventsWithLargerCapacityData[i]);
        }
    } catch (error) {
        console.error("An error occurred while adding the rows:", error);
    }
}
async function calculateAndSliceSortedAttendanceObject(sortingFunction, maxLengthSlice) {
    try {
        const eventsArray = await getEventsWithCalculatedPercentage();
        const sortedArray = sortingFunction(eventsArray, "attendancePercentage");
        const slicedArray = sliceArrayUpToIndex(maxLengthSlice, sortedArray);
        return slicedArray;
    } catch (error) {
        console.error("An error occurred while calculating and sorting percentages:", error);
        
    }
}
    async function getEventsWithCalculatedPercentage() {
        try {
            let eventData = await fetchDataFromApi();
            console.log(eventData);
            let attendancePercentages = eventData.events.map(event => {
                if (event.assistance != null) {
                    return {
                        name: event.name,
                        attendancePercentage: (event.assistance / event.capacity) * 100
                    };
                } else {
                    return {
                        name: event.name,
                        attendancePercentage: (event.estimate / event.capacity) * 100
                    };
                }
            });

            return attendancePercentages;
        } catch (error) {
            console.error("Error getting data from API:", error);
            throw error;
        }
    }

function sortEventsByAtributeAscending(event,atributeArray) {
    event.sort((eventA, eventB) => {
        return eventA[atributeArray] - eventB[atributeArray]
    });
    return event;
}

function sortEventsByAtributeDescending(event,atributeArray) {
    event.sort((eventA, eventB) => {
        return eventB[atributeArray] - eventA[atributeArray]
    });
    return event;
}

function sliceArrayUpToIndex(index, originalArray) {
    if (index > originalArray.length) {
        console.log("El índice a cortar es mayor que la longitud del array");
    } else {
        return originalArray.slice(0, index);
    }
}

async function getEventsWithLargerCapacity(sortingFunction, maxLengthSlice) {
    try {
        const eventsData = await fetchDataFromApi();
        const sortedEvents = sortingFunction(eventsData.events, "capacity");
        const slicedEvents = sliceArrayUpToIndex(maxLengthSlice, sortedEvents);
        return selectAttributesFromArray(slicedEvents,"name","capacity");
    } catch (error) {
        console.error("An error occurred while calculating and sorting percentages:", error);
    }
}

function selectAttributesFromArray(arrayOfObjects, attributeToSelect1, attributeToSelect2, attributeToSelect3,attributeToSelect4,attributeToSelect5) {
    return arrayOfObjects.map(object => {
        const selectedAttributes = {};
        
        if (attributeToSelect1 !== null && attributeToSelect1 !== undefined) {
            selectedAttributes[attributeToSelect1] = object[attributeToSelect1];
        }
        
        if (attributeToSelect2 !== null && attributeToSelect2 !== undefined) {
            selectedAttributes[attributeToSelect2] = object[attributeToSelect2];
        }
        
        if (attributeToSelect3 !== null && attributeToSelect3 !== undefined) {
            selectedAttributes[attributeToSelect3] = object[attributeToSelect3];
        }

        if (attributeToSelect4 !== null && attributeToSelect4 !== undefined) {
            selectedAttributes[attributeToSelect4] = object[attributeToSelect4];
        }

        if (attributeToSelect5 !== null && attributeToSelect5 !== undefined) {
            selectedAttributes[attributeToSelect5] = object[attributeToSelect5];
        }
        
        return selectedAttributes;
    });
}


function extractDataConcat(events, attribute1, attribute2, finalCaracter) {
    const extractedData = [];
    if ((finalCaracter !== null && finalCaracter !== undefined) && (attribute2 !== null && attribute2 !== undefined)) {
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            const name = event[attribute1];
            const attendancePercentage = event[attribute2];
            extractedData.push(name + ": " + attendancePercentage + finalCaracter);
        }
        return extractedData;
    } 
    
    if (attribute2 !== null && attribute2 !== undefined) {
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            const name = event[attribute1];
            const attendancePercentage = event[attribute2];
            extractedData.push(name + ": " + attendancePercentage);
        }
        return extractedData;
    }
    
    if (attribute1 !== null && attribute1 !== undefined) {
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            const name = event[attribute1];
            extractedData.push(name + "");
        }
        return extractedData;
    }
}


function addRowToTableBody(tableBodyId, cell1Value, cell2Value, cell3Value) {
    let tbody = document.getElementById(tableBodyId);
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.textContent = cell1Value;
    let td2 = document.createElement("td");
    td2.textContent = cell2Value;
    let td3 = document.createElement("td");
    td3.textContent = cell3Value;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tbody.appendChild(tr);
}


async function calculateCategoryRevenues(){
    let data = await fetchDataFromApi();
    let currentDate = new Date (data.currentDate);
    changeKeyInArray(data.events,"estimate","assistance");
    data = selectAttributesFromArray(data.events,"category","price","assistance","capacity","date");

 let resultForFutureEvents = calculateCategoryStatisticsForFutureEvents(data, "price", "assistance", "category", "capacity", currentDate);
 

 for (const key in resultForFutureEvents) {
    console.log(key)
    addRowToTableBody("event-upcoming-statistics",key,resultForFutureEvents[key].revenue + " $ USD",resultForFutureEvents[key].attendancePercentage + "%");

}

    let resultForPastEvents = calculateCategoryStatisticsForPastEvents(data, "price", "assistance", "category", "capacity", currentDate);
  
    for (const key in resultForPastEvents) {
        console.log(key)
        addRowToTableBody("event-past-statistics",key,resultForPastEvents[key].revenue + " $ USD",resultForPastEvents[key].attendancePercentage + "%");
    
    }

}

function changeKeyInArray(array, oldKey, newKey) {
    if (Array.isArray(array)) {
      array.forEach(object => {
        if (object && object.hasOwnProperty(oldKey)) {
          object[newKey] = object[oldKey];
          delete object[oldKey];
        }
      });
    }
  }

function calculateRevenue(price, assistance) {
    return price * assistance;
}


function calculateAttendancePercentage(attendance, capacity) {
    return ((attendance / capacity) * 100).toFixed(1);
}


function processEventIfDateIsGreaterThanCurrent(event, currentDate, statistics, priceAttribute, assistanceAttribute, categoryAttribute, capacityAttribute) {
    const { [categoryAttribute]: category, [priceAttribute]: price, [assistanceAttribute]: assistance, [capacityAttribute]: capacity, date } = event;

    const eventDate = new Date(date);

    if (eventDate > currentDate) {
        const recaudacion = calculateRevenue(price, assistance);

        if (statistics[category] !== undefined) {
            statistics[category].revenue += recaudacion;
            statistics[category].attendance += assistance;
            statistics[category].capacity += capacity;
        } else {
            statistics[category] = {
                revenue: recaudacion,
                attendance: assistance,
                capacity: capacity,
            };
        }
    }
}


function processEventIfDateIsLessThanCurrent(event, currentDate, statistics, priceAttribute, assistanceAttribute, categoryAttribute, capacityAttribute) {
    const { [categoryAttribute]: category, [priceAttribute]: price, [assistanceAttribute]: assistance, [capacityAttribute]: capacity, date } = event;

    const eventDate = new Date(date);

    if (eventDate < currentDate) {
        const recaudacion = calculateRevenue(price, assistance);

        if (statistics[category] !== undefined) {
            statistics[category].revenue += recaudacion;
            statistics[category].attendance += assistance;
            statistics[category].capacity += capacity;
        } else {
            statistics[category] = {
                revenue: recaudacion,
                attendance: assistance,
                capacity: capacity,
            };
        }
    }
}


function calculateCategoryStatisticsForFutureEvents(data, priceAttribute, assistanceAttribute, categoryAttribute, capacityAttribute, currentDate) {
    const statistics = {};

    for (let i = 0; i < data.length; i++) {
        const evento = data[i];
        processEventIfDateIsGreaterThanCurrent(evento, currentDate, statistics, priceAttribute, assistanceAttribute, categoryAttribute, capacityAttribute);
    }

    
    for (const category in statistics) {
        const { attendance, capacity } = statistics[category];
        statistics[category].attendancePercentage = calculateAttendancePercentage(attendance, capacity);
    }

    return statistics;
}


function calculateCategoryStatisticsForPastEvents(data, priceAttribute, assistanceAttribute, categoryAttribute, capacityAttribute, currentDate) {
    const statistics = {};

    for (let i = 0; i < data.length; i++) {
        const evento = data[i];
        processEventIfDateIsLessThanCurrent(evento, currentDate, statistics, priceAttribute, assistanceAttribute, categoryAttribute, capacityAttribute);
    }

   
    for (const category in statistics) {
        const { attendance, capacity } = statistics[category];
        statistics[category].attendancePercentage = calculateAttendancePercentage(attendance, capacity);
    }

    return statistics;
}


addValuesToRow();
calculateCategoryRevenues()