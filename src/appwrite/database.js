import conf from "./conf";
import { Client, Databases, Storage, ID } from "appwrite";




export class databasesSerives {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // Method to add a new note
  async addNote( note) {
    try {
      const response = await this.databases.createDocument(
        conf.appwriteDatabaseId, // Your database ID from Appwrite
        conf.appwriteCollectionId, // Your collection ID from Appwrite
        ID.unique(), // Generates a unique document ID
        { note } // Data to store in the document
      );
      return response;
    } catch (error) {
      console.error("Failed to create note:", error);
      throw error;
    }
  }

  // Method to fetch a new note
  async fetchNote(){
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId
      )
      return response
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      throw error;
    }
  }

 
  // Method to delete a note
async deleteNote(noteId) {
  try {
    const response = await this.databases.deleteDocument(
      conf.appwriteDatabaseId, // Your database ID
      conf.appwriteCollectionId, // Your collection ID
      noteId // The document (note) ID to delete
    );
    return response; // Return the response if needed
  } catch (error) {
    console.error("Failed to delete note:", error);
    throw error; // Handle or propagate the error
  }
}

// Method to update a note
async updateNote(noteId,updatedNote) {
  try {
    const response = await this.databases.updateDocument(
      conf.appwriteDatabaseId, // Your database ID
      conf.appwriteCollectionId, // Your collection ID
      noteId, // The document (note) ID to update
      { note: updatedNote } // Data to update in the document
    );
    return response; // Return the response
  } catch (error) {
    console.error("Failed to update note:", error);
    throw error; // Handle or propagate the error
  }
}


}

const dbService=new databasesSerives()
export default dbService