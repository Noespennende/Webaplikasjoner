import db from "../db"
import {contactMessage} from "../../../../Types"
import { validateMessage } from "../../features/contactMessages/contactMessage.schema";
import { error } from "console";

export const pushMessage = async (message: contactMessage) =>{
    try{
        
    const valid = validateMessage(message)

    if (!valid.success){
        throw error(valid.error.errors)
    }

     //Prepare to write to db
     const insert = db.prepare(
        `INSERT INTO messages (id, person, email, message, recievedAt)
        VALUES (?, ?, ?, ?, ?)`
    );

    //write to server
    const result = insert.run(
        message.id,      
        message.person,     
        message.email,   
        message.message,
        message.recievedAt

    );

    if (result.changes === 0){
        throw new Error("Something went wrong when writing data to the DB.")
    }
    return [message]

    } catch (error) {
        console.error("Error writing message to db: ", error)
        return [];
    }
}

