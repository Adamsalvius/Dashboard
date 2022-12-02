import axios from "axios"

export async function getProjects() {
    const response = await axios.get("http://localhost:3000/projects");
    if (!response) {
        throw { message: "could not fetch projects" }
    }
    return response
}

export async function getTimes() {
    const response = await axios.get("http://localhost:3000/timelogs");
    if (!response) {
        throw { message: "could not fetch the timelogs" }
    }
    return response
}

export async function getTimesForDate(date: string) {
    const response = await axios.get(`http://localhost:3000/timelogs?startDate=${date}`)
    if (!response) {
        throw { message: "could not fetch the timelog" }
    }
    return response
}
export async function getTasks() {
    const response = await axios.get("http://localhost:3000/tasks");
    if (!response) {
        throw { message: "could not fetch tasks" }
    }
    return response
}

/* export async function addpaid() {
    const response = await axios.patch(`http://localhost:3000/invoices`);
    if (!response) {
        throw { message: "could not fetch invoices"}
    }
    return response
} */
export async function getInvoices() {
    const response = await axios.get(`http://localhost:3000/invoices`);
    if (!response) {
        throw { message: "could not fetch invoices"}
    }
    return response
}