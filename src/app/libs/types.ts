  export interface Rooms {
    roomId: string;
    roomName: string;
  }

  export interface Messages {
    roomId: string;
    messageId: string;
    messageText: string;
  }

  export interface Users {
    username: string;
    password: string;
    role: "ADMIN" | "SUPER_ADMIN";
  }

  export interface DBtype {
    // interface for originalDB
    rooms: Rooms[];
    messages: Messages[];
    users: Users[];
}

export interface Payload {
  username: string;
  studentId: string;
  role: string;
}